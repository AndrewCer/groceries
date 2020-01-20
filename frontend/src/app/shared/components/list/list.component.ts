import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IonItemSliding } from '@ionic/angular';

import { Grocery, ItemWithIndex } from '../../store/models/grocery.model';
import { Observable } from 'rxjs';

@Component({
    selector: 'scram-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss']
})
export class ListComponent {
    @Input() items: Observable<Grocery[]>;

    @Output() public editItem = new EventEmitter<Grocery>();
    @Output() public removeItem = new EventEmitter<ItemWithIndex>();
    @Output() public checkedItem = new EventEmitter<ItemWithIndex>();

    public checked(grocery: Grocery, index: number) {
        this.checkedItem.emit({ ...grocery, index });
    }

    public closeSlider(slidingItem: IonItemSliding) {
        slidingItem.closeOpened();
    }

    public edit(item: Grocery) {
        this.editItem.emit(item);
    }

    public remove(grocery: Grocery, index: number) {
        this.removeItem.emit({ ...grocery, index });
    }
}
