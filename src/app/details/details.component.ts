import { Component, OnDestroy, OnInit } from '@angular/core';
import { OlympicService } from '../core/services/olympic.service';
import { ActivatedRoute, Router } from '@angular/router';
import { olympicModel } from '../core/models/Olympic';
import { Observable, Subscription } from 'rxjs';
import { participationsModel } from '../core/models/Participation';
import { lineChart, serie } from '../core/models/chartInterface';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent implements OnInit, OnDestroy{
  public olympics$!: Observable<olympicModel[]>;
  public tabOlympicModel: olympicModel[] = [];
  public data: lineChart[] = [];

  public subscription!: Subscription;
  
  public country!: string;
  public NbrEntries!: number;
  public TotalNbrMedals!: number;
  public TotalNbrAtheletes!: number;
  public CountryId!: number;

  public xLabel: string = 'Years';
  
  showXAxisLabel = true;
  showXAxis = true;
  showYAxis = true;
  showGridLines = true;
  
  constructor(private olympicService: OlympicService,
              private activatedRoute: ActivatedRoute,
              private route: Router){

  }

  ngOnInit(): void {
    this.CountryId = parseInt(this.activatedRoute.snapshot.params['id']);

    this.olympics$ = this.olympicService.getOlympics();
    this.subscription = this.olympics$.subscribe((data : olympicModel[]) => {
      this.tabOlympicModel = data;
      if((this.tabOlympicModel != undefined)&&
       (this.tabOlympicModel[0].participations[0] != undefined)){

        if(this.doesIdExist()){
          this.country = this.getCountryNameById(this.CountryId);
          this.NbrEntries = this.getNbrOfEntriesByCountry(this.CountryId);
          this.TotalNbrMedals = this.getScoreByCountry(this.tabOlympicModel[this.CountryId - 1].participations);
          this.TotalNbrAtheletes = this.getNbrOfAthletesByCountry(this.tabOlympicModel[this.CountryId - 1].participations);
          this.setupDatas();
        }
        else{
          this.route.navigateByUrl('**');
        }
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  getCountryNameById(id: number): string{
    return this.tabOlympicModel[id - 1].country;
  }

  getNbrOfEntriesByCountry(id: number): number{
    return this.tabOlympicModel[id - 1].participations.length;
  }

  getScoreByCountry(input : participationsModel[]):number{
    let integer: number = 0;

    for(let j = 0; j < input.length; j++){ 
      integer += input[j].medalsCount;
    }
    return integer;
  }

  getNbrOfAthletesByCountry(input : participationsModel[]): number {
    let integer: number = 0;

    for(let j = 0; j < input.length; j++){ 
      integer += input[j].athleteCount;
    }
    return integer;
  }

  setupDatas(){
    let serie: serie[] = [];

    for(let i = 0; i < this.tabOlympicModel[this.CountryId - 1].participations.length; i++){
      serie = [...serie, {name: this.tabOlympicModel[this.CountryId - 1].participations[i].year.toString(), 
                          value: this.tabOlympicModel[this.CountryId - 1].participations[i].medalsCount}];
    }
    this.data = [...this.data, {name: this.country, series: serie}];
  }

  doesIdExist(){
    let localSet: Set<number> = this.getIds();

    if(localSet.has(this.CountryId))
      return true;
    else
      return false;
  }

  getIds():Set<number>{
    let lSet: Set<number> = new Set<number>();
    for(let i = 0; i < this.tabOlympicModel.length; i++){
      lSet.add(this.tabOlympicModel[i].id);
    }
    return lSet;
  }
}
