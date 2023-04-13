import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RendelesekComponent } from './rendelesek.component';

describe('RendelesekComponent', () => {
  let component: RendelesekComponent;
  let fixture: ComponentFixture<RendelesekComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RendelesekComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RendelesekComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
