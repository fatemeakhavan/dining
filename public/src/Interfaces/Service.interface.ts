import { IServiceQuota } from './ServiceQuota.interface';

export interface IService {
  faDisplayName: string;
  faDescription: string;
  maintenanceMode: boolean;
  clusterMode: boolean;
  validNodeCounts: number[];
  id: number;
  name: string;
  type: 'MANAGED' | 'UNMANAGED' | 'SHARED';
  enable: boolean;
  groupId: number;
  quota?: IServiceQuota;
  created: string;
  updated: string;
}
