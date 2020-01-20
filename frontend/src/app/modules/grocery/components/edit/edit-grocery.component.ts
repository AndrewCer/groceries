import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';

import { GroceryService } from '../../../../core/http/grocery/grocery.service';
import { Grocery } from '../../../../shared/store/models/grocery.model';


@Component({
    styleUrls: ['./edit-grocery.component.scss'],
    templateUrl: 'edit-grocery.component.html'
})
export class EditGroceryComponent implements OnInit {
    @Input() id: number;

    public form: FormGroup;

    constructor(
        private formBuilder: FormBuilder,
        private groceryService: GroceryService,
        private modalController: ModalController
    ) { }

    public async ngOnInit() {
        const groceryServiceResponse = await this.groceryService.find(this.id);
        this.setupForm(groceryServiceResponse);
    }

    public dismissModal(updatedItem: Grocery) {
        if (!updatedItem) {
            this.modalController.dismiss();
        }
        if (this.form.valid && !this.form.pristine) {
            this.modalController.dismiss(updatedItem);
        }
    }

    private setupForm(gorcery: Grocery): void {
        this.form = this.formBuilder.group({
            name: [gorcery.name, Validators.required],
            count: [gorcery.count, Validators.required],
            _id: gorcery._id,
            done: gorcery.done
        });
    }

}
