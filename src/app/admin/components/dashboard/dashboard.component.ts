import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

import { take, filter } from "rxjs/operators";
import {
  AccountService,
  NewAccount,
  NewAccountResponse,
  AccountsResponse
} from "../../services/account.service";

export interface Data {
  id: number;
  name: string;
  age: number;
  address: string;
  disabled: boolean;
}

@Component({
  selector: "admin-dashboard",
  templateUrl: `dashboard.component.html`,
  styleUrls: ["dashboard.component.scss"]
})
export class DashboardComponent implements OnInit {
  newAccountDisplay: boolean;
  searchValue = "";
  sortName: string | null = null;
  sortValue: string | null = null;
  listOfSearchAddress: string[] = [];
  editCache: { [key: string]: any } = {}; // cache data
  listOfData: any[] = []; // Payload represents data in server
  listOfDisplayData = [...this.listOfData]; // data being displayed

  constructor(
    private _router: ActivatedRoute,
    private _account: AccountService
  ) {}

  startEdit(id: string): void {
    this.editCache[id].edit = true;
  }

  newAccount(data: NewAccount) {
    this._account.newAccount(data).subscribe(() => {
      this.newAccountDisplay = false;
    });
  }

  deleteAccount(id: string) {
    this._account
      .deleteAccount(this.editCache[id].data.username)
      .pipe(
        filter((response: AccountsResponse) => response["success"]),
        take(1)
      )
      .subscribe(_ => {
        const index = this.listOfData.findIndex(item => item.id === id);
        delete this.editCache[id];
        this.listOfDisplayData = this.listOfDisplayData.filter(
          (item, id) => id != index
        );
      });
  }

  cancelEdit(id: string): void {
    const index = this.listOfData.findIndex(item => item.id === id);
    this.editCache[id] = {
      data: { ...this.listOfData[index] },
      edit: false
    };
  }

  saveEdit(id: string): void {
    const index = this.listOfData.findIndex(item => item.id === id);
    Object.assign(this.listOfData[index], this.editCache[id].data);
    this.editCache[id].edit = false;
  }

  updateEditCache(): void {
    this.listOfData.forEach(item => {
      this.editCache[item.id] = {
        edit: false,
        data: { ...item }
      };
    });
  }

  reset(): void {
    this.searchValue = "";
    this.search();
  }

  search(): void {
    const filterFunc = (item: {
      name: string;
      age: number;
      address: string;
    }) => {
      return (
        (this.listOfSearchAddress.length
          ? this.listOfSearchAddress.some(
              address => item.address.indexOf(address) !== -1
            )
          : true) && item.name.indexOf(this.searchValue) !== -1
      );
    };
    const data = this.listOfData.filter(
      (item: { name: string; age: number; address: string }) => filterFunc(item)
    );
    this.listOfDisplayData = data.sort((a, b) =>
      this.sortValue === "ascend"
        ? a[this.sortName!] > b[this.sortName!]
          ? 1
          : -1
        : b[this.sortName!] > a[this.sortName!]
        ? 1
        : -1
    );
  }

  addAccount() {}

  async ngOnInit() {
    const response = await this.getDataState().then();
    if (response.dashboard.success) {
      this.listOfData = response.dashboard.data;
      this.listOfDisplayData = [...this.listOfData];
      this.updateEditCache();
    }
  }

  async getDataState() {
    return await this._router.data.pipe(take(1)).toPromise();
  }
}
