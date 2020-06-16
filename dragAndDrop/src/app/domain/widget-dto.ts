import {singleData} from './singleData';

export enum PAGE {
  ONE = 1,
  TWO = 2
}

export class widget {
  page : PAGE;
  data : Array<singleData>
}
