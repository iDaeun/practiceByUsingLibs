import {Injectable} from '@angular/core';
import {widget} from '../domain/widget-dto';

@Injectable({
  providedIn: 'root'
})
export class WidgetStorageService {

  constructor() { }

  private _widgetDataList: Array<widget>;

  get widgetDataList(): Array<widget> {
    return this._widgetDataList;
  }

  set widgetDataList(value: Array<widget>) {
    this._widgetDataList = value;
  }
}
