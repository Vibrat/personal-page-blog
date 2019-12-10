import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { NzMessageService } from "ng-zorro-antd";

import { ViewportService } from "~/app/shared/services/viewport.service";

interface ItemData {
  id: number;
  name: string;
  age: number;
  address: string;
}

@Component({
  selector: `admin-blog`,
  templateUrl: "admin-blog.component.html",
  styleUrls: ["admin-blog.component.scss"]
})
export class AdminBlogComponent implements OnInit {
  lgScreen$: Observable<boolean> = this.viewport.onLgScreenObserver();
  style = {
    title: {
      xs: {
        span: 16,
        offset: 0
      },
      lg: {
        span: 8,
        offset: 0
      }
    },
    action: {
      xs: {
        span: 24,
        offset: 0
      },
      lg: {
        span: 24,
        offset: 0
      }
    },
    search: {
      xs: {
        span: 8,
        offset: 0
      },
      lg: {
        span: 8,
        offset: 8
      }
    }
  };

  isAllDisplayDataChecked = false;
  isIndeterminate = false;
  listOfDisplayData: ItemData[] = [];
  listOfAllData: ItemData[] = [];
  mapOfCheckedId: { [key: string]: boolean } = {};

  constructor(
    private http: HttpClient,
    private msg: NzMessageService,
    public viewport: ViewportService
  ) {}

  currentPageDataChange($event: ItemData[]): void {
    this.listOfDisplayData = $event;
    this.refreshStatus();
  }

  refreshStatus(): void {
    this.isAllDisplayDataChecked = this.listOfDisplayData.every(
      item => this.mapOfCheckedId[item.id]
    );
    this.isIndeterminate =
      this.listOfDisplayData.some(item => this.mapOfCheckedId[item.id]) &&
      !this.isAllDisplayDataChecked;
  }

  checkAll(value: boolean): void {
    this.listOfDisplayData.forEach(
      item => (this.mapOfCheckedId[item.id] = value)
    );
    this.refreshStatus();
  }

  ngOnInit(): void {
    for (let i = 0; i < 100; i++) {
      this.listOfAllData.push({
        id: i,
        name: `Edward King ${i}`,
        age: 32,
        address: `London, Park Lane no. ${i}`
      });
    }
  }
}
