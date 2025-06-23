export interface Tag {
  id: string;
  name: string;
  color: string;
}

export interface Camera {
  id: string;
  name: string;
  rtsp_url: string;
  tags: Tag[];
  is_active: boolean;
  status_message: string;
  snapshot: string;
  created_at: string;
  updated_at: string;
}

export interface CamerasApiResponse {
  items: Camera[];
  page: number;
  pages: number;
  size: number;
  total: number;
}

export interface DemographicsConfig {
  track_history_max_length: number;
  exit_threshold: number;
  min_track_duration: number;
  detection_confidence_threshold: number;
  demographics_confidence_threshold: number;
  min_track_updates: number;
  box_area_threshold: number;
  save_interval: number;
  frame_skip_interval: number;
  id: string;
  camera_id: string;
  created_at: string;
  updated_at: string;
}

export interface CameraDetails {
  id: string;
  name: string;
  rtsp_url: string;
  tags: Tag[]; // Updated to include Tag objects
  is_active: boolean;
  status_message: string;
  snapshot: string;
  created_at: string;
  updated_at: string;
  stream_frame_width: number;
  stream_frame_height: number;
  stream_max_length: number;
  stream_quality: number;
  stream_fps: number;
  stream_skip_frames: number;
  demographics_config: DemographicsConfig;
}
export type UpdateCameraData = {
  name: string;
  rtsp_url: string;
  stream_frame_width: number;
  stream_frame_height: number;
  stream_max_length: number;
  stream_quality: number;
  stream_fps: number;
  stream_skip_frames: number;
  tags: string[];
};
export type FieldValidationError = {
  [key: string]: string;
};

export interface UpdateDemographicsData {
  track_history_max_length: number;
  exit_threshold: number;
  min_track_duration: number;
  detection_confidence_threshold: number;
  demographics_confidence_threshold: number;
  min_track_updates: number;
  box_area_threshold: number;
  save_interval: number;
  frame_skip_interval: number;
}
