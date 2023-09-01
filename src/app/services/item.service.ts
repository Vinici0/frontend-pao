import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
const base_url = environment.base_url;
@Injectable({
  providedIn: 'root'
})
export class ItemService {


  constructor(private http: HttpClient) {}

  cargarItem() {
    const url = `${base_url}/items`;
    return this.http.get<any[]>(url);
  }

  crearItem(data: any) {
    const url = `${base_url}/items`;
    return this.http.post(url, data);
  }

  actualizarItem(data: any) {
    const url = `${base_url}/items/${data.ID_ITEM}`;
    return this.http.put(url, data);
  }

  eliminarItem(data: any) {
    const url = `${base_url}/items/${data.ID_ITEM}`;
    return this.http.delete(url);
  }
}
