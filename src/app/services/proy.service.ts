import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
const base_url = environment.base_url;
@Injectable({
  providedIn: 'root'
})
export class ProyService {
  private baseUrl = environment.base_url;

  constructor(private http: HttpClient) {}

  cargarProy() {
    const url = `${this.baseUrl}/proys`;
    return this.http.get<any[]>(url);
  }

  crearProy(data: any) {
    const url = `${this.baseUrl}/proys`;
    return this.http.post(url, data);
  }

  actualizarProy(data: any) {
    const url = `${this.baseUrl}/proys/${data.ID_POA}`;
    return this.http.put(url, data);
  }

  eliminarProy(data: any) {
    const url = `${this.baseUrl}/proys/${data.ID_POA}`;
    return this.http.delete(url);
  }
}

