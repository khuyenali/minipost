export enum Status {
  IDLE,
  UPLOADING,
  DONE
}

export interface Post {
  id: number;
  coverUrl: string;
  imgurCoverUrl: string;
  status: Status
}

