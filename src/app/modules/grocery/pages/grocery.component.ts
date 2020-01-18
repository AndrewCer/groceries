import { Component } from '@angular/core';

import { InputFormValue } from '../../../shared/models/forms/input/input-form-value';

@Component({
  styleUrls: ['./grocery.component.scss'],
  templateUrl: 'grocery.component.html'
})
export class GroceryComponent  {

  public onInputFormSubmit(value: InputFormValue) {
    // TODO (acer): wire value into NgRx
  }

}
