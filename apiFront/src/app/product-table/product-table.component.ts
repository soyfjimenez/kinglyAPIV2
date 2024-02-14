// product-table.component.ts
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { getProducts, deleteProduct } from '../shared/product.service';



@Component({
  selector: 'app-product-table',
  templateUrl: './product-table.component.html',
  styleUrls: ['./product-table.component.scss']
})
export class ProductTableComponent implements OnInit {
  @Output() updateFields = new EventEmitter<void>();
  visible: boolean = false; 
  currentSelection: any;
  showDialog() {
    this.visible = true;
}
  products: any;
  selectedProduct: any; // Variable para almacenar el producto seleccionado para editar
  displayEditDialog: boolean = false; // Variable para controlar la visibilidad del diálogo de edición
  
  async getProductsData(selection :any){
    this.products = await getProducts(selection)
    this.currentSelection = selection;
  }
 async ngOnInit() {
        let data = await getProducts("socks")
        this.products = data;
  }

  // product-table.component.ts
 displayPrices(prices: string): string {
  if (!prices) {
    return 'No prices available';
  }

  const pricesObj = JSON.parse(prices);
  const priceKeys = Object.keys(pricesObj);

  if (priceKeys.length === 0) {
    return 'No prices available';
  }

  const minPrice = pricesObj[priceKeys[0]];
  const maxPrice = pricesObj[priceKeys[priceKeys.length - 1]];

  return `From ${minPrice} to ${maxPrice}`;
}



async closeDialog() {
  this.visible = false;
  this.products = await getProducts(this.currentSelection)
}
  editProduct(product: any): void {
    // Al hacer clic en editar, asigna el producto seleccionado y muestra el diálogo
    this.selectedProduct = { ...product };
    this.visible = true;
  }

  async deleteProduct(product: any) {
    console.log(product)
    await deleteProduct(product)
    this.products = await getProducts(this.currentSelection)
  }
}
