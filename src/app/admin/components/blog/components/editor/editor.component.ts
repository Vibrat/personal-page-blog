import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import SimpleMDE from "simplemde";

@Component({
  selector: "md-editor",
  templateUrl: `editor.component.html`,
  styleUrls: ["editor.component.scss"]
})
export class EditorComponent implements OnInit {
  @ViewChild("editor", { static: true }) editor: ElementRef;
  md: SimpleMDE;

  ngOnInit() {
    this.md = new SimpleMDE({
      element: this.editor.nativeElement,
      forceSync: true,
      status: false
    });
  }
}
