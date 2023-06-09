import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditEdgeComponent } from './edit-edge.component';

describe('EditEdgeComponent', () => {
  let component: EditEdgeComponent;
  let fixture: ComponentFixture<EditEdgeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditEdgeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditEdgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
