import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PaoService {
  private base_url  = environment.base_url;
  constructor(private http: HttpClient) {}

  cargarPaos(): Observable<any[]> { // Cambiamos el nombre del método de 'cargarItem' a 'cargarPaos'
    const url = `${this.base_url}/paos`; // Cambiamos la URL para cargar los PAOs
    return this.http.get<any[]>(url);
  }

  crearPao(data: any): Observable<any> { // Cambiamos el nombre del método de 'crearItem' a 'crearPao'
    const url = `${this.base_url}/paos`; // Cambiamos la URL para crear un PAO
    return this.http.post<any>(url, data);
  }

  actualizarPao(data: any): Observable<any> { // Cambiamos el nombre del método de 'actualizarItem' a 'actualizarPao'
    const url = `${this.base_url}/paos/${data.ID_POA}`; // Cambiamos la URL para actualizar un PAO
    return this.http.put<any>(url, data);
  }

  eliminarPao(data: any): Observable<any> { // Cambiamos el nombre del método de 'eliminarItem' a 'eliminarPao'
    const url = `${this.base_url}/paos/${data.ID_POA}`; // Cambiamos la URL para eliminar un PAO
    return this.http.delete<any>(url);
  }
}
