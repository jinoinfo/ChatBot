import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IccidDetailsComponent } from './iccid-details.component';

describe('IccidDetailsComponent', () => {
  let component: IccidDetailsComponent;
  let fixture: ComponentFixture<IccidDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IccidDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IccidDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
