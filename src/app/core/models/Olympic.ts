// TODO: create here a typescript interface for an olympic country

import { participationsModel } from "./Participation";

export class olympicModel {
    id!: number;
    country!: string;
    participations: participationsModel[] = [];

}