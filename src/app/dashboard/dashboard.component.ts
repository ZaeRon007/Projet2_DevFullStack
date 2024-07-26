import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { olympicModel } from '../core/models/Olympic';
import { dataInterface } from '../core/models/DataFormat';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  // @Input() olympics: olympicModel[] = [];

  public dataInterfaces: Array<dataInterface> = new Array<dataInterface>();
  public colorSchemePC: string = "vivid";

  data = [
    { 'name' : "> 95", 'value' : 765 },
    {'name' : "90 - 94", 'value' : 123},
    {'name' : "< 90", 'value' : 84}
  ];

  public NbrCountry!: number;
  public NbrJOs!: number;

  drawDashBoard(input: olympicModel[]): void{

    if(input.length > 1){

      for(let i = 0; i < input.length; i++){
        // let local: dataInterface = this.newElement(input[i].country,input[i].id);
        this.dataInterfaces = this.addElement(this.dataInterfaces, input[i].country,input[i].id);
      }
      console.log("data :", this.data)
      console.log("test dataInterfaces : ",this.dataInterfaces);  

      // this.data = [...this.dataInterfaces];
      console.log("data_updated :", this.data)

    }
  }


  addElement(pInput1: Array<dataInterface>, country: string,  score: number): Array<dataInterface>{
    // if(pInput1 == undefined){
    //     return pInput2;
    // }
    // else{
    //     Array.prototype.push.apply(pInput1,pInput2);
    //     return pInput1;
    // }
    // console.log("pInput1 : ", pInput1);
    return pInput1 = [...pInput1, { 'name' : country, 'value' : score }];
  }

  newElement(country: string,  score: number): dataInterface{
    let local: dataInterface = {
        name:country,
        value:score
    }
    return local;
  }
}
