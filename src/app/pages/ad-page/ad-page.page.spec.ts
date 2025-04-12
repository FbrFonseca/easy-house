import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdPagePage } from './ad-page.page';

describe('AdPagePage', () => {
  let component: AdPagePage;
  let fixture: ComponentFixture<AdPagePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AdPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
