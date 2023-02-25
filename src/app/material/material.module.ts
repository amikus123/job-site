import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { NgModule } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [],
  imports: [MatToolbarModule, MatCardModule, MatSlideToggleModule],
  exports: [MatToolbarModule, MatCardModule, MatSlideToggleModule],
})
export class MaterialModule {}
