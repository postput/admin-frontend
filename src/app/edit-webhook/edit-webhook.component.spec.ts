import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditWebhookComponent } from './edit-webhook.component';

describe('EditWebhookComponent', () => {
  let component: EditWebhookComponent;
  let fixture: ComponentFixture<EditWebhookComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditWebhookComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditWebhookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
