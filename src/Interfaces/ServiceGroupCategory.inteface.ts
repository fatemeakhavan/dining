import { IServiceGroup } from './ServiceGroup.interface';

export interface IServiceGroupCategory {
  faDisplayName: string;
  enDisplayName: string;
  tags: string[];
  id: number;
  name: string;
  enable: boolean;
  groups: IServiceGroup[];
  created: string;
  updated: string;
}