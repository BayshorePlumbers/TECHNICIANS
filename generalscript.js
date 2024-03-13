document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('calculateBtn').addEventListener('click', calculateFinalPrice);

    var inputFields = document.querySelectorAll('input, select');
    inputFields.forEach(function(input) {
        input.addEventListener('input', calculateFinalPrice);
    });

    calculateFinalPrice();
});

function calculateFinalPrice() {
    var pdu = document.getElementById('pdu');
    var epd = parseInt(document.getElementById('epd').value) || 0;
    var material = parseFloat(document.getElementById('material').value) || 0;
    var rentals = parseFloat(document.getElementById('rentals').value) || 0;
    var mac = document.getElementById('mac').value; // Fix: Added .value
    var am = parseInt(document.getElementById('am').value) || 0;
    var permits = document.getElementById('permits').value; // Fix: Removed .toUpperCase() to compare case-sensitive values
    var discount = document.getElementById('discount').value.toUpperCase();
    
    var finalPriceSpan = document.getElementById('finalPrice');

    var finalPrice = 0;

    if (pdu.value.toUpperCase() === 'DAYS') {
        finalPrice += epd * 8 * 453;
    } else {
        finalPrice += epd * 453;
    }
 
    finalPrice += material * 2;
    finalPrice += rentals * 1.5;

    if (pdu.value.toUpperCase() === 'DAYS') {
        switch (mac) {
            case '0':
                finalPrice += 0;
                break;
            case 'eb':
                finalPrice += 50 * epd;
                break;
            case 'es':
                finalPrice += 40 * epd;
                break;
            case 'bc':
                finalPrice += 40 * epd;
                break;
            case 'hydro':
                finalPrice += 40 * epd;
                break;
            case 'dump':
                finalPrice += 30 * epd;
                break;
            case 'tp':
                finalPrice += 10 * epd;
                break;
            case 'vr':
                finalPrice += 20 * epd;
                break;
            case 'tmac':
                finalPrice += 50 * epd;
                break;
            case 'shoring':
                finalPrice += 10 * epd;
                break;
            default:
                console.log('Invalid value for mac:', mac);
        }       
    } else {
        switch (mac) {
            case '0':
                finalPrice += 0;
                break;
            case 'eb':
                finalPrice += 6.25 * epd;
                break;
            case 'es':
                finalPrice += 5 * epd;
                break;
            case 'bc':
                finalPrice += 5 * epd;
                break;
            case 'hydro':
                finalPrice += 5 * epd;
                break;
            case 'dump':
                finalPrice += 3.75 * epd;
                break;
            case 'tp':
                finalPrice += 1.25 * epd;
                break;
            case 'vr':
                finalPrice += 2.5 * epd;
                break;
            case 'tmac':
                finalPrice += 6.25 * epd;
                break;
            case 'shoring':
                finalPrice += 1.25 * epd;
                break;
            default:
                console.log('Invalid value for mac:', mac);
        }
    }

    if (pdu.value.toUpperCase() === 'DAYS') {
        finalPrice += am * epd * 8 * 75;
    } else {
        finalPrice += am * epd * 75;
    }

    switch (permits) {
        case '0':
            finalPrice += 0;
            break;
        case 'building':
            finalPrice += 350;
            break;
        case 'encroachment':
            finalPrice += 1550;
            break;
        case 'sewer':
            finalPrice += 450;
            break;
        default:
            console.log('Invalid value for permits:', permits);
    }

    if (discount === '5%') {
        finalPrice *= 0.95;
    } else if (discount === '10%') {
        finalPrice *= 0.9;
    }

    finalPriceSpan.textContent = '$' + finalPrice.toFixed(2);
}
