/* Several interfaces designed for ngx-chart pie-chart & line-chart */
export interface pieChart {
    name : string,
    value: number
}

export interface serie {
    name: string,
    value: number
}

export interface lineChart {
    name: string, 
    series: serie[]
}