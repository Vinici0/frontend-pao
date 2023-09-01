import { Component } from '@angular/core';
import { ProyService } from 'src/app/services/proy.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { PaoService } from 'src/app/services/pao.service';
@Component({
  selector: 'app-proy',
  templateUrl: './proy.component.html',
  styleUrls: ['./proy.component.scss'],
})
export class ProyComponent {
  public formSubmitted = false;
  public proy: any = [];
  public paos: any = []; // Agregamos esta línea

  public proyForm = this.fb.group({
    CODIGO: ['', Validators.required],
    CENTRO_GESTOR: ['', Validators.required],
    PRODUCTO_INSTITUCIONAL: [''],
    DESCRIPCION_ACTIVIDAD_PROYECTO: ['', Validators.maxLength(1500)],
    PERIODICIDAD: [''],
    MEDIOS_DE_VERIFICACION: [''],
    ID_POA: [''],
  });

  constructor(
    private fb: FormBuilder,
    private proyService: ProyService, // Asegúrate de que el servicio sea 'ProyService'
    private paoService: PaoService
  ) {}

  ngOnInit(): void {
    this.cargarProy();
    this.cargarPaos(); // Agregamos esta línea
  }

  crearProy() {
    console.log(this.proyForm.value);
    this.formSubmitted = true;
    if (this.proyForm.invalid) {
      return;
    }
    this.proyService.crearProy(this.proyForm.value).subscribe((resp: any) => {
      console.log(resp);
      this.cargarProy();
    });
  }

  cargarProy() {
    this.proyService.cargarProy().subscribe((resp: any) => {
      console.log(resp);
      this.proy = resp.proys; // Cambiamos el nombre de la propiedad de 'items' a 'proy'
    });
  }

  eliminarProy(data: any) {
    console.log('eliminar');
    this.proyService.eliminarProy(data).subscribe((resp: any) => {
      console.log(resp);
      this.cargarProy();
    });
  }

  editarProy(data: any) {
    const dataForm = {
      CODIGO: this.proyForm.value.CODIGO,
      CENTRO_GESTOR: this.proyForm.value.CENTRO_GESTOR,
      PRODUCTO_INSTITUCIONAL: this.proyForm.value.PRODUCTO_INSTITUCIONAL,
      DESCRIPCION_ACTIVIDAD_PROYECTO:
        this.proyForm.value.DESCRIPCION_ACTIVIDAD_PROYECTO,
      PERIODICIDAD: this.proyForm.value.PERIODICIDAD,
      MEDIOS_DE_VERIFICACION: this.proyForm.value.MEDIOS_DE_VERIFICACION,
      ID_POA: this.proyForm.value.ID_POA,
    };
    this.proyService.actualizarProy(dataForm).subscribe((resp: any) => {
      console.log(resp);
      this.cargarProy();
      this.proyForm.reset();
    });
  }

  selectProy(data: any) {
    this.proyForm.setValue({
      CODIGO: data.CODIGO,
      CENTRO_GESTOR: data.CENTRO_GESTOR,
      PRODUCTO_INSTITUCIONAL: data.PRODUCTO_INSTITUCIONAL,
      DESCRIPCION_ACTIVIDAD_PROYECTO: data.DESCRIPCION_ACTIVIDAD_PROYECTO,
      PERIODICIDAD: data.PERIODICIDAD,
      MEDIOS_DE_VERIFICACION: data.MEDIOS_DE_VERIFICACION,
      ID_POA: data.ID_POA,
    });
  }

  eliminarProyModal(data: any) {
    console.log(data);
    this.proyService.eliminarProy(data).subscribe((resp: any) => {
      console.log(resp);
      this.cargarProy();
    });
  }

  cargarPaos() {
    // Cambiamos el nombre del método de 'cargarItem' a 'cargarPaos'
    this.paoService.cargarPaos().subscribe((resp: any) => {
      console.log(resp);
      this.paos = resp.paos; // Cambiamos el nombre de la propiedad de 'items' a 'paos'
    });
  }
}
