import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BidedTripsComponent } from './bided-trips.component';

describe('BidedTripsComponent', () => {
  let component: BidedTripsComponent;
  let fixture: ComponentFixture<BidedTripsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BidedTripsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BidedTripsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
