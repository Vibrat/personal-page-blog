import { Component, OnInit, HostListener } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

import { Observable, of } from "rxjs";
import { take, concatMap, map, flatMap } from "rxjs/operators";
import {
  AccountService,
  NewAccount,
  NewAccountResponse
} from "../../services/account.service";
import {
  GroupService,
  AddUserToGroupResponse
} from "../../services/group.service";
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
  options = []; // options expose to html
  optionsStore = []; // Store data for options
  tags = {}; // Groups' Tags
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

  /**
   * Delete An Account
   *
   * @param number id
   */
  deleteAccount(id: string) {
    this.deleteAccountAdapter.emit({
      observer: this._account
        .deleteAccount(this.editCache[id].data.username)
        .pipe(take(1)),
      callback: () => {
        const index = this.listOfData.findIndex(item => item.id === id);
        delete this.editCache[id];

        // Filter data displayed to DOM
        this.listOfDisplayData = this.listOfDisplayData.filter(
          (item, id) => id != index
        );

        this._msgService
          .loadding("Deleting")
          .pipe(concatMap(_ => this._msgService.success("Successful")))
          .subscribe();
      },
      error: (ErrorMsg: string) => {
        this._msgService.error("Failed to delete account");
      }
    });
  }

  addLocalAccounts(data: NewAccountResponse["data"]) {
    this.listOfData = [...this.listOfData, data];
    this.listOfDisplayData = [...this.listOfData];
    this.updateEditCache();
  }

  /* @Output from sub-component */
  onCloseGroupTagWhenClick(success: boolean, id: string | number) {
    this.tags[id] = !success;
  }

  /* @Output from sub-component */
  onGroupConfirmation(state: {
    success: boolean;
    data: any;
    callback?: Function
  }) {
    if (state.success) {
      // Create listener - Observable to input value
    let addGroupChains$ = of(state.data.group).pipe(
      take(1),
      map(name => {
        
        // Pre-check if group is already added
        let groups = Object.values(this.editCache[state.data.id].data.group);
        if (groups.indexOf(name) != -1) {
          throw new Error("group already exist in this user");
        }

        return { id: state.data.id, groupname: name };
      }),
      flatMap(({ id, groupname }) => {
        
        // Call API to update data in server
        return this._group.updateGroupByName({
          userId: this.editCache[id].data.id,
          groupname: groupname
        });
      })
    );

    // Emit to API Adapter
    this.saveEditAccountAdapter.emit({
      observer: addGroupChains$,
      callback: (response: AddUserToGroupResponse) => {
        
        let index = this.listOfData.findIndex(
          item => item.id === response.data.userId
        );

        this.editCache[state.data.id].onGroupTyping = false;
        this.editCache[state.data.id].data.group[response.data.groupId] =
          response.data.groupname;

        Object.assign(
          this.listOfData[index],
          this.editCache[response.data.userId].data
        );

        // Show message
        this._msgService.success("Done");
        state.callback();
      },
      error: (errorMsg: string) => {
        
        this.editCache[state.data.id].onGroupTyping = false;
        this._msgService.error(errorMsg);
        state.callback();
      }
    });
    }

  }

   /**
   * @Output from sub-components
   * Call API Server to get values
   * when user's typing
   *
   * @param string value - text to be searched
   */
  onGroupTyping(inputState: { success: boolean; value: any }) {
    if (inputState.success) {
      // Emit value to Adapter to API Server
      this.searchAdapter.emit({
        observer: this._group.listGroups({
          group: inputState.value,
          limit: 10,
          offset: 0
        }),
        callback: (response?: any) => {
          this.optionsStore = Object.assign(
            this.optionsStore,
            ...response["data"].map(group => {
              let item = {};
              item[group["id"]] = group["name"];
              return item;
            })
          );

          this.options = Object.values(this.optionsStore).filter(item =>
            item.startsWith(inputState.value)
          );
        },
        error: (errorMsg: string) => {
          this._msgService.error("Failed to query search API");
        }
      });
    }
  }
  
  // Internal Usage only
  private updateEditCache(): void {
    this.listOfData.forEach(item => {
      // Re-render Group
      if (item["group"] == null) {
        item["group"] = {};
      }

      // Setting cache
      this.editCache[item.id] = {
        edit: false,
        onGroupTyping: false,
        data: { ...item }
      };
    });
  }

  // Reset Search
  reset(): void {
    this.searchValue = "";
    this.search();
  }

  // Search Value based on current state
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

      this.optionsStore = Object.assign(
        {},
        ...this.listOfData.map(account => account.group)
      );
      this.options = Object.values(this.optionsStore);
      this.updateEditCache();
    }
  }

  // Get Router State
  async getDataState() {
    return await this._router.data.pipe(take(1)).toPromise();
  }
}
