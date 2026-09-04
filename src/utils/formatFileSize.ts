const KB = 1024;
const MB = KB * 1024;

export const formatFileSize = (bytes?: number): string => {
  if (!bytes || bytes <= 0) return "";

  if (bytes < MB) return `${Math.max(1, Math.round(bytes / KB))} KB`;

  return `${(bytes / MB).toFixed(1)} MB`;
};
