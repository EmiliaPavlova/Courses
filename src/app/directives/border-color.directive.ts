import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[appBorderColor]'
})
export class BorderColorDirective {
  @Input() color: string;
  // default: #767676
  // green: #1FB25A
  // blue: #0078AD

  constructor(private el: ElementRef) {
  }

  private borderColor(color: string) {
    this.el.nativeElement.style.borderColor = color;
  }

  ngAfterViewInit(): void {
    this.borderColor(this.color);
  }

}
