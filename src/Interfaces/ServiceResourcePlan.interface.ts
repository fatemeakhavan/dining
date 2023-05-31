export interface IServiceResourcePlan {
  id: number;
  name: string;
  faDisplayName: string;
  enDisplayName: string;
  faDescription: string;
  enDescription: string;
  cpu: number;
  memory: number;
  mainDisk: {
    capacity: number;
    iops: 100 | 500;
    type: 'GP' | 'SP';
  };
  templateName: 'WIN2016' | 'WIN2019' | 'CENTOS7' | 'UBUNTU1804' | 'ORACLE';
  extraDisks: {
    capacity: number;
    iops: 100 | 500;
    mountPath: string;
  }[];
}
