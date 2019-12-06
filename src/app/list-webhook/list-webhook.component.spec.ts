import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListWebhookComponent } from './list-webhook.component';

describe('ListWebhookComponent', () => {
  let component: ListWebhookComponent;
  let fixture: ComponentFixture<ListWebhookComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListWebhookComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListWebhookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
