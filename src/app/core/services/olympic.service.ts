import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { olympicModel } from '../models/Olympic';

@Injectable({
  providedIn: 'root',
})
export class OlympicService implements OnInit {
  private olympicUrl: string = './assets/mock/olympic.json';
  private olympics$ = new BehaviorSubject<olympicModel[]>([new olympicModel]);//???

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.olympicUrl = './assets/mock/olympic.json';

  }

  loadInitialData() {
    return this.http.get<olympicModel[]>(this.olympicUrl).pipe(
      tap((value) => this.olympics$.next(value)),
      catchError((error, caught) => {
        // TODO: improve error handling
        console.error(error);
        // can be useful to end loading state and let the user know something went wrong
        this.olympics$.next([new olympicModel]);
        return caught;
      })
    );
  }

  getOlympics(): Observable<olympicModel[]> {
    return this.olympics$.asObservable();
  }

}
