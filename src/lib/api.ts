import { CamerasApiResponse } from "@/types/camera";
import getConfig from "next/config";
import { notFound } from "next/navigation";

const { publicRuntimeConfig } = getConfig();
const baseUrl = publicRuntimeConfig.baseUrl;
const appendBaseUrl = (url: string) => `${baseUrl}${url}`;

// get all camera list
export async function getCameras(
  search?: string,
  page = 1,
  size = 5
): Promise<CamerasApiResponse> {
  try {
    const url = new URL(appendBaseUrl("/cameras"));
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
