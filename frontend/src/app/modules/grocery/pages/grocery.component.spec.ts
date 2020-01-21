import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { Store } from '@ngrx/store';
import { provideMockStore, MockStore } from '@ngrx/store/testing';

import { GroceryService } from '../../../core/http/grocery/grocery.service';
import { GroceryServiceMock } from '../../../core/http/mocks/grocer.service.mock';
import { InputComponent } from '../../../shared/components/input/input.component';
import { ListComponent } from '../../../shared/components/list/list.component';
import { InputFormValue } from '../../../shared/models/forms/input/input-form-value';

import { GroceryComponent } from './grocery.component';

// NOTE: This isn't a full coverage test. It's meant for example purposes.

describe('GroceryComponent', () => {
    let component: GroceryComponent;
    let fixture: ComponentFixture<GroceryComponent>;

    let store: MockStore<[
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
    ]>;
    const initialState = [];

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                GroceryComponent,
                InputComponent,
                ListComponent
            ],
            imports: [
                IonicModule.forRoot(),
                ReactiveFormsModule
            ],
            providers: [
                { provide: GroceryService, useClass: GroceryServiceMock },
                provideMockStore({ initialState })
            ]
        }).compileComponents();

        store = TestBed.get(Store);
        spyOn(store, 'dispatch').and.callThrough();

        fixture = TestBed.createComponent(GroceryComponent);
        component = fixture.componentInstance;

        component.groceries = store;

        fixture.detectChanges();


    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    describe('ngOnInit()', () => {
        it('should get data from db and dispatch to the store', () => {
            const serviceSpy = spyOn(component['groceryService'], 'findAll').and.callThrough();

            component.ngOnInit();

            expect(store.dispatch).toHaveBeenCalledTimes(2);
            expect(serviceSpy).toHaveBeenCalledTimes(1);
            expect(serviceSpy).toHaveBeenCalledWith();
        });
    });

    describe('onInputFormSubmit()', () => {
        describe('creating a new grocery', () => {
            it('should envoke an API update and dispatch to the store', () => {
                const serviceSpy = spyOn(component['groceryService'], 'create').and.callThrough();

                const mockInput: InputFormValue = {
                    input: 'Tea'
                };

                component.onInputFormSubmit(mockInput);

                expect(store.dispatch).toHaveBeenCalledTimes(2);
                expect(serviceSpy).toHaveBeenCalledTimes(1);
                expect(serviceSpy).toHaveBeenCalledWith({
                    name: mockInput.input,
                    done: false,
                    count: 1,
                    _id: 2222
                });
            });
        });
    });

});
