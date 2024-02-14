import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { getProductIndex } from 'src/app/shared/product.service';

@Component({
  selector: 'app-advanced-search',
  templateUrl: './advanced-search.component.html',
  styleUrl: './advanced-search.component.scss'
})
export class AdvancedSearchComponent implements OnInit {
  @Output() productAdvancedSelection = new EventEmitter<any>();
  visible: boolean = false;
  categories!: any[];
  selectedCategories!: any;

  async ngOnInit() {
    this.productIndex = await getProductIndex()
}

productIndex:any = [];

selectedProducts: any;


sendAdvancedSelection(){
  let selectedRefs:any = []
  console.log(this.selectedProducts)
  this.selectedProducts.forEach((ref:any) => {
    if(ref.data){
      selectedRefs.push(ref.data)
    }
    
  });
  let selection:object = {
    mode: "references",
    refs: selectedRefs,
  }
  this.productAdvancedSelection.emit(selection);
}

}