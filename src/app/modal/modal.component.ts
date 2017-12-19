import { Component, Input, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModalComponent {
  @Input() visible: boolean;

  public visibleAnimate = false;

  constructor(private ref: ChangeDetectorRef) { }

  /*public onContainerClicked(event: MouseEvent): void {
    if ((<HTMLElement>event.target).classList.contains('modal')) {
      this.hide();
    }
  }*/

}
