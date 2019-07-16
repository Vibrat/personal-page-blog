import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

import { take, filter, tap, concatMap, map, retry } from "rxjs/operators";
import {
  AccountService,
  NewAccount,
  NewAccountResponse,
  AccountDeleteResponse
} from "../../services/account.service";

import { MessageService } from "~/app/shared/message.service";

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
    private _account: AccountService,
    private _msgService: MessageService
  ) {}

  startEdit(id: string): void {
    this.editCache[id].edit = true;
  }

  newAccount(data: NewAccount) {
    this._account
      .newAccount(data)
      .pipe(
        map((response: NewAccountResponse) => {
          if (response.success) {
            return <NewAccountResponse["data"]>response.data;
          }

          throw new Error(`${response["code"]} : ${response["message"]}`);
        }),
        retry(1)
      )
      .subscribe(
        (val: NewAccountResponse["data"]) => {
          this.newAccountDisplay = false;
          this.addLocalAccounts(val);
          this._msgService
            .loadding("Creating")
            .pipe(concatMap(_ => this._msgService.success("Successful")))
            .subscribe();
        },
        _ => {
          this._msgService.error("Failed", 2500);
        }
      );
  }

  deleteAccount(id: string) {
    this._account
      .deleteAccount(this.editCache[id].data.username)
      .pipe(
        tap((response: AccountDeleteResponse) => {
          if (!response["success"]) {
            throw new Error(`${response["code"]} : ${response["message"]}`);
          }
        }),
        filter((response: AccountDeleteResponse) => response["success"]),
        take(1)
      )
      .subscribe(
        _ => {
          const index = this.listOfData.findIndex(item => item.id === id);
          delete this.editCache[id];
          this.listOfDisplayData = this.listOfDisplayData.filter(
            (item, id) => id != index
          );

          this._msgService
            .loadding("Deleting")
            .pipe(concatMap(_ => this._msgService.success("Successful")))
            .subscribe();
        },
        _ => this._msgService.error("Failed to delete account")
      );
  }

  cancelEdit(id: string): void {
    const index = this.listOfData.findIndex(item => item.id === id);
    this.editCache[id] = {
      data: { ...this.listOfData[index] },
      edit: false
    };
  }

  addLocalAccounts(data: NewAccountResponse["data"]) {
    this.listOfData = [...this.listOfData, data];
    this.listOfDisplayData = [...this.listOfData];
    this.updateEditCache();
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
