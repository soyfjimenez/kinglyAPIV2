import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router'; // Importa RouterModule
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductTableComponent } from './product-table/product-table.component';
import { EditProductDialogComponent } from './edit-product-dialog/edit-product-dialog.component';
import { SharedModule } from './shared/shared.module';
import { TestComponentComponent } from './test-component/test-component.component';
import { HeaderComponent } from './header/header.component';
import { ProductFilterComponent } from './product-filter/product-filter.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { GenerateReportComponent } from './generate-report/generate-report.component';
import { AdvancedSearchComponent } from './product-filter/advanced-search/advanced-search.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductTableComponent,
    EditProductDialogComponent,
    TestComponentComponent,
    HeaderComponent,
    ProductFilterComponent,
    SidebarComponent,
    GenerateReportComponent,
    AdvancedSearchComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot([ // Configura las rutas principales de tu aplicación
      // { path: '', redirectTo: '/report', pathMatch: 'full' }, // Ruta por defecto
      { path: 'products', component: ProductTableComponent }, // Ejemplo de ruta
      { path: 'report', component: GenerateReportComponent }
    ]),
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
