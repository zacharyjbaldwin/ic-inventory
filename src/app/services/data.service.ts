import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IntegratedCircuit } from '../models/integrated-circuit.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  public fetchIntegratedCircuits(): Observable<IntegratedCircuit[]> {
    return this.http.get<IntegratedCircuit[]>(`${environment.databaseUrl}/integratedCircuits.json`);
  }

  public storeIntegratedCircuits(integratedCircuits: IntegratedCircuit[]) {
    this.http.put(`${environment.databaseUrl}/integratedCircuits.json`, integratedCircuits).subscribe();
  }
}
