import { Component, OnInit } from '@angular/core';
import { olympicModel } from '../core/models/Olympic';
import { participationsModel } from '../core/models/Participation';
import { Observable, Subject } from 'rxjs';
import { OlympicService } from '../core/services/olympic.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit{
  public olympics$!: Observable<olympicModel[]>;
  public tabOlympicModel: olympicModel[] = [];
  
  data = [
    { 'name' : "test", 'value' : 10}
  ];

  public NbrCountry: number = 0;
  public NbrJOs: number = 0;
  public first: boolean = true;

  constructor(private olympicService: OlympicService) {
  }

  ngOnInit(): void {
    this.olympics$ = this.olympicService.getOlympics();
    this.olympics$.subscribe((data : olympicModel[]) => {
      this.tabOlympicModel = data;
      if((this.tabOlympicModel != undefined)&&
       (this.tabOlympicModel[0].participations[0] != undefined)){
        console.log("DATA CONTENT : ", this.tabOlympicModel);
        this.drawDashBoard(this.tabOlympicModel);
      }
    });
    
  }

  drawDashBoard(input: olympicModel[]): void{

    if(input.length > 1){

      this.NbrCountry = this.getCoutryNbr(input);
      this.NbrJOs = this.getNbrOfJOs(input);

      this.namesAndScoreByCountry(input);

      // console.log("data :", this.data);
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

  getCoutryNbr(input : olympicModel[]): number{
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

  namesAndScoreByCountry(input : olympicModel[]){
    for(let i = 0; i < input.length; i++){
      this.addElement(input[i].country, this.ScoreByCountry(input[i].participations));
    }
  }

  ScoreByCountry(input : participationsModel[]):number{
    let integer: number = 0;

    for(let j = 0; j < input.length; j++){ 
      integer += input[j].medalsCount;
    }
    return integer;
  }
}
