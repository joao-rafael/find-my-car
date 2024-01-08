import { Component, EventEmitter, Output } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormGroup } from '@angular/forms';
import { formatDate } from '@angular/common';
import { FormFilter } from 'src/app/modules/shared/interfaces/form-filter.interface';

/**
 * @description
 * This component is a form for filtering purposes
 */
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class FormComponent {
  isFiltered: boolean = false;

  @Output() filterChange: EventEmitter<FormFilter> = new EventEmitter<FormFilter>();

  @Output() filterClear: EventEmitter<void> = new EventEmitter();

  form: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      date: [''], 
      license: [''] 
    }, { validators: this.filterValidator } as AbstractControlOptions);
  }

  /**
   * Filter function
   * @remark
   * emits the filter to the upper component
   */
  filter() {
    let filterParams = this.form.value;
    if(filterParams.date) {
      const date = filterParams.date;
      const isoDateString: string = date.toISOString();
      const simpleDate: string = isoDateString.split('T')[0].replaceAll('-', '/');
      filterParams.date = formatDate(simpleDate, 'MM/dd/yyyy', 'en-US');
    }
    this.filterChange.emit(filterParams);
    this.isFiltered = true;
  }

  /**
   * Clear filter function implementation
   */
  clearFilter() {
    this.form.reset();
    this.isFiltered = false;
    this.filterClear.emit();
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
