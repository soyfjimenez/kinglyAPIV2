import ExcelJS from 'exceljs';
import path from 'path';
import fs from 'fs';

export const downloadEndpoint = async (req, res) => {
    const attributes = JSON.parse(req.body.attributes);
    const refs = JSON.parse(req.body.refs);
    console.log(attributes)
    console.log(refs)
    try {
        const file = await generateExcelReport(attributes, refs);
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

export const generateExcelReport = async (attributes, refs) => {
    const data = await retrieveData(refs);

    // Create a new Excel workbook and worksheet
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Sheet 1');

    // Check if attributes is "*"; if true, include all attributes
    let allAttributes = false;
    if (attributes === "*") {
        allAttributes = true;
        attributes = [];  // Empty the attributes array for later use
    }

    // Convert attributes to an array if necessary
    if (!Array.isArray(attributes)) {
        attributes = attributes ? [attributes] : [];
    }

    // Get all unique attributes if "*" was specified
    if (allAttributes) {
        data.forEach(row => {
            Object.keys(row).forEach(attribute => {
                if (!attributes.includes(attribute)) {
                    attributes.push(attribute);
                }
            });
        });
    }

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

