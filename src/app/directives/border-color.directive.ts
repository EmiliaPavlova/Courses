import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[appBorderColor]'
})
export class BorderColorDirective {
  @Input() date: string;

  constructor(private el: ElementRef) { }

  private borderColor(color: string) {
    this.el.nativeElement.style.borderColor = color;
  }

  ngAfterViewInit(): void {
    const startDate = new Date(this.date).getTime();
    const currentDate = new Date().getTime();
    const twoWeeks = 14 * 24 * 60 * 60 * 1000;
    const green = '#1FB25A';
    const blue = '#0078AD';
    let color = '#767676';

    if (startDate < currentDate && startDate >= (currentDate - twoWeeks)) {
      color = green;
    } else if (startDate > currentDate) {
      color = blue;
    }

    this.borderColor(color);
  }

}
