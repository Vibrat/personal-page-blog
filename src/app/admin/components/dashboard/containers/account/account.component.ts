import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Observable, of } from "rxjs";
import { take, concatMap, map, flatMap } from "rxjs/operators";
import {
  NewAccount,
  NewAccountResponse
} from "../../../../services/account.service";
import { AddUserToGroupResponse } from "../../../../services/group.service";
import { MessageService } from "~/app/shared/services/message.service";
import { ApiAdapter, AdapterResponse } from "~/app/_core/api/api.adapter";
import { OnClostTagState } from "../../components/group-tag/group-tag.component";
import { AppConfig } from "~/app/_init/app-config.service";
import { AccountModel } from "../../models/account.model";
import { GroupTagModel } from "../../models/group-tag.model";

export interface Data {
  id: number;
  group: string;
  age: number;
  address: string;
  disabled: boolean;
}

@Component({
  selector: "dashboard-account",
  templateUrl: `account.component.html`,
  styleUrls: ["account.component.scss"]
})
export class AccountComponent implements OnInit {
  displayAdminPasswordInput = []; // display password input object

  sortName: string | null = null;
  sortValue: string | null = null;
  listOfSearchAddress: string[] = [];
  editCache: { [key: string]: any } = {}; // cache data
  listOfData: any[] = []; // Payload represents data in server
  listOfDisplayData = [...this.listOfData]; // data being displayed
  listAccountGroup$: Observable<any>;
  options = []; // options expose to html
  optionsStore = []; // Store data for options

  searchObject = {
    name: "",
    group: ""
  };

  searchAdapter: ApiAdapter;
  newAccountAdapter: ApiAdapter;
  deleteAccountAdapter: ApiAdapter;
  saveEditAccountAdapter: ApiAdapter;
  removeGroupTagFromUser: ApiAdapter;
  changePasswordAdapter: ApiAdapter;

  constructor(
    private _router: ActivatedRoute,
    private _account: AccountModel,
    private _group: GroupTagModel,
    private _msgService: MessageService
  ) {
    // Build Streaming events
    this.searchAdapter = new ApiAdapter();
    this.newAccountAdapter = new ApiAdapter();
    this.deleteAccountAdapter = new ApiAdapter();
    this.saveEditAccountAdapter = new ApiAdapter();
    this.removeGroupTagFromUser = new ApiAdapter();
    this.changePasswordAdapter = new ApiAdapter();
  }

  newAccount(data: NewAccount) {
    this.newAccountAdapter.emit({
      observer: this._account.createAccount(data),
      callback: (val: NewAccountResponse) => {
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
          .pipe(concatMap(_ => this._msgService.success("Done")))
          .subscribe();
      },
      error: (ErrorMsg: string) => {
        this._msgService.error("Action has no effect");
      }
    });
  }

  changePassword(event, dataId) {
    this.changePasswordAdapter.emit({
      observer: this._account.changePasswordByAdmin(event),
      callback: response => {
        if (response.success) {
          this._msgService.success("Done");
          this.displayAdminPasswordInput[dataId] = false;
        } else {
          this._msgService.error("Cannot change password account");
          this.displayAdminPasswordInput[dataId] = false;
        }
      },
      error: (errorMsg: string) => {
        console.error(errorMsg);
      }
    });
  }

  addLocalAccounts(data: NewAccountResponse["data"]) {
    this.listOfData = [...this.listOfData, data];
    this.listOfDisplayData = [...this.listOfData];
    this.updateEditCache();
  }

  resetLocalAccounts(data: NewAccountResponse["data"][]) {
    this.listOfData = data;
    this.listOfDisplayData = [...this.listOfData];
    this.updateEditCache();
  }

  onCloseGroupTag(state: OnClostTagState) {
    // Vaidate @Output
    if (!state.success) {
      this._msgService.warn("Action has not effect");
      return;
    }

    // Create list concurrent apis
    const deleteGroup$ = this._group.removeGroupFromUser({
      userId: state.data.id,
      groupname: state.data.groupname
    });

    // Emit to Event Submitter
    this.removeGroupTagFromUser.emit({
      observer: deleteGroup$,
      callback: stateData => {
        // Case: success
        if (stateData.success) {
          this._msgService.success("Done");
          return;
        }
        // Case: Error
        let message: string;
        if ((<AdapterResponse>stateData).hasOwnProperty("message")) {
          message = (<AdapterResponse>stateData).message;
        } else {
          message = "Action has not effect";
        }

        this._msgService.warn(message);
      },
      error: _ => {
        // Case failed which includes HTTP does not response
        this._msgService.error("Action has no effect");
      }
    });
  }

  /* @Output from sub-component */
  onGroupConfirmation(state: {
    success: boolean;
    data: any;
    callback?: Function;
  }) {
    if (state.success) {
      // Create listener - Observable to input value
      let addGroupChains$ = of(state.data.group).pipe(
        take(1),
        map(name => {
          // Pre-check if group is already added
          let groups = Object.values(this.editCache[state.data.id].data.group);
          if (groups.indexOf(name) != -1) {
            throw new Error("Group exists");
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
        error: (_: string) => {
          this._msgService.error("No effect on search");
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

  onSearchUsername(value) {
    this.searchObject.name = value;
    this.callSearchApi();
  }

  onSearchGroup(value) {
    this.searchObject.group = value;
    this.callSearchApi();
  }

  callSearchApi() {
    this.searchAdapter.emit({
      observer: this._account.listAccounts({
        offset: 0,
        limit: 100,
        ...this.searchObject
      }),
      callback: response => {
        let accounts = response["data"];
        this.resetLocalAccounts(accounts);
      },
      error: errMsg => {
        console.error(errMsg);
      }
    });
  }

  async ngOnInit() {
    // Start Listening to all Listeners
    this.searchAdapter
      .build("Search", false, { userDelayDetection: AppConfig.get('userDelayDetection') })
      .subscribe();
    this.newAccountAdapter.build("NewAccount").subscribe();
    this.deleteAccountAdapter.build("DeleteAccount").subscribe();
    this.saveEditAccountAdapter.build("UpdateAccount").subscribe();
    this.removeGroupTagFromUser
      .build("removeGroupTag", false, {
        userDelayDetection: AppConfig.get('userDelayDetection')
      })
      .subscribe();
    this.changePasswordAdapter.build("changePassword").subscribe();

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
