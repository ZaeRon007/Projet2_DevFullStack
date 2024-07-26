import { Component, input, Input, OnInit } from '@angular/core';
import { olympicModel } from '../core/models/Olympic';
import { dataFormat } from '../core/models/DataFormat';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit{
  @Input() olympics: olympicModel[] = [];
  public dataFormatted: dataFormat = new dataFormat("",0);

  public colorSchemePC: string = "vivid";

  data = [
    { 'name' : "> 95", 'value' : 765 },
    {'name' : "90 - 94", 'value' : 123},
    {'name' : "< 90", 'value' : 84}
  ];

  // public data: string[][] = [[],[]];
  public NbrCountry!: number;
  public NbrJOs!: number;

  ngOnInit(): void {
    
  }

  drawDashBoard(input: olympicModel[]): void{
    
    // for(let i = 0; i < input.length; i++){
    //   console.log("i=",i);
    //   this.data[i][0] = input[i].id.toString();
    //   this.data[i][1] = input[i].country.toString();
    //   console.log("id : country => ",this.data[i][0]," : ", this.data[i][1]);

    //   for(let j = 0; j < input[i].participations.length; j++){
          
    //   }
    // }
    
    // data = [
    //   { 'name' : "> 95", 'value' : 765 },
    //   {'name' : "90 - 94", 'value' : 123},
    //   {'name' : "< 90", 'value' : 84}
    // ];

    if(input[0] != undefined){
      for(let i = 0; i <= input.length; i++){
        this.dataFormatted.newElement(input[i].country,0);
      }

      console.log("test : ",this.dataFormatted);
      // this.data = tab;
    }
    
  }
}
