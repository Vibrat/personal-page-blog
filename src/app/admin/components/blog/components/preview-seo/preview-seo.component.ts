import { Component, Input } from "@angular/core";

export interface SeoData {
  title: string;
  url: string;
  des: string;
}

export const defaultData = {
  title: "Title",
  url: "sample.com",
  des: "Sample Description"
};

@Component({
  selector: `preview-seo`,
  templateUrl: `preview-seo.component.html`,
  styleUrls: ["preview-seo.component.scss"]
})
export class PreviewSeoComponent {
  @Input() data: SeoData = defaultData;
}
