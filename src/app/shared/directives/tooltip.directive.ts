import { TooltipComponent } from './../components/tooltip/tooltip.component';
import { Directive, ElementRef, HostListener, ViewContainerRef, TemplateRef, OnInit, Input } from '@angular/core';
import { NgComponentOutlet } from '@angular/common';

@Directive({
  selector: '[appTooltip]'
})
export class TooltipDirective implements OnInit {
  @Input() text: string;
  constructor(private elementRef: ElementRef,
              private r: ViewContainerRef) { }

  ngOnInit() {
    // this.r.createEmbeddedView(this.templateRef);
  }

  // Definise obradjivanje eventova na elementu na koga je direktiva nakacena
  // >> @HostListener('mouseenter) mouseOver(eventData: Event) {}

  // Bindovanje propertija hosta sa posebnim vrednostima kroz direktivu
  // Sa inputom je moguce uvezati spoljasnje parametre kroz direktivu sa host propertijima
  // >> @HostBinding('style.backgroundColor) b = 'red';

  @HostListener('mouseenter') mouseOver() {
    console.log('Kreiranje novog vjuva');
    // this.r.createEmbeddedView(this.templateRef);
  }

}
