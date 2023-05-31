export interface IServiceQuota {
  displayName: string;
  description: string;
  id: number;
  name: string;
  maxCpu: number;
  maxMemory: number;
  maxDisk: number;
  created: string;
  updated: string;
}
