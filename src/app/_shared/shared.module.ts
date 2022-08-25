import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatRadioModule } from '@angular/material/radio';

import { QaBreadcrumbsModule } from './components';
import { MatTableModule } from '@angular/material/table';
import { MomentModule } from 'ngx-moment';
import { QaPipesModule } from './pipes/pipes.module';

@NgModule({
  exports: [
    FormsModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatIconModule,
    MatListModule,
    MatSelectModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatToolbarModule,
    MatGridListModule,
    MatCardModule,
    MatRadioModule,
    MatTableModule,
    MomentModule,

    QaBreadcrumbsModule,
    QaPipesModule
  ]
})
export class SharedModule { }
