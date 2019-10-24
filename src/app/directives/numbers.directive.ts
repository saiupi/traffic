import { Directive, ElementRef, HostListener,Input } from '@angular/core';

@Directive({
  selector: '[PhoneNumber]'
})
export class NumbersDirective {

  constructor(private _el: ElementRef) { }
  @HostListener('input', ['$event']) onInputChange(event) {
    const initalValue = this._el.nativeElement.value;
    //  alert('direactive' + initalValue);
    this._el.nativeElement.value = initalValue.replace(/[^0-9]*/g, '');
    if (initalValue !== this._el.nativeElement.value) {
      event.stopPropagation();
    }
  }

}
