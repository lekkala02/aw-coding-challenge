import { Component, OnInit, ViewChild , OnDestroy} from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { ApiService } from './api/api.service';

@Component({
  selector: 'aw-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  movies: any;
  @ViewChild('errorSwal') 
  private readonly errorSwal!: any;
  moviesList$: any;
  titleSearch$: any;
  columns = [
    { prop: 'ID', width: 150 }, 
    { prop: 'Title', width: 350 }, 
    { prop: 'Year', width: 150 }, 
    { prop: 'Rating', width: 150 }
  ];
  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.getMoviesList();
    this.searchByTitle();
  }

  getMoviesList() {
    this.moviesList$ = this.apiService.getMoviesList()
      .subscribe((response:any) => {
        this.movies = response;
      }, err => {
        this.errorSwal.fire();
      });
  }

  searchByTitle() {
    this.titleSearch$ = this.apiService.titleSubject.asObservable()
      .pipe(
        switchMap((response: any) => {
          return this.apiService.searchByTitle(response || '');
      }))
      .subscribe(result => {
        this.movies = result;
      }, err => {
        this.errorSwal.fire();
      });
  }

  ngOnDestroy(): void {
    if (this.moviesList$) {
      this.moviesList$.unsubscribe();
    }
    if (this.titleSearch$) {
      this.titleSearch$.unsubscribe();
    }
  }
}
