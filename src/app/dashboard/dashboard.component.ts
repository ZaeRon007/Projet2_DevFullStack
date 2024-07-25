import { Component, input, Input, OnInit } from '@angular/core';
import { HomeComponent } from '../pages/home/home.component';
import { olympicModel } from '../core/models/Olympic';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  // imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit{
  @Input() olympics: olympicModel[] = [];

  public colorScheme = []
  public data: string[][] = [[],[]];
  public NbrCountry!: number;
  public NbrJOs!: number;

  ngOnInit(): void {
    
  }

  drawDashBoard(input: olympicModel[]): void{
    
    for(let i = 0; i < input.length; i++){
      console.log("i=",i);
      this.data[i][0] = input[i].id.toString();
      this.data[i][1] = input[i].country.toString();
      console.log("id : country => ",this.data[i][0]," : ", this.data[i][1]);

      for(let j = 0; j < input[i].participations.length; j++){
          
      }
    }
  }
}
