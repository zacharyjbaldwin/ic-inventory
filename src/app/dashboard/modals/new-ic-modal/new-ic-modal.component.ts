import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { IntegratedCircuit } from 'src/app/models/integrated-circuit.model';
import { IntegratedCircuitsService } from 'src/app/services/integrated-circuits.service';

interface FormInput {
  defaultValue: string | null;
  label: string;
  name: string;
  placeholder: string;
  required: boolean;
  rows?: number;
  type: string;
}

@Component({
  selector: 'app-new-ic-modal',
  templateUrl: './new-ic-modal.component.html',
  styleUrls: ['./new-ic-modal.component.scss']
})
export class NewIcModalComponent implements OnInit {

  @Output() confirm = new EventEmitter<IntegratedCircuit>();

  public formItems: FormInput[] = [
    {
      defaultValue: null,
      label: 'Code',
      name: 'code',
      placeholder: 'e.g. HD74S04N',
      required: true,
      type: 'text'
    },
    {
      defaultValue: null,
      label: 'Shorthand',
      name: 'shorthand',
      placeholder: 'e.g. 7404',
      required: false,
      type: 'text'
    },
    {
      defaultValue: null,
      label: 'Series',
      name: 'series',
      placeholder: 'e.g. 7400 Series Logic',
      required: false,
      type: 'text'
    },
    {
      defaultValue: null,
      label: 'Type',
      name: 'type',
      placeholder: 'e.g. Logic Gate',
      required: false,
      type: 'text'
    },
    {
      defaultValue: null,
      label: 'Description',
      name: 'description',
      placeholder: 'e.g. hex inverter gate',
      required: false,
      type: 'text'
    },
    {
      defaultValue: null,
      label: 'Datasheet URL',
      name: 'datasheetUrl',
      placeholder: 'e.g. https://www.ti.com/xyz.pdf',
      required: false,
      type: 'text'
    },
    {
      defaultValue: null,
      label: 'Location',
      name: 'location',
      placeholder: 'e.g. Pro\'sKit Box 1 Section 3',
      required: false,
      type: 'text'
    },
    {
      defaultValue: null,
      label: 'Notes',
      name: 'notes',
      placeholder: 'e.g. Don\'t supply more than 3 volts to this IC.',
      required: false,
      rows: 2,
      type: 'textarea'
    },
  ];
  public newICForm: FormGroup = new FormGroup({});

  constructor(private modalRef: BsModalRef) { }

  ngOnInit(): void {
    this.formItems.forEach((formItem) => {
      let control = new FormControl(formItem.defaultValue);
      if (formItem.required) control.addValidators([Validators.required]);
      this.newICForm.addControl(formItem.name, control);
    });
  }

  onSubmit() {
    this.confirm.emit(this.newICForm.value);
    this.closeModal();
  }

  closeModal() {
    this.modalRef.hide();
  }

}
