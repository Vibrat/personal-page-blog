import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewChildren,
  QueryList,
  ElementRef,
  Directive,
  HostListener
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
  isClicked: boolean = false;
  constructor(public ref: ElementRef) {}
  click(alwaysChecked = false, state) {
    console.log('click', this.isClicked, 'state', state);
    if (alwaysChecked && this.isClicked != state) {
      return;
    }
    this.isClicked = !this.isClicked;
    this.ref.nativeElement.click(); 
  }

  @HostListener('click', []) onClick() {
    console.log('found click');
    this.isClicked = !this.isClicked;
  }
}

@Component({
  selector: "dashboard-new-group",
  templateUrl: "new-group.component.html",
  styleUrls: ["new-group.component.scss"]
})
export class NewGroupComponent implements OnInit {
  @ViewChildren(SelectOption) checkBoxes: QueryList<SelectOption>;

  data: GroupData;
  formData: FormGroup;
  currentStep = 0;
  currentStepName = "";
  stateSelection: boolean = false;

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

  selectAll() {
    this.checkBoxes.forEach((item: SelectOption) => item.click(true, this.stateSelection));
    this.stateSelection = !this.stateSelection;
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
