// eslint-disable-next-line no-unused-vars
export default function timeLocale(number, index, totalSec) {
  return [
    ['just now', 'right now'],
    ['%ss', 'in %s seconds'],
    ['1m', 'in 1 minute'],
    ['%sm', 'in %s minutes'],
    ['1h', 'in 1 hour'],
    ['%sh', 'in %s hours'],
    ['1d', 'in 1 day'],
    ['%sd', 'in %s days'],
    ['1w', 'in 1 week'],
    ['%sw', 'in %s weeks'],
    ['4w', 'in 1 month'],
    [`${number * 4}w`, 'in %s months'],
    ['1y', 'in 1 year'],
    ['%sy', 'in %s years'],
  ][index];
}
