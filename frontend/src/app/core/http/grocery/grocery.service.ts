import { Injectable } from '@angular/core';

import { ApiService } from '../api/api.service';

import { Grocery } from '../../../shared/store/models/grocery.model';

@Injectable()
export class GroceryService {

    public basePath = '/groceries';

    constructor(private apiService: ApiService) { }

    public async create(grocery: Grocery): Promise<Grocery> {
        const response = await this.apiService.request('post', this.basePath, grocery);
        return response;
    }

    public async find(id: number): Promise<Grocery> {
        const response = await this.apiService.request('get', this.basePath, null, id);

        return response.data;
    }
    // public async findAll(): Promise<Grocery[]> {}
    // public async update(id: number): Promise<something> {}

    // public async delete(id: number): Promise<something> {}

}
