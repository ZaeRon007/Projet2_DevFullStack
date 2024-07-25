import { Component, OnInit } from '@angular/core';
import { HomeComponent } from '../pages/home/home.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit{

  constructor(private homeComponent: HomeComponent){

  }

  ngOnInit(): void {
    console.log("test from dashboard component",this.homeComponent.tabOlympicModel);
  }

}
