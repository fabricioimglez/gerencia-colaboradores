import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCriarEditarLocalComponent } from './modal-criar-editar-local.component';

describe('ModalCriarEditarLocalComponent', () => {
  let component: ModalCriarEditarLocalComponent;
  let fixture: ComponentFixture<ModalCriarEditarLocalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalCriarEditarLocalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalCriarEditarLocalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
