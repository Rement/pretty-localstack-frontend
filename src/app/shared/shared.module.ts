import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { MdbCollapseModule } from 'mdb-angular-ui-kit/collapse';
import { MdbDropdownModule } from 'mdb-angular-ui-kit/dropdown';
import { SideNavComponent } from './components/side-nav/side-nav.component';

@NgModule({
  declarations: [
    HeaderComponent,
    SideNavComponent
  ],
  exports: [
    HeaderComponent,
    SideNavComponent
  ],
  imports: [
    CommonModule,
    MdbCollapseModule,
    MdbDropdownModule,
  ],
  providers: []
})
export class SharedModule {}
