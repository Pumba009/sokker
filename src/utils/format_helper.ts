/**
 * Formatuje liczbę, dodając spacje jako separatory tysięcy (np. 1 425 000).
 */
export function formatNumber(num: number): string {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}
