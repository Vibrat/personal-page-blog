import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewChildren,
  QueryList,
  ElementRef,
  Directive
} from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { validateDuplicateGroup } from "./validation";
import { of } from "rxjs";

export interface GroupData {
  name: string;
  permissions: string[];
}

@Directive({
  selector: "[nz-checkbox][option]"
})
export class SelectOption {

  @Input() isChecked: boolean = false;
  @Input() nzValue: string;

  constructor(public ref: ElementRef) {}
  click(alwaysChecked = false, state: boolean) {
    if (alwaysChecked && this.isChecked != state) {
      return;
    }

    if (this.isChecked != state) {
      this.isChecked = state;
    } else {
      this.isChecked = !this.isChecked;
      this.ref.nativeElement.click();
    }
  }
}

@Component({
  selector: "dashboard-new-group",
  templateUrl: "new-group.component.html",
  styleUrls: ["new-group.component.scss"]
})
export class NewGroupComponent implements OnInit {

  @ViewChildren(SelectOption) checkBoxes: QueryList<SelectOption>;

  // Default for data
  data: GroupData = {
    name: '',
    permissions: []
  };;

  formData: FormGroup;
  currentStep = 0;
  currentStepName = "";
  isSelectedAll: boolean = false;
  checked = {};

  @Input() display: boolean = false;
  @Input() permissions: string[] = [];
  @Input() groupValidation: Function = () => of();
  @Input() delayDetection: number = 200;
  @Output() onSubmit: EventEmitter<GroupData> = new EventEmitter();

  ngOnInit() {
    this.formData = new FormGroup({
      group: new FormControl(
        "",
        [Validators.required, Validators.pattern("[a-zA-Z0-9]*")],
        [validateDuplicateGroup(this.groupValidation, this.delayDetection)]
      )
    });
  }

  onChangeCheckBox(event, permission) {
    this.checked[permission] = event;
  }

  outputPermissions(permissions: string[]): void {
    this.data.permissions = permissions;
  }

  submitForm() {
    this.closeModal();
    this.onSubmit.emit(this.data);
    this.formData.reset();
    this.isSelectedAll = false;
    this.checked = {};
    this.currentStep = 0;
  }

  showModal() {
    this.display = true;
  }

  closeModal() {
    this.display = false;
  }

  selectAll() {
    this.checkBoxes.forEach((item: SelectOption) => item.click(true, this.isSelectedAll));
    this.isSelectedAll = !this.isSelectedAll;
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
    this.data.name = this.formData.get("group").value;
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
