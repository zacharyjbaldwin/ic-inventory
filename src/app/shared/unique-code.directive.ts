import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";
import { IntegratedCircuit } from "../models/integrated-circuit.model";

// TODO eventually use this in the reactive form for adding and IC.
export function uniqueCodeValidator(integratedCircuits: IntegratedCircuit[]): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    return (integratedCircuits.some(ic => ic.code == control.value) ? { nonUniqueCode: { value: control.value } } : null);
  }
}
