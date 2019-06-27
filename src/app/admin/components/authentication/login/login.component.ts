import { Component, Output, EventEmitter } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

export interface Credentials {
    username: string;
    password: string;
    remmember: boolean; 
}

@Component({
    selector: 'admin-login',
    templateUrl: 'login.component.html',
    styleUrls: ['login.component.scss']
})
export class LoginComponent {
    validateForm: FormGroup;
    @Output() credentials: EventEmitter<Credentials> = new EventEmitter();

    submitForm(): void {
        for (const i in this.validateForm.controls) {
        this.validateForm.controls[i].markAsDirty();
        this.validateForm.controls[i].updateValueAndValidity();
        }
        if (this.validateForm.status == 'VALID') {
            this.credentials.emit(this.validateForm.value);
        }   
    }

    constructor(private fb: FormBuilder) {}

    ngOnInit(): void {
        this.validateForm = this.fb.group({
        username: [null, [Validators.required]],
        password: [null, [Validators.required]],
        remember: [true]
        });
    }
}