import {
  Directive,
  Input,
  ElementRef,
  Renderer2,
  HostListener,
  EventEmitter,
  Output, AfterViewInit
} from "@angular/core";

@Directive({
  selector: "[tag-id]"
})
export class GroupTagDirective {
  @Input("tag-id") tagId: string;
  @Output() onClickOutSide: EventEmitter<boolean> = new EventEmitter();
  init: boolean = true;

  constructor(private _ref: ElementRef, private _render: Renderer2) {}

  @HostListener("document:click", ["$event.path"])
  onCLick(path: HTMLElement[]) {

    if (this.init) {
      this.onClickOutSide.emit(false);
      this.init = false;  
      return;
    }

    if (path.indexOf(this._ref.nativeElement) == -1) {
      
      this.onClickOutSide.emit(true);
      return;
    } 
  }

  click() { this._ref.nativeElement.click(); }
}
