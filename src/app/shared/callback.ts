import { ICommandResult } from 'src/app/shared/errorvalidate';

export interface ICallBackOnSave {
  callbackOnSave(response: ICommandResult): void;    
} 

export class ArgCallbackOnSave<T> {

  constructor(public data: T, public callbackOnSave: any) { }

} 
