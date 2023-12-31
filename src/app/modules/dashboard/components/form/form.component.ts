import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class FormComponent {
  @Output() filterChange: EventEmitter<any> = new EventEmitter<any>();
  form: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      date: [''], 
      license: [''] 
    }, { validators: this.filterValidator });
  }

  /**
   * Filter function
   * @remark
   * emits the filter to the upper component
   */
  filter() {
    const filterParams = this.form.value;
    this.filterChange.emit(filterParams);
  }

  /**
   * Prevents the form to allow filtering with empty fields
   * 
   * @param formGroup formgroup from the formBuilder
   * @returns validator object or null
   */
  filterValidator(formGroup: FormGroup) {
    const date = formGroup.get('date')?.value;
    const license = formGroup.get('license')?.value;

    if (!date && !license) {
      return { atLeastOneFieldRequired: true };
    }
    return null;
  }

}
