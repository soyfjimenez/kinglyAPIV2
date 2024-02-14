import { Component, OnInit } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { generateExcelReport } from '../shared/downloads.service';
@Component({
  selector: 'app-generate-report',
  templateUrl: './generate-report.component.html',
  styleUrl: './generate-report.component.scss'
})
export class GenerateReportComponent{


    selectedProducts: any;
    // selectedFields!: any;

    getReport(selection: any){
        console.log(selection)
        generateExcelReport(selection.refs,"*")
        // this.productAdvancedSelection.emit(selection);
      }
}
