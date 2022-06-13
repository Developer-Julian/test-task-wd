import { NgModule } from '@angular/core';

import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCommonModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatBadgeModule } from '@angular/material/badge';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatTooltipModule } from '@angular/material/tooltip';
import { OverlayModule } from '@angular/cdk/overlay';

const modules = [
  MatCardModule,
  MatInputModule,
  MatButtonModule,
  MatCommonModule,
  MatIconModule,
  MatCheckboxModule,
  MatSelectModule,
  MatBadgeModule,
  MatFormFieldModule,
  MatPaginatorModule,
  MatTableModule,
  MatSortModule,
  MatTooltipModule,
  OverlayModule,
];

@NgModule({
  imports: modules,
  exports: modules,
})
export class MaterialModule {}
