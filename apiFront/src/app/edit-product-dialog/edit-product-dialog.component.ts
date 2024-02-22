import { Component, Input, OnInit, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { updateProduct } from '../shared/product.service';

@Component({
  selector: 'app-edit-product-dialog',
  templateUrl: './edit-product-dialog.component.html',
  styleUrls: ['./edit-product-dialog.component.scss'],
})
export class EditProductDialogComponent implements OnInit {
  @Input() product: any;
  @Input() visible: boolean = false;
  @Output() closeParentDialogEvent = new EventEmitter<void>();

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.product) {
      this.initializeForm()
    }
  }
  


  closeParentDialog() {
    this.closeParentDialogEvent.emit();
  }
  // Form fields
  reference: string = '';
  title: string = '';
  description: string = '';
  composition: string = '';
  weight: string = '';
  volumetricWeight: string = '';
  prices: any[] = [];
  priceFields: any[] = [];
  selectedCategory: any = {};

  // Translation fields
  translations: any[] = [];
  languages = [
    {"Name":"English","code":"en"},
    {"Name":"French","code":"fr"},
    {"Name":"Spanish","code":"es"},
    {"Name":"German","code":"de"},
    {"Name":"Italian","code":"it"}
  ];

  categoryOptions = [
    { label: 'Socks', value: "socks" },
    { label: 'Compact textiles', value: "compactTextiles" },
    { label: 'Packaging', value: "packaging" },
    { label: 'Hygiene', value: "hygiene" },
    { label: 'Knitwear', value: "knitwear" },
    { label: 'Towels', value: "towels" },
  ];

  ngOnInit() {
    console.log(this.product)

    this.initializeForm();
  }

  showDialog() {
    this.visible = true;
}

  addPriceField(){
    this.prices.push({qty: "", price: 0, isComplex: false, delivery: null, setup: null})
  }

  initializeTranslations() {
    let i = 0;
    this.languages.forEach(lang => {
      this.translations[i] = {
        "language": lang.Name,
        "code": lang.code,
        "title": this.product[`title_${lang.code}`],
        "desc": this.product[`desc_${lang.code}`],
        "comp": this.product[`comp_${lang.code}`]
      };
      i++
    });
  }
  // initializePrices() {
  //   let i = 0;
  //   for (let price in this.prices) {
  //     this.priceFields[i] = {
  //       "qty": price,
  //       "price": this.prices[price]["price"],
  //       "setup": this.prices[price]["setup"],
  //       "delivery": this.prices[price]["delivery"]
  //     };
  //     if (this.prices.price.isComplex){
  //       this.priceFields[i]["setup"] = this.prices[price]["price"]
  //       this.priceFields[i]["setup"]
  //     }
  //     i++; // increment i to avoid overwriting the same index
  //   }
  // }
  initializeCategory(){
    this.categoryOptions.forEach(category => {
      if (category.value == this.product.cat){
        this.selectedCategory = {label: category.label, value: category.value}
      }
    });
      
    }
    initializeForm() {
      // Verificar si el producto existe. Si no, inicializar todos los campos en blanco o valores por defecto.
      if (this.product) {
        this.reference = this.product.ref || '';
        this.title = this.product.title_en || '';
        this.description = this.product.desc_en || '';
        this.composition = this.product.comp_en || '';
        this.weight = this.product.weight || 0;
        this.volumetricWeight = this.product.volumetricWeight || 0;
        this.prices = this.product.prices ? JSON.parse(this.product.prices) : [];
        // this.initializePrices();
        this.initializeCategory();
        this.initializeTranslations();
      } else {
        // Inicializa todos los campos en blanco o valores por defecto si el producto es null
        this.reference = '';
        this.title = '';
        this.description = '';
        this.composition = '';
        this.weight = '';
        this.volumetricWeight = '';
        this.prices = [];
        this.priceFields = [];
        this.selectedCategory = {};
        this.translations = this.languages.map(lang => ({
          "language": lang.Name,
          "code": lang.code,
          "title": '',
          "desc": '',
          "comp": ''
        }));
      }
    }

  async updateProduct() {
    let updatedProduct = {
      ref: this.reference,
      images: {},
      prices: this.parsePrices(),
      cat: this.selectedCategory["value"],
      weight: this.weight,
      volumetricWeight: this.volumetricWeight,
    };
    updatedProduct = this.parseTranslations(updatedProduct)
    console.log('Product updated:', updatedProduct);
    await updateProduct(updatedProduct)
    this.closeParentDialog()
  }

  parsePrices(){
    let objectPrices: any = {}
    this.priceFields.forEach(price => {
      if (price.price > 0){
        objectPrices[price.qty]["price"] = price.price}
      if (price.complex){
        objectPrices[price.qty]["setup"] = price.setup
        objectPrices[price.qty]["delivery"] = price.delivery
      }
    });
    return objectPrices
  }

  parseTranslations(product: any){
    this.translations.forEach(language => {
       product[`title_${language.code}`] = language.title,
       product[`desc_${language.code}`] = language.desc,
       product[`comp_${language.code}`] = language.comp
      }
    );
    return product
  }


}
