import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {

  transform(value: any[], args: any[]): any[] {
    const sortProp = args[0];
    const sortDirection = args[1];
    let multiplier = 1;
    if(sortDirection === 'desc'){
       multiplier = -1;
    }
    return value.sort((a:any,b:any)=>{
      if(a[sortProp] > b[sortProp]){
        return 1 * multiplier;
      }else if(a[sortProp] < b[sortProp]){
        return -1 * multiplier;
      }else{
        return 0;
      }
    })
  }

}
