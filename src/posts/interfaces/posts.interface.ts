export enum Status {
  IDLE,
  UPLOADING,
  DONE,
  ERROR
}

export interface Post {
  id: number;
  coverUrl: string;
  imgurCoverUrl: string;
  status: Status
}

export interface UpdatePost {
  imgurCoverUrl?: string;
  status?: Status
}

