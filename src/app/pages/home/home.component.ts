import { Component, OnInit } from '@angular/core';
import { first, map, Observable, of } from 'rxjs';
import { olympicModel } from 'src/app/core/models/Olympic';
import { OlympicService } from 'src/app/core/services/olympic.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public olympics$!: Observable<olympicModel[]>;
  public tabOlympicModel: olympicModel[] = [];

  constructor(private olympicService: OlympicService) {
  }

  ngOnInit(): void {
    this.olympics$ = this.olympicService.getOlympics();
    this.olympics$.subscribe((data : olympicModel[]) => {
      this.tabOlympicModel = data;
      // if((this.tabOlympicModel != undefined)&&
      // (this.tabOlympicModel[0].participations[0] != undefined)){
      //   console.log("element = ", this.tabOlympicModel[0].participations[0].city);
      //   console.log("content", this.tabOlympicModel);
      // }
    });
  }
}
