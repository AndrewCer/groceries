import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Grocery } from '../../store/models/grocery.model';

@Component({
    selector: 'scram-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss']
})
export class ListComponent {
    @Input() items: Grocery[];

    @Output() public editItem = new EventEmitter<Grocery>();
    @Output() public removeItem = new EventEmitter<number>();

    public edit(item: Grocery) {
        this.editItem.emit(item);
    }

    public remove(itemIndex: number) {
        this.removeItem.emit(itemIndex);
    }
}
