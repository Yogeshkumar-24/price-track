import { PriceHistoryItem, Product } from "@/types";



const Notification = {
  WELCOME: 'WELCOME',
  CHANGE_OF_STOCK: 'CHANGE_OF_STOCK',
  LOWEST_PRICE: 'LOWEST_PRICE',
  THRESHOLD_MET: 'THRESHOLD_MET',
}

const THRESHOLD_PERCENTAGE = 40;

export function extractPrice(...elements : any){
    for(const element of elements){
        const priceText = element.text().trim();

        if(priceText){
            return priceText.replace(/[^0-9.]/g, '');
        }
        
    }
    return ''
}


export function extractCount(...elements : any){
    for(const element of elements){
        const priceText = element.text().trim();

        if(priceText){
            return priceText.replace(/[^0-9.]/g, '');
        }
        
    }
    return ''
}

// export function extractStar(...elements: any) {
//   for (const element of elements) {
//       const priceText = element.text().trim();
//       const numberMatch = priceText.match(/[0-9.]+/);

//       if (numberMatch) {
//           return numberMatch[0];
//       }
//   }
//   return '';
// }

export function extractStar(...elements: any) {
  for (const element of elements) {
      const text = element.text().trim();

      if (text) {
          const decimalMatch = text.match(/[0-9]+(\.[0-9]+)?/);

          if (decimalMatch) {
              return decimalMatch[0];
          }
      }
  }
  return '';
}

export function extractLike(...elements: any) {
  for (const element of elements) {
      const text = element.text().trim();

      if (text) {
          const percentageMatch = text.match(/[0-9]+%/);

          if (percentageMatch) {
              const numberWithoutPercentage = percentageMatch[0].replace(/%/, '');
              return numberWithoutPercentage;
          }
      }
  }
  return '';
}


export function extractCurrency(element : any){
    const currencyText = element.text().trim().slice(0,1);
    return currencyText ? currencyText : ''
}



export function getHighestPrice(priceList: PriceHistoryItem[]) {
    let highestPrice = priceList[0];
  
    for (let i = 0; i < priceList.length; i++) {
      if (priceList[i].price > highestPrice.price) {
        highestPrice = priceList[i];
      }
    }
  
    return highestPrice.price;
  }

export function getLowestPrice(priceList: PriceHistoryItem[]) {
    let lowestPrice = priceList[0];
  
    for (let i = 0; i < priceList.length; i++) {
      if (priceList[i].price < lowestPrice.price) {
        lowestPrice = priceList[i];
      }
    }
  
    return lowestPrice.price;
  }
  
  export function getAveragePrice(priceList: PriceHistoryItem[]) {
    const sumOfPrices = priceList.reduce((acc, curr) => acc + curr.price, 0);
    const averagePrice = sumOfPrices / priceList.length || 0;
  
    return averagePrice;
  }

  export const formatNumber = (num: number = 0) => {
    return num.toLocaleString(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
  };



  export const getEmailNotifType = (
    scrapedProduct: Product,
    currentProduct: Product
  ) => {
    const lowestPrice = getLowestPrice(currentProduct.priceHistory);
  
    if (scrapedProduct.currentPrice < lowestPrice) {
      return Notification.LOWEST_PRICE as keyof typeof Notification;
    }
    if (!scrapedProduct.isOutOfStock && currentProduct.isOutOfStock) {
      return Notification.CHANGE_OF_STOCK as keyof typeof Notification;
    }
    if (scrapedProduct.discountRate >= THRESHOLD_PERCENTAGE) {
      return Notification.THRESHOLD_MET as keyof typeof Notification;
    }
  
    return null;
  };