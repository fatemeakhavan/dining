export interface IServiceReport {
  id: number;
  name: string;
  enDisplayName: string;
  faDisplayName: string;
  enDescription: string;
  faDescription: string;
  type: 'LIST' | 'RESOURCE_USAGE' | 'ACTIVITY';
  serviceId: number;
  serviceName?: string;
  serviceGroupName?: string;
}
