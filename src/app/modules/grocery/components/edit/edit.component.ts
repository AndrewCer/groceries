import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Grocery } from '../../../../shared/store/models/grocery.model';


@Component({
  styleUrls: ['./grocery.component.scss'],
  templateUrl: 'grocery.component.html'
})
export class GroceryComponent implements OnInit {
    @Input() item: Grocery;

    public form: FormGroup;

    constructor(private formBuilder: FormBuilder) { }

    public ngOnInit() {
        this.setupForm();
    }

    private setupForm(): void {
        this.form = this.formBuilder.group({
            input: [this.item.name, Validators.required]
        });
    }

}
