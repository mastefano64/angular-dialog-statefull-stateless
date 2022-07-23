import { Component, Input, Output, EventEmitter, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { switchMap, tap } from 'rxjs/operators';
import { merge } from 'rxjs';

import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

import { ArtistCreate2Component } from 'src/app/page2/artist-create2/artist-create2.component';
import { ArtistEdit2Component } from 'src/app/page2/artist-edit2/artist-edit2.component';

import { ArtistDto } from 'src/app/model/artist-dto';
import { ArgCallbackOnSave } from 'src/app/shared/callback';

@Component({
  selector: 'app-artistlist2',
  templateUrl: './artist-list2.component.html',
  styleUrls: ['./artist-list2.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ArtistList2Component implements OnInit, OnDestroy {
  @Input() datasource$: any; 
  @Output() editartist = new EventEmitter<ArtistDto>();
  @Output() insertartist = new EventEmitter<ArgCallbackOnSave<ArtistDto>>();
  @Output() updateartist = new EventEmitter<ArgCallbackOnSave<ArtistDto>>();
  @Output() deleteartist = new EventEmitter<ArtistDto>();
  displayedColumns = ['artistId', 'description', 'address', 'city', 'phone', 'email', 'x']; 

  constructor(private dialog: MatDialog) { } 

  ngOnInit() {   
    
  }

  onEdit(item: ArtistDto) {
    this.editartist.emit(item);
  }

  onCreate() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '95%';     
    dialogConfig.disableClose = true;
    dialogConfig.data = {  };
    const dialogRef = this.dialog.open(ArtistCreate2Component, dialogConfig);
    //
    const sub = dialogRef.componentInstance.confirm.subscribe(response => {      
      this.insertartist.emit(response); 
    });
    //
    dialogRef.afterClosed().subscribe(data => {
      sub.unsubscribe();        
      if (data === 'ok') {
        // this.loadArtistPage();
      }  
    });
  }

  onModify(item: ArtistDto) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '95%';     
    dialogConfig.disableClose = true;
    dialogConfig.data = { ...item };
    const dialogRef = this.dialog.open(ArtistEdit2Component, dialogConfig);
    //
    const sub = dialogRef.componentInstance.confirm.subscribe(response => {
      this.updateartist.emit(response);     
    });
    //
    dialogRef.afterClosed().subscribe(data => {
      sub.unsubscribe();        
      if (data === 'ok') {
        // this.loadArtistPage();
      }  
    });
  }

  onDelete(item: ArtistDto) {
    this.deleteartist.emit(item);
  }

  ngOnDestroy() {
   
  }
}
