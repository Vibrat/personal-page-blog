import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { validateDuplicateGroup } from "./validation";
import { Observable, of } from "rxjs";

export interface GroupData {
  name: string;
  permissions: string[];
}

@Component({
  selector: "dashboard-new-group",
  templateUrl: "new-group.component.html",
  styleUrls: ["new-group.component.scss"]
})
export class NewGroupComponent implements OnInit {
  data: GroupData;
  formData: FormGroup;
  currentStep = 0;
  currentStepName = "";

  @Input() display: boolean = false;
  @Input() permissions: string[] = [];
  @Input() groupValidation: Function = () => of();
  @Input() delayDetection: number = 200;
  @Output() onSubmit: EventEmitter<GroupData> = new EventEmitter();

  ngOnInit() {
    this.formData = new FormGroup({
      group: new FormControl("", [], [validateDuplicateGroup(this.groupValidation, this.delayDetection)])
    });
  }

  outputPermissions(permissions: string[]): void {
    this.data = {
      name: this.formData.get("group").value,
      permissions: permissions
    };
  }

  submitForm() {
    this.closeModal();
    this.onSubmit.emit(this.data);
  }

  showModal() {
    this.display = true;
  }

  closeModal() {
    this.display = false;
  }

  pre() {
    this.currentStep -= 1;
    this.changeContent();
  }

  next() {
    this.currentStep += 1;
    this.changeContent();
  }

  changeContent(): void {
    switch (this.currentStep) {
      case 0: {
        this.currentStepName = "Add Group Name";
        break;
      }
      case 1: {
        this.currentStepName = "Add Permissions";
        break;
      }
      default: {
        this.currentStepName = "Error";
      }
    }
  }
}
