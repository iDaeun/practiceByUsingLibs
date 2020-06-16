import { TestBed } from '@angular/core/testing';

import { WidgetStorageService } from './widget-storage.service';

describe('WidgetStorageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WidgetStorageService = TestBed.get(WidgetStorageService);
    expect(service).toBeTruthy();
  });
});
