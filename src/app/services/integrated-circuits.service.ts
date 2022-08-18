import { Injectable } from '@angular/core';
import { filter, Observable, of, Subject } from 'rxjs';
import { IntegratedCircuit } from '../models/integrated-circuit.model';
import { Column } from '../shared/table-structure.enum';

@Injectable({
  providedIn: 'root'
})
export class IntegratedCircuitsService {

  public integratedCircuitsListChanged = new Subject<IntegratedCircuit[]>();

  private integratedCircuits: IntegratedCircuit[] = [];

  constructor() { }

  public addIntegratedCircuit(integratedCircuit: IntegratedCircuit) {
    console.log(integratedCircuit);
    this.integratedCircuits.push(integratedCircuit);
    this.integratedCircuitsListChanged.next(this.integratedCircuits);
  }

  public deleteIntegratedCircuit(index: number) {
    this.integratedCircuits.splice(index, 1);
    this.integratedCircuitsListChanged.next(this.integratedCircuits);
  }

  public getIntegratedCircuits(): Observable<IntegratedCircuit[]> {
    return of(this.integratedCircuits);
  }

  public filterIntegratedCircuits(searchQuery: string) {
    searchQuery = searchQuery.toLowerCase();
    if (searchQuery == "") {
      this.integratedCircuitsListChanged.next(this.integratedCircuits);
    } else {
      let filteredIntegratedCircuits: IntegratedCircuit[];
      filteredIntegratedCircuits = this.integratedCircuits.filter(
        ic => ic.code.toLowerCase().includes(searchQuery)
        || ic.datasheetUrl?.toLowerCase().includes(searchQuery)
        || ic.description?.toLowerCase().includes(searchQuery)
        || ic.location?.toLowerCase().includes(searchQuery)
        || ic.notes?.toLowerCase().includes(searchQuery)
        || ic.series?.toLowerCase().includes(searchQuery)
        || ic.shorthand?.toLowerCase().includes(searchQuery)
        || ic.type?.toLowerCase().includes(searchQuery)
      );

      this.integratedCircuitsListChanged.next(filteredIntegratedCircuits);
    }
  }

  public setIntegratedCircuits(integratedCircuits: IntegratedCircuit[]): void {
    this.integratedCircuits = integratedCircuits;
    this.integratedCircuitsListChanged.next(this.integratedCircuits);
  }

  public sortIntegratedCircuits(column: Column, descending: boolean): void {
    switch(column) {
      case Column.Code:
        this.integratedCircuits.sort((a, b) => (a.code.toLowerCase() < b.code.toLowerCase()) ? 1 : -1);
        break;
      case Column.Type:
        this.integratedCircuits.sort((a, b) => {
          return (a.type == null && b.type == null) ? 0
            : (a.type == null) ? 1
            : (b.type == null) ? -1
            : (a.type.toLowerCase() < b.type.toLowerCase()) ? 1
            : (a.type.toLowerCase() == b.type.toLowerCase()) ? ((a.code < b.code) ? 1 : -1)
            : -1;
        });
        break;
      case Column.Description:
        this.integratedCircuits.sort((a, b) => {
          return (a.description == null && b.description == null) ? 0
            : (a.description == null) ? 1
            : (b.description == null) ? -1
            : (a.description.toLowerCase() < b.description.toLowerCase()) ? 1
            : (a.description.toLowerCase() == b.description.toLowerCase()) ? ((a.code < b.code) ? 1 : -1)
            : -1;
        });
        break;
    }

    // TODO update this so that things are actually ordered properly. This will do for now.
    if (descending) {
      this.integratedCircuits = this.integratedCircuits.reverse();
    }

    this.integratedCircuitsListChanged.next(this.integratedCircuits);
  }
}
