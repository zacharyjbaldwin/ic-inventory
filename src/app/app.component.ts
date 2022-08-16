import { Component, OnInit } from '@angular/core';
import { DataService } from './services/data.service';
import { IntegratedCircuitsService } from './services/integrated-circuits.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(
    private dataService: DataService,
    private icService: IntegratedCircuitsService
  ) { }

  ngOnInit(): void {
    this.dataService.fetchIntegratedCircuits().subscribe((integratedCircuits) => {
      this.icService.setIntegratedCircuits(integratedCircuits);
    });
  }
}
