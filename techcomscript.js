document.addEventListener('DOMContentLoaded', function() {
    const inputFields = document.querySelectorAll('input');
    const printButton = document.getElementById('printButton');
    const oeField = document.getElementById('oe'); // Renaming variable to avoid conflict

    // Prevent negative values in Other Expenses field
    oeField.addEventListener('input', function() {
        if (parseFloat(oeField.value) < 0) {
            alert("Other Expenses cannot be negative.");
            oeField.value = 0;
        }
    });

    // Define the calculateCommission function
    function calculateCommission() {
        const tp = parseFloat(document.getElementById('tp').value) || 0;
        const material = parseFloat(document.getElementById('material').value) || 0;
        const oe = parseFloat(oeField.value) || 0;
        const day1 = parseFloat(document.getElementById('day1').value) || 0;
        const day2 = parseFloat(document.getElementById('day2').value) || 0;
        const day3 = parseFloat(document.getElementById('day3').value) || 0;
        const day4 = parseFloat(document.getElementById('day4').value) || 0;
        const day5 = parseFloat(document.getElementById('day5').value) || 0;
        const ah = parseFloat(document.getElementById('ah').value) || 0;
        const toh = parseFloat(document.getElementById('toh').value) || 0;
        const pd = parseFloat(document.getElementById('pd').value) || 0;

        // Calculate total hours
        const totalHours = day1 + day2 + day3 + day4 + day5 + ah + (1.5 * toh);
        document.getElementById('totalHours').value = totalHours;

        // Calculate gross amount
        const grossAmount = tp - (material * 1.2) - (totalHours * 75) - oe;

        // Base commission calculation
        const baseCommission = 0.21191 * grossAmount;

        // Calculate gross profit
        const grossProfit = grossAmount - baseCommission;

        // Calculate overheads and profit
        const overheads = pd * 246;
        const finalProfit = grossProfit - overheads;

        // Calculate profit percentage
        let profper = 0;
            if (tp !== 0) {
                profper = ((finalProfit / tp) * 100).toFixed(2);
} else {
    profper = '0.00';
}

        // Calculate kicker based on profit percentage
        let kicker = 0;
        if (profper >= 30.01 && profper <= 39.99) {
            kicker = 0.015 * tp;
        } else if (profper >= 40.01 && profper <= 49.99) {
            kicker = 0.020 * tp;
        } else if (profper >= 50.01 && profper <= 59.99) {
            kicker = 0.025 * tp;
        } else if (profper >= 60.01) {
            kicker = 0.030 * tp;
        }

        const nfinalprofit = finalProfit - kicker + (material * 1.2 * 0.1667) + (totalHours * 75 * 0.4);
        const nprofper = tp !== 0 ? ((nfinalprofit / tp) * 100).toFixed(2) : '0.00';

        // Total commission including kicker
        const totalCommission = baseCommission + kicker;

        // Calculate SW, WH, and RD (assuming these are percentage calculations)
        const sw = ((material * 1.2) / tp) * 100 || 0;
        const wh = sw;
        const rd = sw;

        // Output final commission
        document.getElementById('baseCommission').textContent = '$' + baseCommission.toFixed(2);
        document.getElementById('kicker').textContent = '$' + kicker.toFixed(2);
        document.getElementById('totalCommission').textContent = '$' + totalCommission.toFixed(2);
        document.getElementById('sw').value = sw.toFixed(2);
        document.getElementById('wh').value = wh.toFixed(2);
        document.getElementById('rd').value = rd.toFixed(2);
        document.getElementById('bpp').value = nprofper + '%';
    }

    // Attach event listener to calculate button
    document.getElementById('calculateBtn').addEventListener('click', calculateCommission);

    // Add print functionality
    printButton.addEventListener('click', function() {

    // Ensure the values are correctly fetched before opening the print window
    const technicianName = document.getElementById('tn').value;
    const notes = document.getElementById('notes').value;
    const jobAddress = document.getElementById('ja').value;
    const totalPrice = document.getElementById('tp').value;
    const materialExpenses = document.getElementById('material').value;
    const oe = document.getElementById('oe').value;
    const projectHours = document.getElementById('pd').value;
    const day1 = document.getElementById('day1').value;
    const day2 = document.getElementById('day2').value;
    const day3 = document.getElementById('day3').value;
    const day4 = document.getElementById('day4').value;
    const day5 = document.getElementById('day5').value;
    const additionalHours = document.getElementById('ah').value;
    const overtimeHours = document.getElementById('toh').value;
    const totalHours = document.getElementById('totalHours').value;
    const sw = document.getElementById('sw').value;
    const wh = document.getElementById('wh').value;
    const rd = document.getElementById('rd').value;
    const totalCommission = document.getElementById('totalCommission').textContent;
    const invoiceNumber = document.getElementById('in').value;
    const bpp = document.getElementById('bpp').value;
    //const tech1 = document.getElementById('tech1').textContent;
    //const tech2 = document.getElementById('tech2').textContent;
    //const grossAmount = document.getElementById('grossAmount').textContent;
    //const grossProfit = document.getElementById('grossProfit').textContent;
    //const overheads = document.getElementById('overheads').textContent;
    //const nprofit = document.getElementById('profit').textContent;
    //const nprofper = document.getElementById('profper').textContent;
    const baseCommission = document.getElementById('baseCommission').textContent;
    const kicker = document.getElementById('kicker').textContent;
    const date = document.getElementById('date').value;

    // Adjust the logo size for printing
    const logoImage = document.querySelector('.logo-container img');
    logoImage.style.width = '200px'; // Adjust as needed
    logoImage.style.height = 'auto'; // Maintain aspect ratio
    
    // Create the HTML content for the print window
    const printWindow = window.open('', '', 'width=800,height=600');
        printWindow.document.write( `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>TECHNICIAN POTENTIAL COMMISSION</title>
            <style>
                .logo-container img {
                    width: 200px; /* Adjust the width as needed */
                    height: auto; /* Maintain aspect ratio */
                }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="logo-container">
                    <img src="BP.png" alt="BP logo">
                </div>
                <h2>TECHNICIAN COMMISSION CALCULATOR</h2>
                <div class="details-section">
                <h3>DETAILS:</h3>
                <table>
                    <tr><th>Technician's Name:</th><td>${technicianName}</td></tr>
                    <tr><th>Invoice Number:</th><td>${invoiceNumber}</td></tr>
                    <tr><th>Job Address:</th><td>${jobAddress}</td></tr>
                    <tr><th>Date:</th><td>${date}</td></tr>
                    <tr><th>Project Hours:</th><td>${projectHours}</td></tr>
                    <tr><th>Material Expenses:</th><td>${materialExpenses}</td></tr>
                    <tr><th>Other Expenses:</th><td>${oe}</td></tr>
                    <tr><th>Total Price:</th><td>${totalPrice}</td></tr>
                    <tr><th>Notes:</th><td>${notes}</td></tr>
                </table>
                </div>
                <div class="labor-details-section">
                    <h3>LABOR DETAILS:</h3>
                    <table>
                        <tr>
                            <th>Day 1</th><th>Day 2</th><th>Day 3</th><th>Day 4</th><th>Day 5</th>
                        </tr>
                        <tr>
                            <td>${day1}</td><td>${day2}</td><td>${day3}</td><td>${day4}</td><td>${day5}</td>
                        </tr>
                        <tr>
                            <th>Additional Hours</th><th>Overtime Hours</th><th>Total Hours</th>
                        </tr>
                        <tr>
                            <td>${additionalHours}</td><td>${overtimeHours}</td><td>${totalHours}</td>
                        </tr>
                    </table>
                </div>
                <h3>FOR OFFICE USE ONLY:</h3>
                <table>
                    <tr>
                        <th>SW21/RP21</th><th>WH32</th><th>RD15/UL15</th><th>BPP%</th>
                    </tr>
                    <tr>
                        <td>${sw}</td><td>${wh}</td><td>${rd}</td><td>${bpp}</td>
                    </tr>
                </table>
                <div class="commission-details-section">
                <h3>COMMISSION DETAILS:</h3>
                <table>
                    <tr><th>Technician Base Commission:</th><td>${baseCommission}</td></tr>
                    <tr><th>Kicker:</th><td>${kicker}</td></tr>
                    <tr><th>Technician Total Commission:</th><td>${totalCommission}</td></tr>
                </table>
                </div>
            </div>
        </body>
        </html>
    `);

    // Add print functionality
    printWindow.document.close();
        printWindow.focus();
        printWindow.print();
        printWindow.close();
    });
});