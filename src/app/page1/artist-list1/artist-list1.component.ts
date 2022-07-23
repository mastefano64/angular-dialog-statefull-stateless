import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { switchMap, tap } from 'rxjs/operators';
import { merge } from 'rxjs';

import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

import { ArtistCreate1Component } from 'src/app/page1/artist-create1/artist-create1.component';
import { ArtistEdit1Component } from 'src/app/page1/artist-edit1/artist-edit1.component';

import { ArtistDto } from 'src/app/model/artist-dto';
import { ApiArtistService } from 'src/app/service/api-artist-service';
import { ICommandResult } from 'src/app/shared/errorvalidate';
import { Popup, Errors } from 'src/app/shared/popup-error';

@Component({
  selector: 'app-artistlist1',
  templateUrl: './artist-list1.component.html',
  styleUrls: ['./artist-list1.component.css']
})
export class ArtistList1Component implements OnInit, OnDestroy {  
  displayedColumns = ['artistId', 'description', 'address', 'city', 'phone', 'email', 'x'];   
  datasource$: any;

  constructor(private dialog: MatDialog, private router: Router, private route: 
            ActivatedRoute, private service: ApiArtistService) { } 

  ngOnInit() {   
    this.loadArtistPage();
  }

  onCreate() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '95%';     
    dialogConfig.disableClose = true;
    dialogConfig.data = {  };
    const dialogRef = this.dialog.open(ArtistCreate1Component, dialogConfig);
    //
    const sub = dialogRef.componentInstance.confirm.pipe(
      switchMap(data => this.service.insertArtist(data))
    ).subscribe(response => {
      dialogRef.componentInstance.callbackOnSave(response);     
    });
    //
    dialogRef.afterClosed().subscribe(data => {
      sub.unsubscribe();        
      if (data === 'ok') {
        this.loadArtistPage();
      }  
    });
  }

  onEdit(item: ArtistDto) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '95%';     
    dialogConfig.disableClose = true;
    dialogConfig.data = this.service.getArtistById(item.artistId);
    const dialogRef = this.dialog.open(ArtistEdit1Component, dialogConfig);
    //
    const sub = dialogRef.componentInstance.confirm.pipe(
      switchMap(data => this.service.updateArtist(data))
    ).subscribe(response => {
      dialogRef.componentInstance.callbackOnSave(response);     
    });
    //
    dialogRef.afterClosed().subscribe(data => {
      sub.unsubscribe();        
      if (data === 'ok') {
        this.loadArtistPage();
      }  
    });
  }

  onDelete(item: ArtistDto) {
    if (Popup.confirmDelete() === false) {
      return;
    }
    const id = item.artistId;
    this.service.deleteArtist(id).subscribe(response => {
      Errors.showErrorIfNedded(response as ICommandResult);
      this.loadArtistPage();
    });
  }

  loadArtistPage() {
    this.datasource$ = this.service.getAllArtist();
  } 

  ngOnDestroy() {
    // ???
  }
}
