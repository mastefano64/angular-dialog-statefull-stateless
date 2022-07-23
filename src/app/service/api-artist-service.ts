import { listLazyRoutes } from "@angular/compiler/src/aot/lazy_routes";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";

import { ArtistDto } from 'src/app/model/artist-dto';
import { ICommandResult } from "src/app/shared/errorvalidate";

@Injectable({
  providedIn: 'root',
})
export class ApiArtistService {
  artists: ArtistDto[]; 

  constructor() { 
    this.artists = this.createList();
  } 

  getAllArtist(): Observable<object> {
    return of(this.artists);
  }

  getArtistById(id: number): Observable<object> {
    const item = this.findItem(id);
    return of(item);
  }

  insertArtist(entity: ArtistDto): Observable<object> {    
    entity.artistId = this.artists.length + 1;
    this.artists.push(entity);
    return of(this.createCommandResult());
  }

  updateArtist(entity: ArtistDto): Observable<object> {
    const item = this.findItem(entity.artistId);
    item.description = entity.description;
    item.address = entity.address;
    item.city = entity.city;
    item.phone = entity.phone;
    item.email = entity.email;
    return of(this.createCommandResult());
  }

  deleteArtist(id: number): Observable<object> {
    const item = this.findItem(id);
    this.artists.splice(this.artists.indexOf(item), 1);
    return of(this.createCommandResult());
  }

  findItem(id: number): ArtistDto {
    const item = this.artists.filter(x => x.artistId === id)[0];
    return item;
  }

  createList(): ArtistDto[] {
    const list: ArtistDto[] = [];

    for (let i= 1; i < 15; i++) {
      const item = new ArtistDto();
      item.artistId = i;
      item.description = 'description' + i;
      item.address = 'address' + i;
      item.city = 'city' + i;
      item.phone = 'phone' + i;
      item.email = 'email' + i;
      list.push(item);
    }

    return list;
  }

  createCommandResult(): ICommandResult {
    const result = {
      hasError: false,
      showAlertError: false,
      errorsMessage: [],
      result: null,
    }
    return result;
  }
}
