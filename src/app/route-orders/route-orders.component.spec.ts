import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RouteOrdersComponent } from './route-orders.component';

describe('RouteOrdersComponent', () => {
  let component: RouteOrdersComponent;
  let fixture: ComponentFixture<RouteOrdersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RouteOrdersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RouteOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
