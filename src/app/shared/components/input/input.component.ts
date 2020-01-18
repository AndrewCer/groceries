import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

export interface InputFormValue {
    input: string;
}

export interface FadeState {
    visible: boolean;
    fadeOut: boolean;
}

@Component({
    selector: 'scram-input',
    templateUrl: './input.component.html',
    styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit {
    @Output() public formSubmit = new EventEmitter<InputFormValue>();

    public form: FormGroup;
    public valueAdded: FadeState = {
        visible: false,
        fadeOut: false
    };

    constructor(private formBuilder: FormBuilder) { }

    public ngOnInit() {
        this.setupForm();
    }

    public apply() {
        const control = this.form.get('input');
        if (this.form.valid) {
            this.formSubmit.emit(this.form.value);
            control.reset();
            this.initValueAdded();
        } else {
            control.markAsDirty();
        }
    }

    public initValueAdded() {
        this.valueAdded.visible = true;
        this.valueAdded.fadeOut = true;
        setTimeout(() => {
            this.valueAdded.visible = false;
            this.valueAdded.fadeOut = false;
        }, 2000);
    }

    private setupForm(): void {
        this.form = this.formBuilder.group({
            input: ['', Validators.required]
        });
    }

}
