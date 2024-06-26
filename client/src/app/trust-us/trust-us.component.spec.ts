import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrustUsComponent } from './trust-us.component';

describe('TrustUsComponent', () => {
  let component: TrustUsComponent;
  let fixture: ComponentFixture<TrustUsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrustUsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TrustUsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
