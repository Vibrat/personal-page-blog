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
        <img alt="example" src="assets/image/blog.png" />
    </ng-template>`,
})
export class CardComponent {
    @Input() public card: any;
}   