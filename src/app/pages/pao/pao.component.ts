import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ItemService } from 'src/app/services/item.service';
import { PaoService } from 'src/app/services/pao.service';
@Component({
  selector: 'app-pao',
  templateUrl: './pao.component.html',
  styleUrls: ['./pao.component.scss']
})
export class PaoComponent {

  public formSubmitted = false;
  public paos: any = []; // Cambiamos el nombre de la variable de 'items' a 'paos'
  public items = []; // Eliminamos esta línea

  public paoForm = this.fb.group({
    ODS: ['', Validators.required],
    EJE: ['', Validators.required],
    OBJETIVOS_NACIONALES: ['', Validators.required],
    POLITICAS: ['', Validators.required],
    METAS: ['', Validators.required],
    PROGRAMA_NACIONAL: ['', Validators.required],
    OBJETIVOS_ESTRATÉGICOS_PEDI: ['', Validators.required],
    OBJETIVOS_OPERATIVOS: ['', Validators.required], // Puedes ajustar las validaciones según tus necesidades
  });

  constructor(
    private fb: FormBuilder,
    private paoService: PaoService, // Cambiamos el nombre del servicio a 'PaoService'
    private itemService: ItemService // Eliminamos esta línea
  ) { }

  ngOnInit(): void {
    this.cargarPaos(); // Cambiamos el nombre del método de 'cargarItem' a 'cargarPaos'
  }

  crearPao() {
    console.log(this.paoForm.value);
    this.formSubmitted = true;
    if (this.paoForm.invalid) {
      return;
    }
    this.paoService.crearPao(this.paoForm.value).subscribe((resp: any) => {
      console.log(resp);
      this.cargarPaos();
    });
  }

  cargarItems() {
    this.itemService.cargarItem().subscribe((resp: any) => {
      console.log(resp);
      this.items = resp.items;
    });
  }

  cargarPaos() { // Cambiamos el nombre del método de 'cargarItem' a 'cargarPaos'
    this.paoService.cargarPaos().subscribe((resp: any) => {
      console.log(resp);
      this.paos = resp.paos; // Cambiamos el nombre de la propiedad de 'items' a 'paos'
    });
  }

  eliminarPao(data: any) { // Cambiamos el nombre del método de 'eliminaritem' a 'eliminarPao'
    console.log('eliminar');
    this.paoService.eliminarPao(data).subscribe((resp: any) => {
      console.log(resp);
      this.cargarPaos();
    });
  }

  editarPao(data: any) {
    const dataForm = {
      ODS: this.paoForm.value.ODS,
      EJE: this.paoForm.value.EJE,
      OBJETIVOS_NACIONALES: this.paoForm.value.OBJETIVOS_NACIONALES,
      POLITICAS: this.paoForm.value.POLITICAS,
      METAS: this.paoForm.value.METAS,
      PROGRAMA_NACIONAL: this.paoForm.value.PROGRAMA_NACIONAL,
      OBJETIVOS_ESTRATÉGICOS_PEDI: this.paoForm.value.OBJETIVOS_ESTRATÉGICOS_PEDI,
      OBJETIVOS_OPERATIVOS: this.paoForm.value.OBJETIVOS_OPERATIVOS,
      ID_pao: data.ID_pao,
    };
    this.paoService.actualizarPao(dataForm).subscribe((resp: any) => {
      console.log(resp);
      this.cargarPaos();
      this.paoForm.reset();
    });
  }

  selectPao(data: any) { // Cambiamos el nombre del método de 'selectItem' a 'selectPao'
    this.paoForm.setValue({
      ODS: data.ODS,
      EJE: data.EJE,
      OBJETIVOS_NACIONALES: data.OBJETIVOS_NACIONALES,
      POLITICAS: data.POLITICAS,
      METAS: data.METAS,
      PROGRAMA_NACIONAL: data.PROGRAMA_NACIONAL,
      OBJETIVOS_ESTRATÉGICOS_PEDI: data.OBJETIVOS_ESTRATÉGICOS_PEDI,
      OBJETIVOS_OPERATIVOS: data.OBJETIVOS_OPERATIVOS,
    });
  }

  eliminarPaoModal(data: any) {
    console.log(data);
    this.paoService.eliminarPao(data).subscribe((resp: any) => {
      console.log(resp);
      this.cargarPaos();
    });
  }

}
