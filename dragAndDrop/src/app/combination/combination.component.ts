import {Component, OnInit} from '@angular/core';

export enum PAGE {
  ONE = 1,
  TWO = 2
}

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
