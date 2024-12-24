import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'addDollar',
  standalone: true
})
export class AddDollarPipe implements PipeTransform {

  transform(value: number | null | undefined): string {
    if (value == null) {
      return '$0.00'; // Default value if the price is null or undefined
    }
    return `$${value.toFixed(2)}`; // Add $ sign and ensure two decimal places
  }

}
