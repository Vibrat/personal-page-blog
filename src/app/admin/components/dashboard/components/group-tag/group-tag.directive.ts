import {
  Directive,
  Input,
  ElementRef,
  Renderer2,
  HostListener,
  EventEmitter,
  Output
} from "@angular/core";

export interface ClickOutsideOutput {
  isOutSide: boolean;
  path: HTMLElement[];
}

@Directive({
  selector: "[tag-id]"
})
export class GroupTagDirective {
  @Input("tag-id") tagId: string;
  @Output() onClickOutSide: EventEmitter<ClickOutsideOutput> = new EventEmitter();
  init: boolean = true;

  constructor(private _ref: ElementRef, private _render: Renderer2) {}

  @HostListener("document:click", ["$event.path"])
  onCLick(path: HTMLElement[]) {

    if (this.init) {
      this.onClickOutSide.emit({ 
        isOutSide: false,
        path: path
      });
      this.init = false;  
      return;
    }

    if (path.indexOf(this._ref.nativeElement) == -1) {
      
      this.onClickOutSide.emit({
        isOutSide: true,
        path: path
      });
      return;
    } 
  }

  click() { this._ref.nativeElement.click(); }
}
