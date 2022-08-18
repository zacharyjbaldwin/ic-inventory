import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { IntegratedCircuit } from 'src/app/models/integrated-circuit.model';
import { IntegratedCircuitsService } from 'src/app/services/integrated-circuits.service';
import { Column } from 'src/app/shared/table-structure.enum';
import { NewIcModalComponent } from '../modals/new-ic-modal/new-ic-modal.component';

@Component({
  selector: 'ic-table',
  templateUrl: './ic-table.component.html',
  styleUrls: ['./ic-table.component.scss']
})
export class IcTableComponent implements OnInit {

  public columns: typeof Column = Column;
  public isLoading = true;
  public integratedCircuits: IntegratedCircuit[] = [];
  public panelOpen: boolean[] = [];
  public sortColumn: Column = 0;
  public sortDescending: boolean = true;
  public totalRecords: number = 0;

  public newIntegratedCircuitModal?: BsModalRef;

  constructor(
    private icService: IntegratedCircuitsService,
    private modalService: BsModalService
  ) { }

  ngOnInit(): void {
    this.icService.integratedCircuitsListChanged.subscribe((integratedCircuits) => {
      if (integratedCircuits) {
        this.totalRecords = integratedCircuits.length;
        this.integratedCircuits = integratedCircuits;
        this.panelOpen = [];
        this.integratedCircuits.forEach(() => this.panelOpen.push(false));
      }
      this.isLoading = false;
    });
  }

  deleteIntegratedCircuit(i: number) {
    this.icService.deleteIntegratedCircuit(i);
  }

  public openNewIntegratedCircuitModal() {
    this.newIntegratedCircuitModal = this.modalService.show(NewIcModalComponent);
    (this.newIntegratedCircuitModal.content as NewIcModalComponent).confirm.subscribe((integratedCircuit) => {
      console.log(integratedCircuit);
      this.icService.addIntegratedCircuit(integratedCircuit);
    });
  }

  public sort(column: Column) {
    if (this.sortColumn == column) {
      this.sortDescending = !this.sortDescending;
    } else {
      this.sortColumn = column;
    }

    this.icService.sortIntegratedCircuits(this.sortColumn, this.sortDescending);
  }

  public setPanelsOpen(open: boolean) {
    for (let i = 0; i < this.panelOpen.length; i++) {
      this.panelOpen[i] = open;
    }
  }

  public showIncompleteRecordWarning(i: number) {
    let ic = this.integratedCircuits[i];
    return !ic.code || !ic.datasheetUrl || !ic.description || !ic.type;
  }

  public togglePanel(i: number) {
    this.panelOpen[i] = !this.panelOpen[i];
  }
}
