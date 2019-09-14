import { Component } from "@angular/core";

@Component({
    selector: 'dashboard-group',
    templateUrl: 'group.component.html',
    styleUrls: ['group.component.scss']
})
export class GroupComponent {   

    data = [];


    deleteGroup(id) {
        console.log('a group is deleted');
    }

    newGroup(event) {
        console.log('on creating new group');
    }
    
}