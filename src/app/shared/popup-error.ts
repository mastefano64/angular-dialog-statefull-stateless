import { ICommandResult } from 'src/app/shared/errorvalidate';

export class Popup {
  public static confirmDelete(message?: string): boolean {
    if (!message) {
      message = 'Sei sicuro di voler annullare?';
    }
    const valret = confirm(message); 
    return valret;
  }

  public static confirmAlert(message: string): boolean {   
    const valret = confirm(message); 
    return valret;
  }
}

export class Errors {  
  public static showErrorIfNedded(result: ICommandResult): void {
    if (result.hasError === true && result.showAlertError ===  true) {
      alert(result.errorsMessage[0]);
    }
  }

  public static showError(result: ICommandResult): void {
    if (result.hasError === true) {
      alert(result.errorsMessage[0]);
    }
  }
}
