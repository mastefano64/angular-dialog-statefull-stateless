import { Component, Inject, Output, EventEmitter, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { ArtistDto } from 'src/app/model/artist-dto';
import { ICommandResult, ValidateStatus } from 'src/app/shared/errorvalidate';
import { ArgCallbackOnSave } from 'src/app/shared/callback';
import { Utility } from 'src/app/shared/utility';

@Component({
  selector: 'app-artistedit',
  templateUrl: './artist-edit2.component.html',
  styleUrls: ['./artist-edit2.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ArtistEdit2Component implements OnInit {  
  @Output() confirm = new EventEmitter<ArgCallbackOnSave<ArtistDto>>(); 
  status = new ValidateStatus();  
  form = new ArtistDto(); 

  constructor(private dialogRef: MatDialogRef<ArtistEdit2Component>,  
        @Inject(MAT_DIALOG_DATA) private data: ArtistDto) { 
    this.form = data as ArtistDto;
  }

  ngOnInit() {   
    //
    // ???
    //
  }
 
  onSubmit(form: NgForm) {
    this.status = new ValidateStatus();
    if (form.invalid === true) {
      return;
    }
    const vm = new ArtistDto();
    vm.artistId = Utility.toInteger(this.form.artistId);
    vm.description = Utility.toString(form.value.description);
    vm.address = Utility.toString(form.value.address);
    vm.city = Utility.toString(form.value.city);
    vm.phone = Utility.toString(form.value.phone);
    vm.email = Utility.toString(form.value.email);    
    //
    const callback = this.callbackOnSave.bind(this);
    const arg = new ArgCallbackOnSave<ArtistDto>(vm, callback);
    this.confirm.emit(arg);
  }

  callbackOnSave(response: any) {
    const result = response as ICommandResult;
    if (result.hasError === true) {
      const s = new ValidateStatus();
      s.setErrorsFromResult(result);
      this.status = s;
      alert('Attenzione, ci sono degli errori!');
      return;     
    } 
    this.dialogRef.close('ok');
  }

  onClose() {
    this.dialogRef.close('no');
  }
}
