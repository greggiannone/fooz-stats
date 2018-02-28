import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmallStatView } from './small-stat-view.component';

describe('SmallStatView', () => {
  let component: SmallStatView;
  let fixture: ComponentFixture<SmallStatView>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmallStatView ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmallStatView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
