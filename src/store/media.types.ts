export type AlbumMediaKind = "image" | "video";

export interface AlbumMedia {
  id: string;
  uri: string;
  kind: AlbumMediaKind;
  uploadedBy: string;
  isMine: boolean;
  uploadedAt: number;
  fileSize?: number;
}
