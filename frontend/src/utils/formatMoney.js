export default function formatMoney(money, currency, prefix = true) {
    const formatter = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: currency
    });
    var response = formatter.format(money);

    if (prefix == false) {
        return response.replace(/[^\d.,-]/g, '');
    }
    return response;
}