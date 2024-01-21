export const formatFullDate = (date: Date) => {
    const monthName = date.toLocaleString('pl', {month: 'long'});
    const capitalizedMonth = monthName.charAt(0).toUpperCase() + monthName.slice(1);
    const year = date.getFullYear();
    return `${capitalizedMonth} ${year}`;
};