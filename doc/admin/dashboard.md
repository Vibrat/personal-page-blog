# Admin - Dashboard Specification

This page contains details on design of page Dashboard

### Features

#### Table Content

* Column `group`

A single value of row in this column will contains `nz-tag` which have `group` value gotten from server. The Example of this will be

```html
<td>
    <ng-container *ngIf="!editCache[data.id]?.edit; else group">
        <ng-container *ngFor="let groupItem of data.group | keyvalue">
        <nz-tag nzMode="closeable" (nzOnClose)="onCloseGroupTag($event)">{{ groupItem.value }}</nz-tag>  
        </ng-container>
    </ng-container>
    <ng-template #group>
        <input
        type="text"
        nz-input
        [(ngModel)]="editCache[data.id].data.group"
        (input)="listGroupAccountSync($event.target.value)"
        [nzAutocomplete]="auto"
        />
        <nz-autocomplete nzBackfill #auto>
        <nz-auto-option *ngFor="let option of optionsFilter" [nzValue]="option">
            {{ option }}
        </nz-auto-option>
        <a (click)="saveEdit(data.id)">More</a>
        </nz-autocomplete>
    </ng-template>
</td>
```

- When a user click on a tag, that means closing/ removing the user from the group control.
- The last tag will be `add more` that is changed to `input` to let user add more tag inside.