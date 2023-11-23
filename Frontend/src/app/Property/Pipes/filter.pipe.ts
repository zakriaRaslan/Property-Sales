import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any[], FilterString:string , FilterProp:string): any[] {

    let result = []
    if(value.length === 0 || FilterString === '' || FilterProp ===''){
      return value;
    }
    for(const item of value){
      if(item[FilterProp]=== FilterString){
        result.push(item);
      }
    }
    return result;
  }

}
