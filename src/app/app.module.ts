import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { AppMaterialModule } from './app.material.module';
import { AppRoutingModule } from './app.routing.module';

import { AppComponent } from 'src/app/app.component';
import { NavComponent } from 'src/app/nav/nav.component';
import { HomeComponent } from 'src/app/home/home.component';
import { Page1Component } from 'src/app/page1/page1/page1.component';
import { Page2Component } from 'src/app/page2/page2/page2.component';
import { ArtistList1Component } from 'src/app/page1/artist-list1/artist-list1.component';
import { ArtistCreate1Component } from 'src/app/page1/artist-create1/artist-create1.component';
import { ArtistEdit1Component } from 'src/app/page1/artist-edit1/artist-edit1.component';
import { ArtistList2Component } from 'src/app/page2/artist-list2/artist-list2.component';
import { ArtistCreate2Component } from 'src/app/page2/artist-create2/artist-create2.component';
import { ArtistEdit2Component } from 'src/app/page2/artist-edit2/artist-edit2.component';
import { MessageBoxComponent } from 'src/app/shared/messagebox/messagebox.component';
import { NotFoundComponent } from 'src/app/shared/notfound/notfound.component';


@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    Page1Component,   
    Page2Component,
    ArtistList1Component,
    ArtistCreate1Component,
    ArtistEdit1Component,
    ArtistList2Component,
    ArtistCreate2Component,
    ArtistEdit2Component,
    MessageBoxComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    AppMaterialModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
