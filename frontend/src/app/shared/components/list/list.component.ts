import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Grocery, ItemWithIndex } from '../../store/models/grocery.model';

@Component({
    selector: 'scram-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss']
})
export class ListComponent {
    @Input() items: Grocery[];

    @Output() public editItem = new EventEmitter<Grocery>();
    @Output() public removeItem = new EventEmitter<ItemWithIndex>();
    @Output() public checkedItem = new EventEmitter<ItemWithIndex>();

    public checked(grocery: Grocery, index: number) {
        this.checkedItem.emit({ ...grocery, index });
    }

    public edit(item: Grocery) {
        this.editItem.emit(item);
    }

    public remove(grocery: Grocery, index: number) {
        this.removeItem.emit({ ...grocery, index });
    }
}
