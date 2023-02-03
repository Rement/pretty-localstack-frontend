import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SQSComponent } from './sqs.component';

describe('SQSComponent', () => {
  let component: SQSComponent;
  let fixture: ComponentFixture<SQSComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SQSComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SQSComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
