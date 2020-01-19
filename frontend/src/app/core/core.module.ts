import { CommonModule } from '@angular/common';
import { NgModule, Optional, SkipSelf } from '@angular/core';

import { ApiService } from './http/api/api.service';
import { GroceryService } from './http/grocery/grocery.service';

@NgModule({
    imports: [
        CommonModule,
    ],
    providers: [
        ApiService,
        GroceryService
    ]
})
export class CoreModule {
    /* make sure CoreModule is imported only by one NgModule the AppModule */
    constructor(
        @Optional() @SkipSelf() parentModule: CoreModule
    ) {
        if (parentModule) {
            throw new Error('CoreModule is already loaded. Import only in AppModule.');
        }
    }
}
