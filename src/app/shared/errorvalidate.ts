
export enum ValidateMode {
  Create = 1,
  Edit = 2,
}

export class ValidateStatus {
  haserror = false;
  errorsmessage: Array<string> = [];

  constructor() { }

  get hasError(): boolean {
    return this.haserror;
  }

  get errorsMessage(): string[] {
    return this.errorsmessage;
  }

  setErrorsFromResult(modal: ICommandResult) {
    this.haserror = true;
    for (const message of modal.errorsMessage) {
      this.addErrorMessage(message);
    }    
  }

  addErrorMessage(message: string) {
    this.haserror = true;
    this.errorsmessage.push(message);
  }  
}

export interface ICommandResult {
  hasError: boolean;
  showAlertError: boolean;
  errorsMessage: string[];
  result: any;
}
