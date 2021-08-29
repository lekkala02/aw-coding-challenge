import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { distinctUntilChanged, debounceTime } from 'rxjs/operators';
import { ApiService } from '../../api/api.service';

@Component({
  selector: 'aw-title-search',
  templateUrl: './title-search.component.html',
  styleUrls: ['./title-search.component.scss']
})
export class TitleSearchComponent implements OnInit, OnDestroy {
  formChanges$: any;
  searchTitleForm!: FormGroup;
  constructor(private apiService: ApiService,
    private fb: FormBuilder) { }

  ngOnInit(): void {
   this.searchTitleForm = this.fb.group({
      searchByTitle: new FormControl(''),
    });
    this.formChanges$ = this.searchTitleForm.valueChanges
      .pipe(
        distinctUntilChanged(),
        debounceTime(500),
      ).subscribe((changes: any) => {
        if (changes && changes.searchByTitle) {
          this.apiService.titleSubject.next(changes.searchByTitle);
        } else {
          this.apiService.titleSubject.next('');
        }
      });
  }

  ngOnDestroy(): void {
    if (this.formChanges$) {
      this.formChanges$.unsubscribe();
    }
  }

}
