import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnerRegComponent } from './owner-reg.component';

describe('OwnerRegComponent', () => {
  let component: OwnerRegComponent;
  let fixture: ComponentFixture<OwnerRegComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OwnerRegComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OwnerRegComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
