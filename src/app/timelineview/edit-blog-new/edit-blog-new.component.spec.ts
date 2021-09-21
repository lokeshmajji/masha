import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditBlogNewComponent } from './edit-blog-new.component';

describe('EditBlogNewComponent', () => {
  let component: EditBlogNewComponent;
  let fixture: ComponentFixture<EditBlogNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditBlogNewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditBlogNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
