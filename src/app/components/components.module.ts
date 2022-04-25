import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { SuccessComponent } from './success/success.component';
import { InfoComponent } from './info/info.component';
import { CommonModule } from '@angular/common';
import { PinComponent } from './pin/pin.component';

@NgModule({
  declarations: [SuccessComponent, InfoComponent, PinComponent],
  exports: [SuccessComponent],
  imports: [CommonModule],
  entryComponents: [InfoComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})

export class ComponentsModule { }
