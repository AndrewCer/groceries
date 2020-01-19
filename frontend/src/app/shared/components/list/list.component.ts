import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Grocery, ItemToRemove } from '../../store/models/grocery.model';

@Component({
    selector: 'scram-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss']
})
export class ListComponent {
    @Input() items: Grocery[];

    @Output() public editItem = new EventEmitter<Grocery>();
    @Output() public removeItem = new EventEmitter<ItemToRemove>();

    public edit(item: Grocery) {
        this.editItem.emit(item);
    }

    public remove(grocery: Grocery, index: number) {
        this.removeItem.emit({ ...grocery, index });
    }
}
