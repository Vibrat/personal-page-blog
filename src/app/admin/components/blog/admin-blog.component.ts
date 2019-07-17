import { Component, OnInit } from '@angular/core';
import { Observable } from "rxjs";
import { HttpClient } from '@angular/common/http';
import { NzMessageService } from 'ng-zorro-antd';

import { ViewportService } from "../../../shared/services/viewport.service";

const count = 5;
const fakeDataUrl = 'https://randomuser.me/api/?results=5&inc=name,gender,email,nat&noinfo';

@Component({
    selector: `admin-blog`,
    templateUrl: 'admin-blog.component.html',
    styleUrls: ['admin-blog.component.scss']
})
export class AdminBlogComponent implements OnInit {
  search: string;
  lgScreen$: Observable<boolean> = this.viewport.onLgScreenObserver();
  modalDisplay: boolean;
  initLoading = true; // bug
  loadingMore = false;
  data: any[] = [];
  list: Array<{ loading: boolean; name: any }> = [];
  style = {
    action: {
      xs: {
        span: 16,
        offset: 0
      },
      lg: {
        span: 8,
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
  }

  constructor(private http: HttpClient, private msg: NzMessageService, public viewport: ViewportService) {}

  ngOnInit(): void {
    this.getData((res: any) => {
      this.data = res.results;
      this.list = res.results;
      this.initLoading = false;
    });
  }

  getData(callback: (res: any) => void): void {
    this.http.get(fakeDataUrl).subscribe((res: any) => callback(res));
  }

  onLoadMore(): void {
    this.loadingMore = true;
    this.list = this.data.concat([...Array(count)].fill({}).map(() => ({ loading: true, name: {} })));
    this.http.get(fakeDataUrl).subscribe((res: any) => {
      this.data = this.data.concat(res.results);
      this.list = [...this.data];
      this.loadingMore = false;
    });
  }

  edit(item: any): void {
    this.msg.success(item.email);
  }
}