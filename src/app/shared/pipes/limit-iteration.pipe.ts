import { Pipe, PipeTransform } from "@angular/core";

/**
 * Limit numbers of items in array to show in DOM
 * 
 * @param number exponent - number of limits
 */
@Pipe({
    name: 'limit'
})
export class LimitIterationPipe implements PipeTransform {
    /**
     * 
     * @param value 
     * @param exponent 
     */
    transform(value: any[], exponent?: number) {
        return (exponent) ? value.slice(0, exponent) : value;
    }
}