import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleRecordingComponent } from './simple-recording.component';

describe('SimpleRecordingComponent', () => {
  let component: SimpleRecordingComponent;
  let fixture: ComponentFixture<SimpleRecordingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimpleRecordingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimpleRecordingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
