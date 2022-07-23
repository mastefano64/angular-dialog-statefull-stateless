import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';

import { ArtistList2Component } from 'src/app/page2/artist-list2/artist-list2.component';

import { ArtistDto } from 'src/app/model/artist-dto';
import { ApiArtistService } from 'src/app/service/api-artist-service';
import { ICommandResult } from 'src/app/shared/errorvalidate';
import { ArgCallbackOnSave } from 'src/app/shared/callback';
import { Popup, Errors } from 'src/app/shared/popup-error';

@Component({
  selector: 'app-page2',
  templateUrl: './page2.component.html',
  styleUrls: ['./page2.component.css']
})
export class Page2Component implements OnInit, OnDestroy {
  @ViewChild('listTrv') listTrv: ArtistList2Component | undefined; 
  datasource$: any;

  constructor(private service: ApiArtistService) { }

  ngOnInit(): void {
    this.loadArtistPage();
  }  

  onEditArtist(item: ArtistDto) {
    this.service.getArtistById(item.artistId).subscribe(response => {
      const result = response as ArtistDto
      this.listTrv!.onModify(result);
    });
  }

  onInsertArtist(arg: ArgCallbackOnSave<ArtistDto>) {       
    this.service.insertArtist(arg.data).subscribe(response => {
      const result = response as ICommandResult;
      arg.callbackOnSave(result);
      if (result.hasError === false) {
        this.loadArtistPage();
      } 
    });   
  }

  onUpdateArtist(arg: ArgCallbackOnSave<ArtistDto>) {      
    this.service.updateArtist(arg.data).subscribe(response => {
      const result = response as ICommandResult;
      arg.callbackOnSave(result);
      if (result.hasError === false) {
        this.loadArtistPage();
      } 
    });   
  }

  onDeleteArtist(item: ArtistDto) {
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

  ngOnDestroy(): void {
    // ???
  }
}
