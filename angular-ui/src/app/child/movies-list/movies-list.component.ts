import { Input, Component } from '@angular/core';

@Component({
  selector: 'aw-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.scss']
})
export class MoviesListComponent {
  @Input() movies: any;
  @Input() columns: any;
  constructor() {}
}
