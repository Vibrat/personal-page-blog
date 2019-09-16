import { Component, Input } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";

export interface GroupData {
  name: string;
  permissions: string[];
}

@Component({
  selector: "dashboard-new-group",
  templateUrl: "new-group.component.html",
  styleUrls: ["new-group.component.scss"]
})
export class NewGroupComponent {
  data: GroupData;
  formData: FormGroup;
  current = 0;
  index = "";

  @Input() display: boolean = false;

  constructor() {
    this.formData = new FormGroup({
      group: new FormControl("", []),
      permissions: new FormControl("", [])
    });
  }

  log(value: string[]): void {
    this.data = {
      name: this.formData.get("group").value,
      permissions: value
    };
  }

  submitForm() {}

  showModal() {
    this.display = true;
  }

  handleCancelModal() {
    this.display = false;
  }

  handleSubmitModal() {
    this.display = false;
  }

  pre(): void {
    this.current -= 1;
    this.changeContent();
  }

  next(): void {
    this.current += 1;
    this.changeContent();
  }

  done(): void {
    console.log("done");
  }

  changeContent(): void {
    switch (this.current) {
      case 0: {
        this.index = "Add Group Name";
        break;
      }
      case 1: {
        this.index = "Add Permissions";
        break;
      }
      default: {
        this.index = "Error";
      }
    }
  }
}
