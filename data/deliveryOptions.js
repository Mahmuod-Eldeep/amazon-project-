import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';

export const deliveryOptions = [{
    id: '1',
    deliveryDays: 7,
    priceCents: 0
}, {
    id: '2',
    deliveryDays: 3,
    priceCents: 499
}, {
    id: '3',
    deliveryDays: 1,
    priceCents: 999
}];




 export function getDeliveryOptionById(deliveryOptionId) {
    let deliveryOption;

    deliveryOptions.forEach((option) => {
        if (option.id === deliveryOptionId) {
            deliveryOption = option;
        }
    });

    return deliveryOption || deliveryOptions[0]; ;
}



function isWeekend(date) {
  const dayOfWeek = date.day();
  return dayOfWeek === 0 || dayOfWeek === 6; // 0 = Saturday, 6 = Sunday
}




export function calculateDeliveryDate(deliveryOption) {
  const today = dayjs();
let remainingDays = deliveryOption.deliveryDays;
let deliveryDate = today;




while(remainingDays > 0) {
    deliveryDate = deliveryDate.add(1, 'day');
    if(!isWeekend(deliveryDate)) {
        remainingDays--;
    }
  }
  
  const dateString = deliveryDate.format(
    'dddd, MMMM D'
  );

  return dateString;
}