export interface IReportResponseList {
  createdOn: string;
  deployedName: string;
  status: 'ACTIVE' | 'STOPPED' | 'FINISHED' | 'UNKNOWN';
  username: string;
  virtualMachineInfo: {
    username: string;
    password: string;
  };
}

export interface IReportResponseResource {
  cpu: number;
  disk: number;
  memory: number;
}

export interface IReportResponseActivity {
  actionId: number;
  created: string;
  duration: number;
  functorId: string;
  id: number;
  jobId: number | null;
  outputLog: string | null;
  status: string;
  updated: string;
  inputs: IReportResponseActivityInput[];
  outputs: IReportResponseActivityOutput[];
}

export interface IReportResponseActivityInput {
  id: number;
  key: string;
  value: string;
}

export interface IReportResponseActivityOutput {
  id: number;
  key: string;
  value: string;
  nodeIp: string;
  visible: boolean;
}
