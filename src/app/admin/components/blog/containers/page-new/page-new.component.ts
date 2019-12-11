import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { SeoData } from "../../components/preview-seo/preview-seo.component";

@Component({
  selector: `page-new`,
  templateUrl: `page-new.component.html`,
  styleUrls: ["page-new.component.scss"]
})
export class PageNewComponent implements OnInit {
  validateForm: FormGroup;
  tabs = ["General", "Description"];
  preview: SeoData = {
    title: "Welcome to our page",
    url: "https://tuidoc.com/welcome",
    des:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi ista probare, quae sunt a te dicta? Refert tamen, quo modo."
  };

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
