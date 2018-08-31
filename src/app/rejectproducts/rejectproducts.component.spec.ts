import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RejectproductsComponent } from './rejectproducts.component';

describe('RejectproductsComponent', () => {
  let component: RejectproductsComponent;
  let fixture: ComponentFixture<RejectproductsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RejectproductsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RejectproductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
