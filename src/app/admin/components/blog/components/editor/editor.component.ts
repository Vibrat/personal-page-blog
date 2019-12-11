import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import SimpleMDE from "simplemde";

export type Markdown = string;

/**
 * Editor Component that represnet markdown editor
 *
 * @see https://github.com/markedjs/marked
 * @see https://github.com/sparksuite/simplemde-markdown-editor
 */
@Component({
  selector: "md-editor",
  templateUrl: `editor.component.html`,
  styleUrls: ["editor.component.scss"]
})
export class EditorComponent implements OnInit {

  @ViewChild("editor", { static: true }) editor: ElementRef;
  mdEditor: SimpleMDE;
  content: Markdown;

  ngOnInit() {
    // Init simplemd
    this.mdEditor = new SimpleMDE({
      element: this.editor.nativeElement,
      forceSync: true,
      status: false
    });

    // listen on change
    this.mdEditor.codemirror.on(
      "change",
      () => (this.content = this.mdEditor.value())
    );
  }
}
