import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';

// third party modules
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
// Routing
import { AppRoutingModule } from './app-routing.module';

// Custom Components
import { AppComponent } from './app.component';
import { TitleSearchComponent } from './child/title-search/title-search.component';
import { MoviesListComponent } from './child/movies-list/movies-list.component';

@NgModule({
  declarations: [
    AppComponent,
    TitleSearchComponent,
    MoviesListComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgxDatatableModule,
    SweetAlert2Module.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
