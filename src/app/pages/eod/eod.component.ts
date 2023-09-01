import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { EodService } from 'src/app/services/eod.service';

@Component({
  selector: 'app-eod',
  templateUrl: './eod.component.html',
  styleUrls: ['./eod.component.scss'],
})
export class EodComponent implements OnInit {
  public formSubmitted = false;
  public eod: any = [];

  public eodForm = this.fb.group({
    CODIGO: ['', Validators.required],
    CENTRO_GESTOR: ['', Validators.required],
  });

  constructor(private fb: FormBuilder, private eodService: EodService) {}

  ngOnInit(): void {
    this.cargarEod();
  }

  crearEod() {
    console.log(this.eodForm.value);
    this.formSubmitted = true;
    if (this.eodForm.invalid) {
      return;
    }
    this.eodService.crearEod(this.eodForm.value).subscribe((resp: any) => {
      console.log(resp);
      this.cargarEod();
    });
  }

  cargarEod() {
    this.eodService.cargarEod().subscribe((resp: any) => {
      console.log(resp);
      this.eod = resp.eod;
    });
  }

  eliminarEod() {
    console.log('eliminar');
    this.eodService.eliminarEod(this.eodForm.value).subscribe((resp: any) => {
      console.log(resp);
      this.cargarEod();
    });
  }

  editarEod(data: any) {
    const dataForm = {
      CODIGO: this.eodForm.value.CODIGO,
      CENTRO_GESTOR: this.eodForm.value.CENTRO_GESTOR,
      ID_EOD: data.ID_EOD,
    };
    this.eodService.actualizarEod(dataForm).subscribe((resp: any) => {
      console.log(resp);
      this.cargarEod();
      this.eodForm.reset();
    });
  }

  selectEod(data: any) {
    this.eodForm.setValue({
      CODIGO: data.CODIGO,
      CENTRO_GESTOR: data.CENTRO_GESTOR,
    });
  }

  eliminarEodModal(data: any) {
    console.log(data);
  }
}
