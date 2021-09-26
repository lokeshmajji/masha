import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimelineView2Component } from './timeline-view2.component';

describe('TimelineView2Component', () => {
  let component: TimelineView2Component;
  let fixture: ComponentFixture<TimelineView2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimelineView2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TimelineView2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
