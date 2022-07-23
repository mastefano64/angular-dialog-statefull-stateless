import { Component } from '@angular/core';

import { ApiArtistService } from 'src/app/service/api-artist-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent { 

  constructor(private service: ApiArtistService) { } 

}
