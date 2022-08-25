import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { QaBreadcrumbsComponent } from './breadcrumbs.component';

@NgModule({
  declarations: [
    QaBreadcrumbsComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    QaBreadcrumbsComponent
  ]
})
export class QaBreadcrumbsModule {
}
