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
