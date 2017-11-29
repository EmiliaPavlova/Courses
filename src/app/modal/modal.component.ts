import { Component } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})

export class ModalComponent {

  public visible = false;
  private visibleAnimate = false;

  constructor() { }

  show() {
    this.visible = true;
    setTimeout(() => this.visibleAnimate = true, 100);
  }

  hide() {
    this.visibleAnimate = false;
    setTimeout(() => this.visible = false, 300);
  }

  /*public show(): void {
    this.visible = true;
    setTimeout(() => this.visibleAnimate = true, 100);
  }

  public hide(): void {
    this.visibleAnimate = false;
    setTimeout(() => this.visible = false, 300);
  }

  public onContainerClicked(event: MouseEvent): void {
    if ((<HTMLElement>event.target).classList.contains('modal')) {
      this.hide();
    }
  }*/

}
