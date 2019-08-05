import { Component, Input, Output, EventEmitter } from "@angular/core";

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
  templateUrl: `group-tag.component.html`
})
export class GroupTagComponent {
  @Input() data: GroupTag;
  @Input() options: string[] = [];
  onGroupTyping: boolean; // disabled when submission
  tags: Tags = {};
  optionsStore = [];
  @Output() typing: EventEmitter<{ success: boolean; value: any }> = new EventEmitter();
  @Output() onConfirm: EventEmitter<onConfirmState> = new EventEmitter();

  isTag(id: string) {
    return this.tags.hasOwnProperty(id) && this.tags[id];
  }

  onCloseGroupTag(event) {
    console.log(event);
  }
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
  
  onCloseGroupTagWhenClick(success: boolean, id) {
    this.tags[id] = !success;
  }
}
