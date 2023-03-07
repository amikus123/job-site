import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  transform(items: any[], term: string): any {
    console.log(items);
    return items.filter((item) => item.uid === term)[0];
  }
}
