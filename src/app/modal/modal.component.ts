import { Component, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModalComponent {

  public visible = false;
  private visibleAnimate = false;

  constructor(private ref: ChangeDetectorRef) { }

  public show(): void {
    this.visible = true;
    setTimeout(() => {
      this.visibleAnimate = true;
      this.ref.detectChanges();
    }, 100);


  }

  public hide(): void {
    this.visibleAnimate = false;
    setTimeout(() => {
      this.visible = false;
      this.ref.detectChanges();
    }, 100);
  }

  /*public onContainerClicked(event: MouseEvent): void {
    if ((<HTMLElement>event.target).classList.contains('modal')) {
      this.hide();
    }
  }*/

}
