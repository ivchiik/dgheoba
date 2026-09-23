export interface ScanEntryCardProps {
  code: string;
  error?: string;
  onChangeCode: (code: string) => void;
  onScanPress: () => void;
}
