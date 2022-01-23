export default function CurrencyFormatter(val, decimal) {
    if (!val || val === "") return 0
    val = Number(val)
    return (val).toFixed(decimal).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}