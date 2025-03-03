import { Component, OnDestroy, OnInit } from '@angular/core';
import { olympicModel } from '../core/models/Olympic';
import { participationsModel } from '../core/models/Participation';
import { Observable, Subscription } from 'rxjs';
import { OlympicService } from '../core/services/olympic.service';
import { Router } from '@angular/router';
import { pieChart } from '../core/models/chartInterface';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit, OnDestroy{
  public olympics$!: Observable<olympicModel[]>;
  public tabOlympicModel: olympicModel[] = [];
  public data: pieChart[] = [];
  public subscription!: Subscription;
  public NbrCountry: number = 0;
  public NbrJOs: number = 0;
  public first: boolean = true;

  constructor(private olympicService: OlympicService,
              private route: Router) {
  }

  ngOnInit(): void {
    this.olympics$ = this.olympicService.getOlympics();
    this.subscription = this.olympics$.subscribe((data : olympicModel[]) => {
      this.tabOlympicModel = data;
      if((this.tabOlympicModel != undefined)&&
       (this.tabOlympicModel[0].participations[0] != undefined)){
        this.drawDashBoard(this.tabOlympicModel);
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  drawDashBoard(input: olympicModel[]): void{

    if(input.length > 1){

      this.NbrCountry = this.getCountryNumber(input);
      this.NbrJOs = this.getNbrOfJOs(input);
      this.fillNamesAndScoreByCountry(input);
    }
  }
  
  addElement(country: string,  score: number) {
    if(this.first){
      this.data = [{ 'name' : country, 'value' : score }];
      this.first = false;
    }
    else
      this.data = [...this.data, { 'name' : country, 'value' : score }];
  }

  getCountryNumber(input : olympicModel[]): number{
    let country : Set<string> = new Set<string>();

    for(let i = 0; i < input.length; i++){ 
      if(!country.has(input[i].country))
        country.add(input[i].country);
    }
    return country.size;
  }

  getNbrOfJOs(input : olympicModel[]): number{
    let Nbr : Set<number> = new Set<number>();

    for(let i = 0; i < input.length; i++){ 
      for(let j = 0; j < input[i].participations.length; j++){ 
        
        if(!Nbr.has(input[i].participations[j].year))
          Nbr.add(input[i].participations[j].year);
      }
    }
    return Nbr.size;
  }

  fillNamesAndScoreByCountry(input : olympicModel[]){
    for(let i = 0; i < input.length; i++){
      this.addElement(input[i].country, this.getScoreByCountry(input[i].participations));
    }
  }

  getScoreByCountry(input : participationsModel[]):number{
    let integer: number = 0;

    for(let j = 0; j < input.length; j++){ 
      integer += input[j].medalsCount;
    }
    return integer;
  }

  getIdByName(name: string): number{
    for( let i = 0; i < this.tabOlympicModel.length; i++){
      if(name === this.data[i].name)
        return this.tabOlympicModel[i].id;      
    }
    return -1;
  }

  onSelect(event: any): void {
    this.route.navigateByUrl(`details/${this.getIdByName(event.name)}`);
  }
}
