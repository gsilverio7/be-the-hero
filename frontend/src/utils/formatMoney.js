export default function formatMoney(money, currency) {
    const formatter = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: currency
    });

    return formatter.format(money);
}
