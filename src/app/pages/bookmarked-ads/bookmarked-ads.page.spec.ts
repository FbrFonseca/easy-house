import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BookmarkedAdsPage } from './bookmarked-ads.page';

describe('BookmarkedAdsPage', () => {
  let component: BookmarkedAdsPage;
  let fixture: ComponentFixture<BookmarkedAdsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(BookmarkedAdsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
