import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: `page-new`,
  templateUrl: `page-new.component.html`,
  styleUrls: ["page-new.component.scss"]
})
export class PageNewComponent implements OnInit {
  validateForm: FormGroup;
  tabs = ["General", "Description"];

  constructor(private fb: FormBuilder) {}

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      title: [null, [Validators.required]],
      category: [null],
      url: [null],
      seoDescription: [null]
    });
  }
}
