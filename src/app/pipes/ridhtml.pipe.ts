import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ridhtml'
})
export class RidhtmlPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (!value) return value;
    return value.replace(/(&nbsp;|<([^>]+)>)/ig, '');
  }

}
