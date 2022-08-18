import { Component, OnInit } from '@angular/core';
import { IntegratedCircuitsService } from 'src/app/services/integrated-circuits.service';

@Component({
  selector: 'filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent implements OnInit {

  hideMoreFilters: boolean = true;
  searchQuery: string = "";

  constructor(private icService: IntegratedCircuitsService) { }

  ngOnInit(): void {
  }

  updateSearch() {
    this.icService.filterIntegratedCircuits(this.searchQuery);
  }

  toggleMoreFilters() {
    this.hideMoreFilters = !this.hideMoreFilters;
  }
}
