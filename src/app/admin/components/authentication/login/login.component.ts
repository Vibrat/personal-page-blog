import { Component, Output, EventEmitter, Input } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, of } from "rxjs";

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
    @Input()  success$: Observable<boolean> = of(true);

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