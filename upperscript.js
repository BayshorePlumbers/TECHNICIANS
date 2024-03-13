document.addEventListener('DOMContentLoaded', function() {
    const biddingForm = document.getElementById('biddingForm');
    biddingForm.addEventListener('input', calculateFinalPrice);

    calculateFinalPrice(); // Calculate final price when the page loads
});

function calculateFinalPrice() {
    const ed = parseFloat(document.getElementById('ed').value) || 0;
    const method = document.getElementById('method').value.toLowerCase();
    const am = document.getElementById('am').value;
    const swr = document.getElementById('swr');
    const landscape = document.getElementById('landscape').value.toLowerCase();
    const bm = document.getElementById('bm').value.toLowerCase();
    const pb = document.getElementById('pb').value.toLowerCase();
    const permits = document.getElementById('permits').value.toLowerCase();
    const depth = parseFloat(document.getElementById('depth').value) || 0;
    const others = parseFloat(document.getElementById('others').value) || 0;
    const discount = document.getElementById('discount').value;
    const dumping = parseFloat(document.getElementById('dumping').value) || 0;
    var finalPriceSpan = document.getElementById('finalPrice');

    var finalPrice = 0;

    finalPrice += others * 1.2;

    if (method.toUpperCase() === 'OPEN TRENCH') {
        finalPrice += 960 * 1.2;
    } else if (method.toUpperCase() === 'TRENCHLESS') {
        finalPrice += 1010 * 1.2;
    }

    if (am === '1d') {
        finalPrice += 75 * 8 * 1  * 1.2;
    } else if (am === '2d') {
        finalPrice += 75 * 8 * 2 * 1.2;
    } else if (am === '3d') {
        finalPrice += 75 * 8 * 3 * 1.2;
    } else if (am === 'nr') {
        finalPrice += 0;
    }

    if (swr.checked) {
        finalPrice += 400 * 1.2;
    }

    switch (method) {
        case 'open trench':
            switch (landscape) {
                case 'dirt':
                    finalPrice += 0 * 1.2;
                    break;
                case 'pavers':
                    finalPrice += 1200 * 1.2;
                    break;
                case 'asphalt':
                    finalPrice += 350 * 1.2;
                    break;
                case 'concrete':
                    finalPrice += 600 * 1.2;
                    break;
            }
            switch (bm) {
                case 'native soil':
                    finalPrice += 0 * 1.2;
                    break;
                case 'base rock':
                    finalPrice += 630 * 1.2;
                    break;
            }
            switch (pb) {
                case 'native soil':
                    finalPrice += 0 * 1.2;
                    break;
                case 'crushed rock':
                    finalPrice += 90 * 1.2;
                    break;
                case 'sand':
                    finalPrice += 90 * 1.2;
                    break;
            }
            break;
        case 'trenchless':
            switch (landscape) {
                case 'dirt':
                    finalPrice += 0 * 1.2;
                    break;
                case 'pavers':
                    finalPrice += 400 * 1.2;
                    break;
                case 'asphalt':
                    finalPrice += 150 * 1.2;
                    break;
                case 'concrete':
                    finalPrice += 100 * 1.2;
                    break;
            }
            switch (bm) {
                case 'native soil':
                    finalPrice += 0 * 1.2;
                    break;
                case 'base rock':
                    finalPrice += 90 * 1.2;
                    break;
            }
            switch (pb) {
                case 'native soil':
                    finalPrice += 0 * 1.2;
                    break;
                case 'crushed rock':
                    finalPrice += 90 * 1.2;
                    break;
                case 'sand':
                    finalPrice += 90 * 1.2;
                    break;
            }
            break;
    }

    switch (permits) {
        case 'none':
            finalPrice += 0 * 1.2;
            break;
        case 'building':
            finalPrice += 350 * 1.2;
            break;
        case 'sidewalk':
            finalPrice += 900 * 1.2;
            break;
        case 'sewer':
            finalPrice += 450 * 1.2;
            break;
        case 'bas':
            finalPrice += 800 * 1.2;
            break;
    }

    if (depth > 5) {
        finalPrice += (depth - 5) * 1000 * 1.2;
    }

    finalPrice += dumping * 60 * 1.2;
    finalPrice += ed * 8 * 678 * 1.2;

    if (discount === '5%') {
        finalPrice *= 0.95;
    } else if (discount === '10%') {
        finalPrice *= 0.9;
    }

    finalPriceSpan.textContent = '$' + finalPrice.toFixed(2);
}
