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
        const response = await this.apiService.request('get', `${this.basePath}/${id}`, null);
        return response;
    }

    public async findAll(): Promise<Grocery[]> {
        const response = await this.apiService.request('get', this.basePath, null);
        return response;
    }

    public async update(grocery: Grocery, id: number): Promise<Grocery> {
        const response = await this.apiService.request('put', `${this.basePath}/${id}`, grocery);
        return response;
    }

    public async delete(id: number): Promise<number> {
        const response = await this.apiService.request('delete', `${this.basePath}/${id}`, null);
        return response;
    }

}
