import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditStorageComponent } from './edit-storage.component';

describe('EditStorageComponent', () => {
  let component: EditStorageComponent;
  let fixture: ComponentFixture<EditStorageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditStorageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditStorageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
