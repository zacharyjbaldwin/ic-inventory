import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { IntegratedCircuit } from '../models/integrated-circuit.model';
import { Column } from '../shared/table-structure.enum';

@Injectable({
  providedIn: 'root'
})
export class IntegratedCircuitsService {

  public integratedCircuitsListChanged = new Subject<IntegratedCircuit[]>();

  private integratedCircuits: IntegratedCircuit[] = [];

  constructor() { }

  public getIntegratedCircuits(): Observable<IntegratedCircuit[]> {
    return of(this.integratedCircuits);
  }

  public setIntegratedCircuits(integratedCircuits: IntegratedCircuit[]): void {
    this.integratedCircuits = integratedCircuits;
    this.integratedCircuitsListChanged.next(this.integratedCircuits);
  }

  public sortIntegratedCircuits(column: Column, descending: boolean): void {

    switch(column) {
      case Column.Code:
        // list.sort((a, b) => (a.color > b.color) ? 1 : (a.color === b.color) ? ((a.size > b.size) ? 1 : -1) : -1 )
        this.integratedCircuits.sort((a, b) => (a.code.toLowerCase() < b.code.toLowerCase()) ? 1 : -1);
        break;
      case Column.Type:
        this.integratedCircuits.sort((a, b) => (a.type.toLowerCase() < b.type.toLowerCase()) ? 1 : -1);
        break;
      case Column.Description:
        this.integratedCircuits.sort((a, b) => (a.description.toLowerCase() < b.description.toLowerCase()) ? 1 : -1);
        break;
    }

    if (descending) {
      this.integratedCircuits = this.integratedCircuits.reverse();
    }

    this.integratedCircuitsListChanged.next(this.integratedCircuits);
  }
}
