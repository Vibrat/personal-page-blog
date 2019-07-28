import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

import { Observable, from } from "rxjs";
import { take, concatMap, filter, map, tap, flatMap } from "rxjs/operators";
import {
  AccountService,
  NewAccount,
  NewAccountResponse,
} from "../../services/account.service";
import { GroupService, AddUserToGroupResponse } from "../../services/group.service";
import { MessageService } from "~/app/shared/services/message.service";
import { DashboardApiAdapter } from "./dashboard.api.adapter";

export interface Data {
  id: number;
  group: string;
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
  listAccountGroup$: Observable<any>;
  options = []; // Store data from API
  optionsFilter = []; // Return array to display of options
  searchAdapter: DashboardApiAdapter;
  newAccountAdapter: DashboardApiAdapter;
  deleteAccountAdapter: DashboardApiAdapter;
  saveEditAccountAdapter: DashboardApiAdapter;

  constructor(
    private _router: ActivatedRoute,
    private _account: AccountService,
    private _group: GroupService,
    private _msgService: MessageService
  ) {
    this.searchAdapter = new DashboardApiAdapter();
    this.searchAdapter.build("Search").subscribe();
    this.newAccountAdapter = new DashboardApiAdapter();
    this.newAccountAdapter.build("NewAccount").subscribe();
    this.deleteAccountAdapter = new DashboardApiAdapter();
    this.deleteAccountAdapter.build("DeleteAccount").subscribe();
    this.saveEditAccountAdapter = new DashboardApiAdapter();
    this.saveEditAccountAdapter.build("UpdateAccount").subscribe();
  }

  newAccount(data: NewAccount) {
    this.newAccountAdapter.emit({
      observer: this._account.newAccount(data),
      callback: (val: NewAccountResponse) => {
        this.newAccountDisplay = false;
        this.addLocalAccounts(val.data);
        this._msgService
          .loadding("Creating")
          .pipe(concatMap(_ => this._msgService.success("Successful")))
          .subscribe();
      },
      error: _ => {
        this._msgService.error("Failed", 2500);
      }
    });
  }

  deleteAccount(id: string) {
    this.deleteAccountAdapter.emit({
      observer: this._account
        .deleteAccount(this.editCache[id].data.username)
        .pipe(take(1)),
      callback: () => {
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
      error: () => {
        this._msgService.error("Failed to delete account");
      }
    });
  }

  addLocalAccounts(data: NewAccountResponse["data"]) {
    this.listOfData = [...this.listOfData, data];
    this.listOfDisplayData = [...this.listOfData];
    this.updateEditCache();
  }

  startEdit(id: string): void {
    this.editCache[id].edit = true;
  }

  cancelEdit(id: string): void {
    const index = this.listOfData.findIndex(item => item.id === id);
    this.editCache[id] = {
      data: { ...this.listOfData[index] },
      edit: false
    };
  }

  /**
   * Save data when user hit `Save` 
   * 
   * @param String ids -  root, VIP2, ...
   */
  saveEdit(id: string): void {
    let index = this.optionsFilter.indexOf(this.editCache[id].data.group);
    console.log(index, this.optionsFilter);
    if (index != -1) {
      let groupList = this.editCache[id].data.group.replace(" ", "").split(",");
      console.log(groupList);
      let addGroupChains$ = from(groupList).pipe(
        map(_=> { 
          return {id: id, groupId:  this.options[index]["id"] };
        }), 
        flatMap(({id, groupId}) => {
            return this._group.updateGroup({
              userId: this.editCache[id].data.id,
              groupId: groupId
            });
        })
        );

        this.saveEditAccountAdapter.emit({
          observer: addGroupChains$,
          callback: (response: AddUserToGroupResponse) => {
            const index = this.listOfData.findIndex(item => item.id === response.data.userId);
            Object.assign(this.listOfData[index], this.editCache[response.data.userId].data);
            this.editCache[response.data.userId].edit = false;
            this._msgService.success("Done");
          },
          error: (_) => {
             // When fails
             this._msgService.error("Failed to get group information");
          } 
        });
    }
  }

  onCloseGroupTag(event) {
    console.log(event);
  }

  listGroupAccountSync(value) {
    this.searchAdapter.emit({
      observer: this._group.listGroups({
        group: value,
        limit: 10,
        offset: 0
      }),
      callback: (response?: any) => {
        console.log(response);
        this.options.push(
          ...response["data"].filter(
            group =>
              !this.options.map(group => group["name"]).includes(group["name"])
          )
        );
        this.optionsFilter = this.options
          .map(group => group["name"])
          .filter(item => item.startsWith(value));

        console.log(this.options, this.optionsFilter);
      },
      error: (_) => {
        console.log (_);
      }
    });
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
      group: string;
      age: number;
      address: string;
    }) => {
      return (
        (this.listOfSearchAddress.length
          ? this.listOfSearchAddress.some(
              address => item.address.indexOf(address) !== -1
            )
          : true) && item.group.indexOf(this.searchValue) !== -1
      );
    };
    const data = this.listOfData.filter(
      (item: { group: string; age: number; address: string }) =>
        filterFunc(item)
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

      this.options = this.listOfData.map(account => account.group);
      this.optionsFilter = [...this.options ];
      this.updateEditCache();
    }
  }

  async getDataState() {
    return await this._router.data.pipe(take(1)).toPromise();
  }
}
