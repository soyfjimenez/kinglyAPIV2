document.getElementById('generateReport').addEventListener('click', function() {
    const refsInput = document.getElementById('refs').value;
    const refs = refsInput.split(',').map(ref => ref.trim());
    const attributes = "*"; // Since all fields are to be included

    fetch('https://digital.wearekingly.com/downloads', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `refs=${JSON.stringify(refs)}&attributes=${JSON.stringify(attributes)}`
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
});
