import { Component, Inject, Output, EventEmitter, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { NgForm } from '@angular/forms';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { ArtistDto } from 'src/app/model/artist-dto';
import { ICommandResult, ValidateStatus } from 'src/app/shared/errorvalidate';
import { Utility } from 'src/app/shared/utility';

@Component({
  selector: 'app-artistcreate',
  templateUrl: './artist-create1.component.html',
  styleUrls: ['./artist-create1.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ArtistCreate1Component implements OnInit {  
  @Output() confirm = new EventEmitter<ArtistDto>();   
  status = new ValidateStatus();  

  constructor(private dialogRef: MatDialogRef<ArtistCreate1Component>,  
       @Inject(MAT_DIALOG_DATA) private data: ArtistDto) { 
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
    vm.description = Utility.toString(form.value.description);
    vm.address = Utility.toString(form.value.address);
    vm.city = Utility.toString(form.value.city);
    vm.phone = Utility.toString(form.value.phone);
    vm.email = Utility.toString(form.value.email);  
    //  
    this.confirm.emit(vm);   
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
