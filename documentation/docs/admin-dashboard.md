---
id: spec-admin-dashboard
title: Specification- Dashboard Admin
---

# Admin - Dashboard Specification

This page contains details on design of page Dashboard

### I. Features

#### 1. Table Content

##### 1.1 Column `group`

A single value of row in this column will contains `nz-tag` which have `group` value gotten from server. The Example of this will be

```html
<td>
    <ng-container *ngIf="!editCache[data.id]?.edit; else group">
        <ng-container *ngFor="let groupItem of data.group | keyvalue">
        <nz-tag nzMode="closeable" (nzOnClose)="onCloseGroupTag($event)">{{ groupItem.value }}</nz-tag>  
        </ng-container>
    </ng-container>
</td>
```

- When a user click on a tag, that means closing/ removing the user from the group control.
- The last tag will be `add more` that is changed to `input` to let user add more tag inside.
- When user click on `x` button, it means that user wants to remove the related tag from a user. 

```
    State 1: User clicks on close tag button.
    State 2: tag button will be in disabled mode.
    State 3: API will call to server to peform an update to database.
    State 4: If success, remove the button and update datastore
    State 5: If failed, trigger message and do not do anything.
```

