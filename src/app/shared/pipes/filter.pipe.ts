import { Pipe, PipeTransform } from "@angular/core";

export type ExponentFunc = (item: any) => boolean;

@Pipe({
    name: 'filter',
})
export class FilterPipe implements PipeTransform {

    transform(value: any[], exponent?: ExponentFunc) {
        return value.filter(exponent);
    }
}