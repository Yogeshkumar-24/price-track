import axios from "axios";
import cheerio from 'cheerio';
import { extractCount, extractCurrency, extractLike, extractPrice, extractStar } from "../util";
import { json } from "stream/consumers";

export async function scrapeAmazonProduct (url : string){
    if(!url){
        return 
    }
    //brightData proxy configuration
    const username = String(process.env.BRIGHT_DATA_USERNAME);
    const password = String(process.env.BRIGHT_DATA_PASSWORD);
    const port = 22225
    const session_id  = (1000000 * Math.random()) | 0;
    const options = {
        auth : {
            username: `${username}-session-${session_id}`,
            password,
        },
        host: 'brd.superproxy.io',
        port, 
        rejectUnauthorized: false
    }
    try {
        const response = await axios.get(url, options);
        const $ = cheerio.load(response.data)
        const title = $('#productTitle').text().trim()
        const currentPrice = extractPrice(
            $('.priceToPay span.a-price-whole'),
            $('a.size.base.a-color-base'),
            $('.a-button-selected .a-color-base'),
            
        )

        const originalPrice = extractPrice(
            $('.a-price.a-text-price span.a-offscreen'),
            $('#priceblock_ourprice'),
            $('#listPrice'),
            $('#priceblock_dealprice'),
            $('.a-size-base.a-color-price')
        )

        const outOfStock = $('#availability span').text().trim().toLowerCase() === 'currently unavailable'

        const images = $('#imgBlkFront').attr('data-a-dynamic-image') ||
                      $('#landingImage').attr('data-a-dynamic-image')||
                      '{}'

        const imagesUrl = Object.keys(JSON.parse(images))
        const currency = extractCurrency($('.a-price-symbol'))

        const discountRate = $('.savingsPercentage').text().replace(/[-%]/g,'')

        const review = extractCount(
            $('#acrCustomerReviewText.a-size-base'),
            
        )

        const star = extractStar(

            $('.a-size-base.a-color-base')
        )
        
        const like = extractLike(
            $('.a-size-base.a-link-normal')
            )
            
            // console.log({star,like})
        const data = {
            url,
            currency: currency || '₹',
            image : imagesUrl[0],
            title ,
            currentPrice : Number(currentPrice) || Number(originalPrice),
            originalPrice : Number(originalPrice) || Number(currentPrice),
            priceHistory:  [
                { price: currentPrice }
              ],
            discountRate : Number(discountRate),
            category: 'category',
            reviewsCount : Number(review),
            stars: Number(star),
            likes: Number(like),
            isOutOfStock : outOfStock,
            lowestPrice : Number(currentPrice) || Number(originalPrice),
            highestPrice : Number(originalPrice) || Number(currentPrice),
            averagePrice : Number(currentPrice) || Number(originalPrice)
        }

        return data;
    
    } catch (error: any) {
        Error(`Failed to scrape the product: ${error}`)
    }
}