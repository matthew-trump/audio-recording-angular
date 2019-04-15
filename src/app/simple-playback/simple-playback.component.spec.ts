import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SimplePlaybackComponent } from './simple-playback.component';

describe('SimplePlaybackComponent', () => {
  let component: SimplePlaybackComponent;
  let fixture: ComponentFixture<SimplePlaybackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimplePlaybackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimplePlaybackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
