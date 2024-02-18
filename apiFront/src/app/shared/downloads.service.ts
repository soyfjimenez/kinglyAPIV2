
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  
}

export async function generateExcelReport(refs: any, attributes: any,priceMultiplier: any){
  fetch('http://localhost:4000/downloads', {
  method: 'POST',
  headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'auth': 'Galatea'
  },
  body: `refs=${JSON.stringify(refs)}&attributes=${JSON.stringify(attributes)}&priceMultiplier=${priceMultiplier}`
  // body: `refs=["KS04","KS02"]&attributes=${JSON.stringify(attributes)}`
})
.then(response => response.blob())
.then(blob => {
  // Create a link and set the URL as the Blob URL
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');

  link.href = url;
  link.download = 'report.xlsx';
  
  // Append the link to the body, click it, and remove it
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  // Clean up by revoking the Blob URL
  window.URL.revokeObjectURL(url);
})
.catch(error => {
  console.error('Error generating report:', error);
});
}