import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverRegComponent } from './driver-reg.component';

describe('DriverRegComponent', () => {
  let component: DriverRegComponent;
  let fixture: ComponentFixture<DriverRegComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DriverRegComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DriverRegComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
