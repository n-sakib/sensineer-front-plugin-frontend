import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerOrderInfoComponent } from './customer-order-info.component';

describe('CustomerOrderInfoComponent', () => {
  let component: CustomerOrderInfoComponent;
  let fixture: ComponentFixture<CustomerOrderInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerOrderInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerOrderInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
