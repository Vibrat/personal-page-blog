import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: `admin-dashboard-password`,
  templateUrl: "admin-dashboard-password.component.html",
  styleUrls: ["admin-dashboard-password.component.scss"]
})
export class AdminDashboardPasswordComponent implements OnInit {
  validateForm: FormGroup;

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
  }

  genderChange(value: string): void {
    this.validateForm
      .get("note")!
      .setValue(value === "male" ? "Hi, man!" : "Hi, lady!");
  }

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      username: [null],
      password: [null, [Validators.required]],
      passwordConfirm: [null, [Validators.required]]
    });
  }
}
