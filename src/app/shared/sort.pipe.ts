import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: "sort"
})
export class SortPipe implements PipeTransform {
  transform(array:Array<any>, args?) {

    if(array) {

      let orderByValue = args
      let byVal = 1

      if(orderByValue.charAt(0) == "!") {

        byVal = -1
        orderByValue = orderByValue.substring(1)
      }

      array.sort((a: any, b: any) => {
        if(a[orderByValue] < b[orderByValue]) {
          return -1*byVal;
        } else if (a[orderByValue] > b[orderByValue]) {
          return 1*byVal;
        } else {
          return 0;
        }
      });
      return array;
    }
  }
}