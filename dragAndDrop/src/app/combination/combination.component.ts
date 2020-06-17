import {Component, OnInit} from '@angular/core';
import {PAGE} from '../domain/widget-dto';
import {WidgetStorageService} from '../services/widget-storage.service';

@Component({
  selector: 'app-combination',
  templateUrl: './combination.component.html',
  styleUrls: ['./combination.component.css']
})
export class CombinationComponent implements OnInit {

  public tabNow = PAGE.ONE;
  public selectedTab = PAGE.ONE;
  public readonly PAGE = PAGE;

  constructor(private storage: WidgetStorageService) { }

  ngOnInit() {
  }

  public changeTab(page: PAGE) {
    this.selectedTab = page;
    this.storage.changeTab(this.tabNow);
    this.tabNow = this.selectedTab;
  }
}
