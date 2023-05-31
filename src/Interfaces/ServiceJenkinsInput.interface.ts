export interface IServiceJenkinsInput {
  name: string;
  faDisplayName: string;
  faDescription: string;
  defaultValue: string;
  inputType: 'VALUES' | 'STRING' | 'NUMBER' | 'BOOLEAN' | 'PASSWORD' | 'EMAIL';
  inputValues: string[];
  userCanModify: boolean;
  sequenceNumber: number;
  force: boolean;
  faRegexCheckError: string;
  valueValidationRegex: string;
}
