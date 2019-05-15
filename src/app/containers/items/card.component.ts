import { Component, Input } from "@angular/core";

@Component({
    selector: 'item-card',
    template: `
    <nz-card [nzCover]="coverTemplate">
        <nz-card-meta
        nzTitle="{{card?.title}}"
        nzDescription="{{card?.description}}"
        ></nz-card-meta>
    </nz-card>
    <ng-template #coverTemplate>
        <img alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" />
    </ng-template>`,
})
export class CardComponent {
    @Input() public card: any;
}