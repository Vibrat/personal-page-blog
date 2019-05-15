import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

@Component({
    selector: `item-blog`,
    templateUrl: 'blog.component.html',
    styleUrls: ['blog.component.scss']
})
export class BlogComponent implements OnInit {

    constructor(private router: ActivatedRoute) {}

    ngOnInit() {
        this.router.paramMap.subscribe(params => console.log(params.get('id')))
    }
}