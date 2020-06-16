import {Component, OnInit} from '@angular/core';
import { PAGE } from '../domain/widget-dto';

@Component({
  selector: 'app-combination',
  templateUrl: './combination.component.html',
  styleUrls: ['./combination.component.css']
})
export class CombinationComponent implements OnInit {

  public selectedTab = PAGE.ONE;
  public readonly PAGE = PAGE;

  constructor() { }

  ngOnInit() {
  }

  public changeTab(page: PAGE) {
    this.selectedTab = page;
  }
}
