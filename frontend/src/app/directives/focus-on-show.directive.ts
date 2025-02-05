import {Directive, ElementRef, HostListener, OnInit} from '@angular/core';

@Directive({selector: '[focusOnShow]'})
export class FocusOnShowDirective implements OnInit {
  constructor(private el: ElementRef) {
    if (!el.nativeElement['focus']) {
      throw new Error('Element does not accept focus.');
    }
  }

  @HostListener('keyup.enter', ['$event'])
  onEnter(event: KeyboardEvent) {
    this.el.nativeElement.blur();  // Снимаем фокус с элемента
  }

  @HostListener('touchend', ['$event'])
  onTouchEnd(event: TouchEvent) {
    this.el.nativeElement.blur();  // Снимаем фокус с элемента
  }

  ngOnInit(): void {
    const input: HTMLInputElement = this.el.nativeElement as HTMLInputElement;
    input.focus();
    input.select();
  }
}
