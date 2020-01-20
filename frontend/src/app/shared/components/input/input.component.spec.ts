import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { InputComponent } from './input.component';

describe('InputComponent', () => {
    let component: InputComponent;
    let fixture: ComponentFixture<InputComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [InputComponent],
            imports: [
                IonicModule.forRoot(),
                ReactiveFormsModule
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(InputComponent);
        component = fixture.componentInstance;


        fixture.detectChanges();


    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    describe('ngOnInit()', () => {
        it('should initializes the form with default values', () => {
            expect(component.form).toBeTruthy();
            expect(component.form.get('input').value).toEqual('');
        });
    });

    describe('apply()', () => {
        describe('when the form is complete', () => {
            it('should emits submit() with the form values', () => {
                const value = {
                    input: 'Apple'
                };

                component.form.setValue(value, { emitEvent: false });

                const formSubmitSpy = spyOn(component.formSubmit, 'emit').and.callThrough();
                component.apply();

                expect(formSubmitSpy).toHaveBeenCalledWith({
                    input: value.input
                });
            });
        });

        describe('when the form is incomplete', () => {
            it('should not submit', () => {
                const formSubmitSpy = spyOn(component.formSubmit, 'emit').and.callThrough();
                component.apply();

                expect(formSubmitSpy).toHaveBeenCalledTimes(0);
            });
        });
    });

    describe('initValueAdded()', () => {

        it('should toggle the valueAdded object properties on then off', () => {
            expect(component.valueAdded.visible).toBe(false);
            expect(component.valueAdded.fadeOut).toBe(false);

            component.initValueAdded();

            expect(component.valueAdded.visible).toBe(true);
            expect(component.valueAdded.fadeOut).toBe(true);

            setTimeout(() => {
                expect(component.valueAdded.visible).toBe(false);
                expect(component.valueAdded.fadeOut).toBe(false);
            }, 2000);

        });
    });

});
