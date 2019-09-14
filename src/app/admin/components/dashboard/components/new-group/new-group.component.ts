import { Component, Input } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";

@Component({
    selector: 'dashboard-new-group',
    templateUrl: 'new-group.component.html',
    styleUrls: ['new-group.component.scss']
})
export class NewGroupComponent {
    
    formData: FormGroup;

    @Input() display: boolean = false;

    constructor() {
        this.formData = new FormGroup({
            group: new FormControl('', []),
            permissions: new FormControl('', [])
        });
    }

    submitForm() {}

    onCancel(event) {
        console.log('on cancel');
    }
}