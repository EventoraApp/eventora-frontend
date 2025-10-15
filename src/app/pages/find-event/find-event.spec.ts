import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FindEvent } from './find-event';

describe('FindEvent', () => {
  let component: FindEvent;
  let fixture: ComponentFixture<FindEvent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FindEvent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FindEvent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
