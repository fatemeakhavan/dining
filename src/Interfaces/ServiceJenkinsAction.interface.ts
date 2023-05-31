import { IServiceJenkinsInput } from './ServiceJenkinsInput.interface';
import { IServiceJenkinsOutput } from './ServiceJenkinsOutput.interface';

export interface IServiceJenkinsAction {
  id: number;
  name: string;
  faDisplayName: string;
  enDisplayName: string;
  faDescription: string;
  enDescription: string;
  actionType: 'UNMANAGED_SETUP' | 'SHARED_SETUP' | 'SHARED_STOP' | 'SHARED_REMOVE' | 'SHARED_START' | 'MANAGED_SETUP';
  jobName: string;
  enable: boolean;
  jenkinsInput: IServiceJenkinsInput[];
  jenkinsOutput: IServiceJenkinsOutput[];
}
