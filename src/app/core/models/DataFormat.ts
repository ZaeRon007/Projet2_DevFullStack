interface dataInterface {
    name:string;
    value:number;
}

export class dataFormat {
    dataTabInterface!: dataInterface[];

    constructor(public country: string, public score: number){
        this.dataTabInterface = [this.createData(country,score)];
    }

    createData(country: string,  score: number) : dataInterface{
        const test: dataInterface = {
            name:country,
            value:score
        };
        return test;
        
    }

    newElement(country: string,  score: number){
        this.dataTabInterface.push(this.createData(country,score));
    }
}