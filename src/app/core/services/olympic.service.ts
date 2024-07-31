import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { olympicModel } from '../models/Olympic';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class OlympicService implements OnInit {
  private olympicUrl: string = './assets/mock/olympic.json';
  private olympics$ = new BehaviorSubject<olympicModel[]>([new olympicModel]);

  constructor(private http: HttpClient,
              private route: Router) { }

  ngOnInit(): void {
    this.olympicUrl = './assets/mock/olympic.json';

  }

  loadInitialData() {
    return this.http.get<olympicModel[]>(this.olympicUrl).pipe(
      tap((value) => this.olympics$.next(value)),
      catchError((error, caught) => {
        console.error("Something went wrong : ",error);
        this.olympics$.next([new olympicModel]);
        this.route.navigateByUrl('**');//Redirection to 404 not found
        return caught;
      })
    );
  }

  getOlympics(): Observable<olympicModel[]> {
    return this.olympics$.asObservable();
  }

}
