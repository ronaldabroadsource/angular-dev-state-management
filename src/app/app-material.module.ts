import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
let modules = [ CommonModule,
  MatTableModule,
  MatPaginatorModule,
  MatSortModule,
  MatButtonToggleModule];
@NgModule({
  declarations: [],
  imports: [
   ...modules
  ],exports:[...modules]
})
export class AppMaterialModule { }
