import ExcelJS from 'exceljs';
import path from 'path';
import fs from 'fs';

export const downloadEndpoint = async (req, res) => {
    const attributes = JSON.parse(req.body.attributes);
    const refs = JSON.parse(req.body.refs);
    const priceMultiplier = JSON.parse(req.body.priceMultiplier);
    try {
        const file = await generateExcelReport(attributes, refs, priceMultiplier);
        res.download(file, (err) => {
            if (err) {
                console.error('Error during file download:', err);
                return res.status(500).send('Error downloading the file');
            }
        });
    } catch (error) {
        console.error('Error generating the Excel report:', error);
        res.status(500).send('Error generating the file');
    }
};

export const generateExcelReport = async (attributes, refs,priceMultiplier) => {
    let data = await retrieveData(refs);
        for (let row in data) {
            // console.log("row")
            // console.log(row)
            // console.log("row")
            for (let field in row) { 
            if (!attributes.includes(field)) {
                // delete row[field];
            }
        }
        }
    data = formatPricingPerRow(data,priceMultiplier);
    data = formatPricingPerColumn(data,priceMultiplier);
    data = stripBadInfo(data);
    // console.log(data)
    // Create a new Excel workbook and worksheet
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Sheet 1');
        data.forEach(row => {
            Object.keys(row).forEach(attribute => {
                if (!attributes.includes(attribute)) {
                    attributes.push(attribute);
                }
            });
        });

    const headers = attributes.map(attribute => ({ header: attribute, key: attribute }));
    worksheet.columns = headers;

    // Process and add data rows to the worksheet
    
    data.forEach(row => {
        // Parse the prices field if it's a JSON string

        worksheet.addRow(row);
    });

    // Define the directory and file path
    const directoryPath = "src/downloads";
    const excelFilePath = path.join(directoryPath, 'KINGLY_EXPORT.xlsx');

    // Ensure directory exists
    if (!fs.existsSync(directoryPath)){
        fs.mkdirSync(directoryPath, { recursive: true });
    }

    try {
        // Write the workbook to a file
        await workbook.xlsx.writeFile(excelFilePath);
        console.log("Excel file saved at:", excelFilePath);
        return excelFilePath;
    } catch (error) {
        console.error('Error writing the Excel file:', error);
        throw error;
    }
};


const retrieveData = async (refs) => {
    const url = 'https://digital.wearekingly.com/internal/refs/'; // The URL for the API endpoint

    try {
        const formData = new URLSearchParams();
        formData.append('refs', JSON.stringify(refs));

        const response = await fetch(url, {
            method: 'POST', // Using the HTTP POST method
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'auth': 'Galatea'
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

function formatPricingPerRow(data,priceMultiplier){
    console.log(priceMultiplier)
    data.forEach(row => {
        // Parse the prices field if it's a JSON string
        if (row.prices && typeof row.prices === 'string') {
            try {
                row.prices = JSON.parse(row.prices);
            } catch (e) {
                console.error('Error parsing prices:', e);
            }
        }
        let i = 1
        for (let price in row.prices) {
            row[`Qty${i}`] = price
            row[`Price${i}`] = row.prices[price] * parseFloat(priceMultiplier)
            i++
        }
    });
return data
}

function formatPricingPerColumn(data,priceMultiplier){
    console.log(priceMultiplier)
    data.forEach(row => {
        // Parse the prices field if it's a JSON string
        if (row.prices && typeof row.prices === 'string') {
            try {
                row.prices = JSON.parse(row.prices);
            } catch (e) {
                console.error('Error parsing prices:', e);
            }
        }
        let i = 1
        for (let price in row.prices) {
      row[price] = row.prices[price] * parseFloat(priceMultiplier)
            i++
        }
    });
return data
}

function stripBadInfo(data){
    data.forEach(row => {
        delete row.price150
        delete row.price250
        delete row.price350
        delete row.price500
        delete row.price750
        delete row.price1000
        delete row.price1500
        delete row.price2500
        delete row.price3500
        delete row.price5000
        delete row.price10000
        delete row.prices
        delete row.price150
        delete row.images
        delete row.imageUrl
    });
return data
}