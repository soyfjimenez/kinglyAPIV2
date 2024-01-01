import ExcelJS from 'exceljs';

export const downloadEndpoint = async (req,res) => {
// generateExcelReport("",["KS04","KS06"])
const file = await generateExcelReport("",["KS04","KS06"])
res.download("src/downloads/KINGLY_EXPORT.xlsx", (err) => {
    if (err) {
      // Manejar errores, por ejemplo, si el archivo no existe
      console.error('Error al descargar el archivo:', err);
      res.status(500).send('Error al descargar el archivo');
    }
  });

}


export const generateExcelReport = async (attributes, refs) => {
    const data = await retrieveData(refs);

    // Create a new Excel workbook and worksheet
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Sheet 1');

    // Add headers to the worksheet based on the attributes
    attributes = Array.from(attributes);

    const headers = attributes.map(attribute => ({ header: attribute, key: attribute }));
    worksheet.columns = headers;

    // Process and add data rows to the worksheet
    data.forEach(row => {
        // Parse the prices field if it's a JSON string
        if (row.prices && typeof row.prices === 'string') {
            try {
                row.prices = JSON.parse(row.prices);
            } catch (e) {
                console.error('Error parsing prices:', e);
            }
        }

        // Add additional price fields if they exist
        const priceFields = ['price150', 'price250', 'price350', 'price500', 'price750', 'price1000', 'price1500', 'price2500', 'price3500', 'price5000', 'price10000'];
        priceFields.forEach(field => {
            if (row[field]) {
                row.prices = { ...(row.prices || {}), [field]: row[field] };
            }
        });

        worksheet.addRow(row);
    });

    const excelFilePath = `KINGLY_EXPORT.xlsx`;

    try {
        // Write the workbook to a file
        await workbook.xlsx.writeFile(excelFilePath);
        console.log("Archivo guardado")
        // Return the path where the file can be accessed
        return `src/downloads/${excelFilePath}`;
    } catch (error) {
        // Handle any errors that occur during file writing
        console.error('Error writing the Excel file:', error);
        throw error; // Or handle it in another way depending on your application's needs
    }
};



  
  const retrieveData = async (refs) => {

    const url = 'http://localhost:4000/api/en/refs/'; // The URL for the API endpoint
  
    try {
      const formData = new URLSearchParams();
      formData.append('refs', JSON.stringify(refs));
  
      const response = await fetch(url, {
        method: 'POST', // Using the HTTP POST method
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
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
  };
  




// export const generateExcelReport = async (attributes,refs) => {
// const data = await retrieveData(refs);
//  // Create a new Excel workbook and worksheet
//  const workbook = new ExcelJS.Workbook();
//  const worksheet = workbook.addWorksheet('Sheet 1');

//  // Add headers to the worksheet based on the attributes
//  const headers = attributes.map(attribute => ({ header: attribute, key: attribute }));
//  worksheet.columns = headers;

//  // Add data rows to the worksheet
//  data.forEach(row => {
//    worksheet.addRow(row);
//  });
//  const fechaActual = new Date();
//  const excelFilePath = `KINGLY EXPORT.xlsx`;
//  await workbook.xlsx.writeFile(excelFilePath);
//  return `src/downloads/${excelFilePath}`
// };






  // const retrieveData = async (refs) => {
//     console.log(refs)
//     const url = 'http://localhost:4000/api/en/refs/';
  
//     try {
//       const response = await fetch(url, {
//         method: 'POST',
//         headers: {
//         //   'Authorization': authorizationToken,
//         //   'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ refs }),
//       });
  
//       const data = await response.json();
//       console.log(data)
//       return data;
//     } catch (error) {
//       console.error('Error:', error);
//       throw error; // You can choose to handle the error here or let it propagate to the calling code
//     }
//   };