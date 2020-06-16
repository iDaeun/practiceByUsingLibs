import {Injectable} from '@angular/core';
import {PAGE, widget} from '../domain/widget-dto';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WidgetStorageService {

  constructor() { }

  public readonly changeTab$ = new Subject<PAGE>();

  private _widgetDataList: Array<widget>;

  get widgetDataList(): Array<widget> {
    return this._widgetDataList;
  }

  set widgetDataList(value: Array<widget>) {
    this._widgetDataList = value;
  }

  public changeTab(page: PAGE) {
    this.changeTab$.next(page);
  }
}
