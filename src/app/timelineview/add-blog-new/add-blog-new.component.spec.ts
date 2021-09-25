import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBlogNewComponent } from './add-blog-new.component';

describe('AddBlogNewComponent', () => {
  let component: AddBlogNewComponent;
  let fixture: ComponentFixture<AddBlogNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddBlogNewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddBlogNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
