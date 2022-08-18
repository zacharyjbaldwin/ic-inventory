import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeaderComponent } from './header/header.component';
import { IcTableComponent } from './dashboard/ic-table/ic-table.component';
import { FiltersComponent } from './dashboard/filters/filters.component';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { NewIcModalComponent } from './dashboard/modals/new-ic-modal/new-ic-modal.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    HeaderComponent,
    IcTableComponent,
    FiltersComponent,
    LoadingSpinnerComponent,
    NewIcModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CollapseModule.forRoot(),
    ModalModule.forRoot(),
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
