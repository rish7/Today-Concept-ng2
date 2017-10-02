import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ellipsize'
})
export class EllipsizePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    let ellipText = (value.length <= args)? value : value.substring(0, args)+"...";
    return ellipText;
  }

}
