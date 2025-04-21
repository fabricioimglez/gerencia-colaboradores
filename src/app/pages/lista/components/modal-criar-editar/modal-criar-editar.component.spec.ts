import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCriarEditarComponent } from './modal-criar-editar.component';

describe('ModalCriarEditarComponent', () => {
  let component: ModalCriarEditarComponent;
  let fixture: ComponentFixture<ModalCriarEditarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalCriarEditarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalCriarEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
