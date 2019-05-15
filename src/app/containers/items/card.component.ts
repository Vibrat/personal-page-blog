import { Component } from "@angular/core";

@Component({
    selector: 'item-card',
    template: `
    <nz-card [nzCover]="coverTemplate">
        <nz-card-meta
        nzTitle="Card title"
        nzDescription="This is the description"
        [nzAvatar]="avatarTemplate"
        ></nz-card-meta>
    </nz-card>
    <ng-template #avatarTemplate>
        <nz-avatar nzSrc="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"></nz-avatar>
    </ng-template>
    <ng-template #coverTemplate>
        <img alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" />
    </ng-template>`,
})
export class CardComponent {}