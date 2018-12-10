import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxProgressiveImgLoaderComponent } from './ngx-progressive-img-loader.component';

describe('NgxProgressiveImgLoaderComponent', () => {
  let component: NgxProgressiveImgLoaderComponent;
  let fixture: ComponentFixture<NgxProgressiveImgLoaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgxProgressiveImgLoaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxProgressiveImgLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
