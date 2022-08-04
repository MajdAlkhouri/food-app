import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TitelComponent } from './titel.component';

describe('TitelComponent', () => {
  let component: TitelComponent;
  let fixture: ComponentFixture<TitelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TitelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TitelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
