import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewChildren,
  ElementRef
} from "@angular/core";
import { ClickOutsideOutput } from "./group-tag.directive";
import { NzAutocompleteOptionComponent } from "ng-zorro-antd/auto-complete";

export interface GroupTag {
  id: number;
  group: {
    [key: string]: string;
  };
}

export interface Tags {
  [key: string]: boolean;
}

export interface onConfirmState {
  success: boolean;
  data: any;
  callback?: Function;
}

/**
 * Dump Component
 */
@Component({
  selector: "dashboard-admin-tag",
  templateUrl: `group-tag.component.html`,
  styleUrls: [`group-tag.component.scss`]
})
export class GroupTagComponent {
  @ViewChildren(NzAutocompleteOptionComponent, { read: ElementRef })
  autoSelection: ElementRef[];
  @Input() data: GroupTag;
  @Input() options: string[] = [];
  @Output() typing: EventEmitter<{
    success: boolean;
    value: any;
  }> = new EventEmitter();
  @Output() onConfirm: EventEmitter<onConfirmState> = new EventEmitter();
  onGroupTyping: boolean; // disabled when submission
  tags: Tags = {};
  optionsStore = [];

  isTag(id: string) {
    return this.tags.hasOwnProperty(id) && this.tags[id];
  }

  onCloseGroupTag(event) {
    console.log(event);
  }

  /* Switch between `edit` mode */
  onGroupEdit(id: string) {
    this.tags[id] = !this.tags[id];
  }

  /**
   * Call API Server to get values
   * when user's typing
   *
   * @param string value - text to be searched
   */
  listGroupAccountSync(value: string) {
    // Pre-check if value exist
    if (this.options.indexOf(value) != -1) {
      this.options = Object.values(this.optionsStore).filter(item =>
        item.startsWith(value)
      );
      this.typing.emit({ success: false, value: value });
      return;
    }

    // Emit value to Adapter to API Server
    this.typing.emit({ success: true, value: value });
  }

  /**
   * @Output when user
   *  - Hit enter
   *  - or click out side components 
   * 
   * @param groupName 
   * @param id 
   */
  handleGroupConfirm(groupName, id) {
    // Hide input tags
    if (groupName == "") {
      this.tags[id] = false;
      return;
    }

    // Check if another same behavior is trigering
    if (this.onGroupTyping) {
      return;
    }

    this.onGroupTyping = true;
    this.onConfirm.emit({
      success: true,
      data: { group: groupName, id: id },
      callback: () => {
        this.onGroupTyping = false;
        this.tags[id] = false;
      }
    });
  }

  /* @Output [tag-id] */
  onCloseGroupTagWhenClick(clickState: ClickOutsideOutput, id: number) {
    // Case: user click on autoSelection
    if (this.autoSelection) {
      let clickMap = this.autoSelection.map(
        e1 => clickState.path.indexOf(e1.nativeElement) != -1
      );
      if (clickMap.indexOf(true) != -1) {
        this.tags[id] = clickState.isOutSide;
        return;
      }
    }

    // Case default
    this.tags[id] = !clickState.isOutSide;
  }
}
