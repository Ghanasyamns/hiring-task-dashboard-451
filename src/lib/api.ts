import {
  CameraDetails,
  CamerasApiResponse,
  FieldValidationError,
  Tag,
  UpdateCameraData,
} from "@/types/camera";

import { notFound } from "next/navigation";
import { endpoints } from "./endpoints";

const baseUrl = "https://task-451-api.ryd.wafaicloud.com"; // should add in env or config file
const appendBaseUrl = (url: string) => `${baseUrl}${url}`;

type ApiResponse<T> =
  | {
      success: true;
      data: T;
    }
  | {
      success: false;
      errors: FieldValidationError;
    };

// get all camera list
export async function getCameras(
  search?: string,
  page = 1,
  size = 5
): Promise<CamerasApiResponse> {
  try {
    const url = new URL(appendBaseUrl(endpoints.get_cameras));
    url.searchParams.append("page", page.toString());
    url.searchParams.append("size", size.toString());
    url.searchParams.append("camera_name", search ?? "");
    console.log(url.toString());

    const response = await fetch(url.toString(), {
      next: { revalidate: 3600 },
    });
    const data: CamerasApiResponse = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    return notFound();
  }
}
export const getCameraDetails = async (
  cameraId: string
): Promise<CameraDetails> => {
  try {
    const endpoint = endpoints.get_camera.replace("{camera_id}", cameraId);
    const url = new URL(appendBaseUrl(endpoint));
    const response = await fetch(url.toString());
    const data: CameraDetails = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    return notFound();
  }
};

export const updateCameraAPI = async (
  cameraId: string,
  formData: UpdateCameraData
): Promise<ApiResponse<CameraDetails>> => {
  try {
    const endpoint = endpoints.update_camera.replace("{camera_id}", cameraId);
    const url = new URL(appendBaseUrl(endpoint));
    const response = await fetch(url.toString(), {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    if (!response.ok) {
      if (response.status === 422) {
        const errorData = await response.json();
        const errors: FieldValidationError = {};
        errorData.detail.forEach((error: { loc: any[]; msg: string }) => {
          const field = error.loc[error.loc.length - 1];
          errors[field] = error.msg;
        });
        return { success: false, errors };
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data: CameraDetails = await response.json();
    console.log(data);
    return { success: true, data };
  } catch (error) {
    console.error("Error updating camera:", error);
    return {
      success: false,
      errors: {
        field: "Network error occurred",
      },
    };
  }
};

export const getAllTags = async (): Promise<Tag[]> => {
  try {
    const endpoint = endpoints.get_tags;
    const url = new URL(appendBaseUrl(endpoint));
    const response = await fetch(url.toString(), {
      next: { revalidate: 3600 * 24 },
    }); // keep in cache for 1 day
    const data: Tag[] = await response.json();
    return data;
  } catch (error) {
    return [];
  }
};
