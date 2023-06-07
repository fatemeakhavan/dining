import { IService } from './Service.interface';

export interface IServiceGroup {
  enDisplayName: string;
  faDisplayName: string;
  enDescription: string;
  faDescription: string;
  logo: string;
  tags: string[];
  id: number;
  name: string;
  services: IService[];
  categoryId: number;
  created: string;
  updated: string;
}
