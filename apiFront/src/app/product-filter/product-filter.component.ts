import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-product-filter',
  templateUrl: './product-filter.component.html',
  styleUrl: './product-filter.component.scss'
})
export class ProductFilterComponent implements OnInit {
  @Input() advancedSearchData: any;
  @Output() productFilterData = new EventEmitter<any>();
  visible: boolean = false;
  categories!: any[];
  selectedCategories!: any;

  async ngOnInit() {
    this.categories = [
        {name: 'Socks', code: 'socks'},
        {name: 'Compact Textiles', code: 'compactTextiles'},
        {name: 'Towels', code: 'towels'},
        {name: 'Hygiene', code: 'hygiene'},
        {name: 'Packaging', code: 'packaging'},
        {name: 'Knitwear', code: 'knitwear'},
    ];
}

  sendCategorySelection(){
    let categoriesArray = this.selectedCategories.code
    let selectedCats:object = {
      mode: "categories",
      categories: categoriesArray,
    }
    this.productFilterData.emit(selectedCats);
  }


  async showDialog() {
    this.visible = true;
}

sendAdvancedSelection(selection: any){

  this.productFilterData.emit(selection);
  this.visible = false;
}

}