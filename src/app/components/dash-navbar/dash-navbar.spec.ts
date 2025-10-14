import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashNavbar } from './dash-navbar';

describe('DashNavbar', () => {
  let component: DashNavbar;
  let fixture: ComponentFixture<DashNavbar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashNavbar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashNavbar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
