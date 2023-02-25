import { NgModule } from '@angular/core';
import {} from '@angular/material';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  imports: [MatToolbarModule, MatToolbarModule],
  exports: [MatToolbarModule, MatToolbarModule],
  // providers: [MdIconRegistry],
})
export class MaterialModule {}
