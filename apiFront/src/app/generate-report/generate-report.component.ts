import { Component, OnInit } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { generateExcelReport } from '../shared/downloads.service';
import { getProductFields } from '../shared/product.service';
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
}
