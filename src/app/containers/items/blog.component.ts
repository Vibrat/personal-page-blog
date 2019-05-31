import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import * as marked from 'marked';

@Component({
    selector: `item-blog`,
    templateUrl: 'blog.component.html',
    styleUrls: ['blog.component.scss']
})
export class BlogComponent implements OnInit {
    content: string;
    constructor(private router: ActivatedRoute) {}

    ngOnInit() {
        this.router.paramMap.subscribe(params => console.log(params.get('id')));
        this.content = marked('## Hotline \n\n  *ides* recommended steps to update your application to the most current version. The CLI Builder API includes progress and status reporting tools, which can provide hints for certain functions and interfaces. To report progress, use the BuilderContext.reportProgress() method, which takes a current value, (optional) total, and status string as arguments. The total can be any number; for example, if you know how many files you have to process, the total could be the number of files, and current should be the number processed so far. The status string is unmodified unless you pass in a new string value. You can see an example of how the tslint builder reports progress.In our example, the shell command either finishes or is still executing, so there’s no need for a progress report, but we can report status so that a parent builder that called our builder would know what’s going on. Use the BuilderContext.reportStatus() method to generate a status string of any length. (Note that there’s no guarantee that a long string will be shown entirely; it could be cut to fit the UI that displays it.) Pass an empty string to remove the status.');
    }
}