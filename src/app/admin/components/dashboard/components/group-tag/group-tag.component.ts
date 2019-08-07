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
  id: number; // userId
  group: Tags;
}

export interface Tags {
  [key: string]: string;
}

export interface TagsMap {
  [key: string]: boolean;
}

export interface OnConfirmState {
  success: boolean;
  data: any;
  callback?: Function;
}

export interface OnTypingState {
  success: boolean;
  value: any;
}

export interface OnClostTagState {
  success: boolean;
  data: {
    id: number;
    groupname: string; 
  } | null;
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
  @ViewChildren(NzAutocompleteOptionComponent, { read: ElementRef }) autoSelection: ElementRef[];
  @Input() data: GroupTag;
  @Input() options: string[] = [];
  @Output() typing: EventEmitter<OnTypingState> = new EventEmitter();
  @Output() onConfirm: EventEmitter<OnConfirmState> = new EventEmitter();
  @Output() onCloseTag: EventEmitter<OnClostTagState> = new EventEmitter();
  onGroupTyping: boolean; // disabled when submission
  tags: TagsMap = {};
  optionsStore = []; // cache for options

  isTag(id: string) {
    return this.tags.hasOwnProperty(id) && this.tags[id];
  }

  /**
   * @Output Decorator
   * Delete tags
   * 
   * @param number id represent a tag
   */
  onCloseGroupTag(event, id: number, deletedValue: string) {
    
    if (this.data.group.hasOwnProperty(id)) {

        // Targeted snapshot
      let tag: OnClostTagState["data"] = {
        id: this.data.id, 
        groupname: this.data.group[id]
      };
      
      delete this.tags[id];
      delete this.data.group[id];
      
      this.onCloseTag.emit({
        success: true,
        data: tag
      });
      return;
    } 

    // Prevent data to be disappeared
    event.preventDefault();
    event.stopPropagation();
    this.onCloseTag.emit({
      success: false,
      data: null
    });
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
