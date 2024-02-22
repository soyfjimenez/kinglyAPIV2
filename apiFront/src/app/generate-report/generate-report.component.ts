import { ProductService } from './../shared/product.service';
import { Component, OnInit } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { generateExcelReport } from '../shared/downloads.service';
import { getProductFields } from '../shared/product.service';
import { updateProduct, getProducts } from 'dist/product.service';

@Component({
  selector: 'app-generate-report',
  templateUrl: './generate-report.component.html',
  styleUrl: './generate-report.component.scss'
})
export class GenerateReportComponent{
  productFields!: object[];
  selectedFields!: object[];
  selectedProducts: any;
  priceModifier: number = 0;
    // selectedFields!: any;


    async ngOnInit() {
      this.productFields = await getProductFields()
      this.selectedFields = this.productFields
  }

    getReport(selection: any){
        console.log(selection)
        let selectedFields = this.parseSelectedFields(this.selectedFields)
        generateExcelReport(selection.refs,selectedFields,this.priceModifier / 100 + 1)
      }

      parseSelectedFields(selectedFields:any){
        let formattedSelectedFields = []
        for (let field of selectedFields) {
          formattedSelectedFields.push(field.name)
       }
       return formattedSelectedFields;
      }

    async processNewPricing(selection: any){
      let refs: any[] = await getProducts(selection)
      refs.forEach(product =>{
        let newPrices: object[] = []
        let prices = JSON.parse(product.prices)
        let i = 0
        console.log(product.prices)
        for (let price in prices){
          newPrices[i] = {
            "qty": price,
            "price": prices[price],
            "isComplex": false,
            "setup": "",
            "delivery":""
          }
          i++
        }
        product.prices = newPrices
        console.log(product)
        updateProduct(product)
      })
    }
}
