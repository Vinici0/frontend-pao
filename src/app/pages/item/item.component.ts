import { Component, OnInit } from '@angular/core';
import { ProyService } from 'src/app/services/proy.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ItemService } from 'src/app/services/item.service';
@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {
  public formSubmitted = false;
  public items: any = [];

  public itemForm = this.fb.group({
    NOMBRE_DEL_ITEM: ['', Validators.required],
    TAREA: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private itemService: ItemService
  ) { }

  ngOnInit(): void {
    this.cargarItem();
  }

  crearItem() {
    console.log(this.itemForm.value);
    this.formSubmitted = true;
    if (this.itemForm.invalid) {
      return;
    }
    this.itemService.crearItem(this.itemForm.value).subscribe((resp: any) => {
      console.log(resp);
      this.cargarItem();
    });
  }

  cargarItem() {
    this.itemService.cargarItem().subscribe((resp: any) => {
      console.log(resp);
      this.items = resp.items;
    });
  }

  eliminaritem() {
    console.log('eliminar');
    this.itemService.eliminarItem(this.itemForm.value).subscribe((resp: any) => {
      console.log(resp);
      this.cargarItem();
    });
  }

  editarItem(data: any) {
    const dataForm = {
      NOMBRE_DEL_ITEM: this.itemForm.value.NOMBRE_DEL_ITEM,
      TAREA: this.itemForm.value.TAREA,
      ID_item: data.ID_item,
    };
    this.itemService.actualizarItem(dataForm).subscribe((resp: any) => {
      console.log(resp);
      this.cargarItem();
      this.itemForm.reset();
    });
  }

  selectItem(data: any) {
    this.itemForm.setValue({
      NOMBRE_DEL_ITEM: data.NOMBRE_DEL_ITEM,
      TAREA: data.TAREA,
    });
  }

  eliminarItemModal(data: any) {
    console.log(data);
    this.itemService.eliminarItem(data).subscribe((resp: any) => {
      console.log(resp);
      this.cargarItem();
    }
    );
  }

}
