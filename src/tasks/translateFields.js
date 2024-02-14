export const translateFields = async (req, res) => {
    const fields = ["title","comp","desc"]
    const languages = [
        {
            "langCode": "de",
            "displayName": "German"
        },
        {
            "langCode": "es",
            "displayName": "Spanish"
        },
        {
            "langCode": "fr",
            "displayName": "French"
        },
        {
            "langCode": "it",
            "displayName": "Italian"
        }
    ]
    let refsToTranslate = await retrieveData(` KW08 (12) M-W,  KW08 (7/8),  KW08 (7/8) M-W,  KW08U (12),  KW08U (7/8),  KW1,  KW2,  KW3,  KW4,  KWT1,  KWT2,  KWT3,  KWT4,  PBET01,  PBET02,  PBET03,  PBET04,  PBT01,  PBT02,  PBT03,  PBT04,  POLYG-BEANIES,  POLYG-SCARVES,  POLYG-SWEATERS,  PP01,  PVT01,  PVT02,  PVT03,  PVT04,  PVT05,  RSG01,  SG01,  SG04,  SG07,  SS01,  SS02,  SSP01,  TB1,  TB2,  TB3,  TB4,  TT1,  TT2,  TT3,  TT4`)
    for (const reference of refsToTranslate){
        let translatedReference = reference
        for (const field of fields){
            for (const lang of languages){
                let fieldKey = `${field}_${lang.langCode}`
                let originalFieldKey = `${field}_en`
                if(translatedReference[originalFieldKey] != "undefined"){
                    translatedReference[fieldKey] = await getTranslation(reference[originalFieldKey],lang.displayName)
                }
                
            };
            
        };
        translatedReference.composition_de = translatedReference.comp_de;
        console.log(translatedReference)
        await updateProduct(translatedReference)
    };
    res.json("Correctly translated!");
}


async function getTranslation(toTranslate,language) {
    const url = 'http://localhost:5000/text/translate'; // The URL for the API endpoint

    try {
        const formData = new URLSearchParams();
        formData.append('text', toTranslate);
        formData.append('targetLanguage', language);
        const response = await fetch(url, {
            method: 'POST', // Using the HTTP POST method
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                // Add other headers if needed
            },
            body: formData.toString(),
        });

        const data = await response.text();
        return data; // Return the data
    } catch (error) {
        console.error('Error:', error); // Log any errors that occur during the fetch operation
        throw error; // You can choose to handle the error here or let it propagate to the calling code
    }
}















const retrieveData = async (refs) => {
    const url = 'https://digital.wearekingly.com/internal/refs/'; // The URL for the API endpoint

    try {
        const formData = new URLSearchParams();
        formData.append('refs', refs);
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


async function updateProduct(product) {
    const url = 'http://localhost:4000/internal/'; // The URL for the API endpoint

    try {
        const formData = new URLSearchParams();
        formData.append('product', JSON.stringify(product));
        const response = await fetch(url, {
            method: 'POST', // Using the HTTP POST method
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                // Add other headers if needed
            },
            body: formData.toString(),
        });

        const data = await response.json();
        return data; // Return the data
    } catch (error) {
        console.error('Error:', error); // Log any errors that occur during the fetch operation
        throw error; // You can choose to handle the error here or let it propagate to the calling code
    }
}

async function getLanguages() {
    const url = 'http://localhost:4000/internal/languages'; // The URL for the API endpoint

    try {
        const response = await fetch(url, {
            method: 'GET', // Using the HTTP POST method
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                // Add other headers if needed
            }
        });

        const data = await response.json();
        return data; // Return the data
    } catch (error) {
        console.error('Error:', error); // Log any errors that occur during the fetch operation
        throw error; // You can choose to handle the error here or let it propagate to the calling code
    }
}