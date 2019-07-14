import { Component, Output, EventEmitter, Input } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { of } from "rxjs";
import { AccountService } from "../../../../services/account.service";
import { validateUsername, validatePasswordConfirm } from "./validation";

@Component({
  selector: "admin-dashboard-new-account",
  templateUrl: "new-account.component.html",
  styleUrls: ["new-account.component.scss"]
})
export class NewAccountComponent {
  
  validateForm: FormGroup;
  @Input() display: boolean; // display checker for form
  @Output() onSubmit: EventEmitter<any> = new EventEmitter(); 

  constructor(private fb: FormBuilder, private _account: AccountService) {}

  submitForm(): void {
    if (this.validateForm.valid) {
      const emittedData = {
        username: this.validateForm.value['username'],
        password: this.validateForm.value['password']
      }
      this.onSubmit.emit(emittedData);
    }
  }
  
  onClick(): boolean {
    return (this.display = false);
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      username: [
        null,
        [Validators.required],
        [validateUsername(this._account)]
      ],
      password: [null, [Validators.required]],
      passwordConfirm: [null, [Validators.required]]
    });
    this.validateForm
      .get("passwordConfirm")
      .setAsyncValidators(
        validatePasswordConfirm(of(this.validateForm.get('password')))
      );
  }
}
