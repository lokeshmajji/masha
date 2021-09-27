import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimelineView3Component } from './timeline-view3.component';

describe('TimelineView3Component', () => {
  let component: TimelineView3Component;
  let fixture: ComponentFixture<TimelineView3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimelineView3Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TimelineView3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
