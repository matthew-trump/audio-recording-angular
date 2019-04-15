import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SimplePlaybackHarkComponent } from './simple-playback-hark.component';

describe('SimplePlaybackHarkComponent', () => {
  let component: SimplePlaybackHarkComponent;
  let fixture: ComponentFixture<SimplePlaybackHarkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimplePlaybackHarkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimplePlaybackHarkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
