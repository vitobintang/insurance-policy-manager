export const formatToRupiah = (number) => {
  if (!number) return 'Rp 0';
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(number)
    .replace('IDR', 'Rp');
};

export const parseRupiahToNumber = (rupiahString) => {
  if (!rupiahString) return '';
  return rupiahString.replace(/[^0-9]/g, '');
};