import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

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
  searchValue = '';
  sortName: string | null = null;
  sortValue: string | null = null;
  listOfSearchAddress: string[] = [];
  editCache: { [key: string]: any } = {};
  listOfData: any[] = [];
  listOfDisplayData = [...this.listOfData];

  constructor(private _router: ActivatedRoute) {}

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
    this.searchValue = '';
    this.search();
  }

  search(): void {
    const filterFunc = (item: { name: string; age: number; address: string }) => {
      return (
        (this.listOfSearchAddress.length
          ? this.listOfSearchAddress.some(address => item.address.indexOf(address) !== -1)
          : true) && item.name.indexOf(this.searchValue) !== -1
      );
    };
    const data = this.listOfData.filter((item: { name: string; age: number; address: string }) => filterFunc(item));
    this.listOfDisplayData = data.sort((a, b) =>
      this.sortValue === 'ascend'
        ? a[this.sortName!] > b[this.sortName!]
          ? 1
          : -1
        : b[this.sortName!] > a[this.sortName!]
        ? 1
        : -1
    );
  }

  ngOnInit() {
    console.log ('data', this.getDataState());
    for (let i = 0; i < 100; i++) {
      this.listOfData.push({
        id: `${i}`,
        username: `Edrward ${i}`,
        email: `London Park no. ${i}`,
        group: 'Admin'
      });
    }
    this.listOfDisplayData = [...this.listOfData];
    this.updateEditCache();
  }

  async getDataState() {    
    await this._router.data.subscribe(data => {
      console.log(data);
    });
    return true;
  }
}
