import { Component, Input, Output, EventEmitter } from "@angular/core";

@Component({
    selector: 'search-comp',
    templateUrl: 'search.component.html',
    styleUrls: ['search.component.scss']
})
export class SearchComponent {
    
    searchValue: string;
    
    @Input('default') defaultValue = ''; // default value    
    @Output('onCommit') data: EventEmitter<string> = new EventEmitter();

    search() { this.data.emit(this.searchValue); }
    reset() { 

        this.searchValue = this.defaultValue; 
        this.data.emit(this.defaultValue);
    }
}