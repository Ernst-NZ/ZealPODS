import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverRoutesComponent } from './driver-routes.component';

describe('DriverRoutesComponent', () => {
  let component: DriverRoutesComponent;
  let fixture: ComponentFixture<DriverRoutesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DriverRoutesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DriverRoutesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
