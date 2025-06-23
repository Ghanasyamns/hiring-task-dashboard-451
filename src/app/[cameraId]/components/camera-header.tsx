import { formatDate } from "@/lib/utils";
import { UpdateCameraModal } from "./update-camera-modal";
import { CameraDetails } from "@/types/camera";
import { Suspense } from "react";

type Props = {
  data: CameraDetails;
};
function CameraHeader({ data }: Props) {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
          {data.name}
        </h1>
        <div className="flex items-center mt-2">
          <span
            className={`inline-block w-3 h-3 rounded-full mr-2 ${
              data.is_active ? "bg-green-500" : "bg-red-500"
            }`}
          ></span>
          <span className="text-gray-600">{data.status_message}</span>
        </div>
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <UpdateCameraModal
          data={{
            name: data.name,
            rtsp_url: data.rtsp_url,
            stream_frame_width: data.stream_frame_width,
            stream_frame_height: data.stream_frame_height,
            stream_max_length: data.stream_max_length,
            stream_quality: data.stream_quality,
            stream_fps: data.stream_fps,
            stream_skip_frames: data.stream_skip_frames,
            tags: data.tags.map((tag) => tag.id),
          }}
          id={data.id}
        />
      </Suspense>
      <div className="text-sm text-gray-500">
        <p>Created: {formatDate(data.created_at)}</p>
        <p>Last updated: {formatDate(data.updated_at)}</p>
      </div>
    </div>
  );
}

export default CameraHeader;
