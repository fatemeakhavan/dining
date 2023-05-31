export interface IAdminPanelResult<T> {
  result: T;
  referenceNumber: number;
  path: string;
  status: number;
  timestamp: string;
}
