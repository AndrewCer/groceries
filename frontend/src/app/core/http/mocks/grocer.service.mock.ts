import { Grocery } from '../../../shared/store/models/grocery.model';

export class GroceryServiceMock {

    private mockGroceryData: Grocery[] = [
        {
            name: 'Apple',
            done: false,
            count: 2,
            _id: 12345
        },
        {
            name: 'Bread',
            done: false,
            count: 2,
            _id: 54321
        }
    ];

    public async create(grocery: Grocery): Promise<Grocery> {
        return new Promise((resolve) => {
            grocery._id = 2222;
            resolve(grocery);
        });
    }

    public async find(id: number): Promise<Grocery> {
        return new Promise((resolve) => {
            resolve(this.mockGroceryData[0]);
        });
    }

    public async findAll(): Promise<Grocery[]> {
        return new Promise((resolve) => {
            resolve(this.mockGroceryData);
        });
    }

    public async update(grocery: Grocery, id: number): Promise<Grocery> {
        return new Promise((resolve) => {
            grocery._id = id;
            resolve(grocery);
        });
    }

    public async delete(id: number): Promise<Grocery> {
        return new Promise((resolve) => {
            resolve(this.mockGroceryData[0]);
        });
    }
}