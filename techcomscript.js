document.addEventListener('DOMContentLoaded', function() {
    const calculateBtn = document.getElementById('calculateBtn');
    calculateBtn.addEventListener('click', calculateCommission);

    calculateCommission(); // Calculate commission when the page loads
});

function calculateCommission() {
    const tp = parseFloat(document.getElementById('tp').value) || 0;
    const material = parseFloat(document.getElementById('material').value) || 0;
    const day1 = parseFloat(document.getElementById('day1').value) || 0;
    const day2 = parseFloat(document.getElementById('day2').value) || 0;
    const day3 = parseFloat(document.getElementById('day3').value) || 0;
    const day4 = parseFloat(document.getElementById('day4').value) || 0;
    const day5 = parseFloat(document.getElementById('day5').value) || 0;
    const ah = parseFloat(document.getElementById('ah').value) || 0;
    const toh = parseFloat(document.getElementById('toh').value) || 0;
    const pd = parseFloat(document.getElementById('pd').value) || 0;
    
    const totalHours = day1 + day2 + day3 + day4 + day5 + ah + (1.5 * toh);
    document.getElementById('totalHours').value = totalHours;

    const grossAmount = tp - (material * 1.2) - (totalHours * 75);
    const finalPrice = 0.21191 * grossAmount;
    const grossProfit = grossAmount - finalPrice;
    const overheads = pd * 246;
    const profit = grossAmount - finalPrice - overheads + (material * 1.2 * 0.1667) + (totalHours * 75 * 0.4);
    
    let profper = 0;
    if (tp !== 0) {
        profper = ((profit / tp) * 100).toFixed(2);
    }

    const t1 = 0.21 * grossProfit;
    const t2 = 0.151011 * grossProfit;
    const t3 = 0.099331 * grossProfit;
    const t4 = "$18 Per Hour";
    const sw = ((material * 1.2) / tp) || 0;
    const wh = (material * 1.2) / tp || 0;
    const rd = (material * 1.2) / tp || 0;
    const rp = (material * 1.2) / tp || 0;

    document.getElementById('finalPrice').textContent = '$' + finalPrice.toFixed(2);
    document.getElementById('t1').value = '$' + t1.toFixed(2);
    document.getElementById('t2').value = '$' + t2.toFixed(2);
    document.getElementById('t3').value = '$' + t3.toFixed(2);
    document.getElementById('t4').value = t4;
    document.getElementById('sw').value = sw.toFixed(2);
    document.getElementById('wh').value = wh.toFixed(2);
    document.getElementById('rd').value = rd.toFixed(2);
    document.getElementById('rp').value = rp.toFixed(2);
}
