import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class EodService {
  constructor(private http: HttpClient) {}

  cargarEod() {
    const url = `${base_url}/eods`;
    return this.http.get<any[]>(url);
  }

  crearEod(data: any) {
    const url = `${base_url}/eods`;
    return this.http.post(url, data);
  }

  actualizarEod(data: any) {
    const url = `${base_url}/eods/${data.ID_EOD}`;
    return this.http.put(url, data);
  }

  eliminarEod(data: any) {
    const url = `${base_url}/eods/${data.ID_EOD}`;
    return this.http.delete(url);
  }
}
