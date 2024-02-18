
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  getProducts(): Observable<any> {
    const headers = new HttpHeaders({
      'auth': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImtpbmdseSIsImlhdCI6MTcwNTY5Mjg3OCwiZXhwIjoxNzA1Nzc5Mjc4fQ.pchbDJpcZ-ePwRIr60_dA_fhOE72iZCVEwoft5ZwaEM'
    });
    
    return this.http.post('https://digital.wearekingly.com/internal/refs/', { headers: headers });
  }

  
}

export async function getProducts(selection:any) {
console.log(selection)
  switch (selection.mode){
    case "categories":
      let url = `https://digital.wearekingly.com/internal/cat/${selection.categories}`; // The URL for the API endpoint

  try {
          const response = await fetch(url, {
          method: 'GET', // Using the HTTP POST method
          headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              'auth': 'Galatea'
          },
      });

      const data = await response.json();
      return data; // Return the data
  } catch (error) {
      console.error('Error:', error); // Log any errors that occur during the fetch operation
      throw error; // You can choose to handle the error here or let it propagate to the calling code
  }


    case "references":

    try {
        const formData = new URLSearchParams();
        formData.append('refs', JSON.stringify(selection.refs));

        const response = await fetch('https://digital.wearekingly.com/internal/refs/', {
            method: 'POST', // Using the HTTP POST method
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'auth': 'Galatea'
                // Add other headers if needed
            },
            body: formData.toString(),
        });

        const data = await response.json(); // Parse the response body as JSON
        return data; // Return the parsed JSON data
    } catch (error) {
        console.error('Error:', error); // Log any errors that occur during the fetch operation
        throw error; // You can choose to handle the error here or let it propagate to the calling code
    }
      
  }
}

export async function updateProduct(product: object) {
  const url = 'https://digital.wearekingly.com/internal/'; // The URL for the API endpoint

  try {
      const formData = new URLSearchParams();
      formData.append('product', JSON.stringify(product));
      const response = await fetch(url, {
          method: 'POST', // Using the HTTP POST method
          headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              'auth': 'Galatea'
          },
          body: formData.toString(),
      });

      const data = await response.json();
      console.log(data)
      return data; // Return the data
  } catch (error) {
      console.error('Error:', error); // Log any errors that occur during the fetch operation
      throw error; // You can choose to handle the error here or let it propagate to the calling code
  }
}


export async function getProductIndex() {
  const url = `https://digital.wearekingly.com/internal/end/productIndex`; // The URL for the API endpoint

  try {
          const response = await fetch(url, {
          method: 'GET', // Using the HTTP POST method
          headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              'auth': 'Galatea'
          },
      });

      const data = await response.json();
      return data; // Return the data
  } catch (error) {
      console.error('Error:', error); // Log any errors that occur during the fetch operation
      throw error; // You can choose to handle the error here or let it propagate to the calling code
  }
}

export async function getProductFields() {
  const url = `https://digital.wearekingly.com/internal/productFields`; // The URL for the API endpoint

  try {
          const response = await fetch(url, {
          method: 'GET', // Using the HTTP POST method
          headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              'auth': 'Galatea'
          },
      });
      let data = await response.json();
      console.log(data)
      let formattedData = []
      for (let field of data) {
       formattedData.push({name: field})
    }
      console.log(formattedData)
      return formattedData; // Return the data
  } catch (error) {
      console.error('Error:', error); // Log any errors that occur during the fetch operation
      throw error; // You can choose to handle the error here or let it propagate to the calling code
  }
}

export async function deleteProduct(product: any) {
  const url = `https://digital.wearekingly.com/internal/${product.ref}`; // The URL for the API endpoint

  try {
          const response = await fetch(url, {
          method: 'DELETE', // Using the HTTP POST method
          headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              'auth': 'Galatea'
          },
      });

      const data = await response.json();
      console.log(data)
      return data; // Return the data
  } catch (error) {
      console.error('Error:', error); // Log any errors that occur during the fetch operation
      throw error; // You can choose to handle the error here or let it propagate to the calling code
  }
}