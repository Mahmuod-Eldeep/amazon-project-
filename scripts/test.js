import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js'

 // Function to check if a given date is a weekend
function isWeekend(date) {
    const dayName = date.format('dddd');
    return dayName === 'Saturday' || dayName === 'Sunday';
}

// Test the function
const date1 = dayjs('2025-01-11'); // Example Saturday
const date2 = dayjs('2025-01-12'); // Example Sunday
const date3 = dayjs('2025-01-10'); // Example Friday

console.log(`Is ${date1.format('dddd')} a weekend?`, isWeekend(date1)); // true
console.log(`Is ${date2.format('dddd')} a weekend?`, isWeekend(date2)); // true
console.log(`Is ${date3.format('dddd')} a weekend?`, isWeekend(date3)); // false
