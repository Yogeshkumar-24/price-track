"use client"

import { scrapeAndStoreProduct } from '@/lib/actions'
import { error } from 'console'
import React, { useState , FormEvent} from 'react'

const Searchbar = () => {

    const [searchPrompt, setSearchPrompt] = useState('')
    const [isLoding , setIsLoading] = useState(false)

    const isValidAmazonProductURL = (url: string) => {
        try{
            const parsedUrl = new URL(url);
            const hostName = parsedUrl.hostname;

            if(hostName.includes('amazon.in')){
                return true
            }
        }
        catch (error){

        }
        return false;
    }

    const handleSubmit = async (event: FormEvent<HTMLFormElement> ) => {
        event.preventDefault();
        
        const isValidLink = isValidAmazonProductURL(searchPrompt);
        if( !isValidLink){
            return alert('Please provide the valid Amazon Link')
        }

        try{
            setIsLoading(true)
            const product = await scrapeAndStoreProduct(searchPrompt)
        }
        catch(error){

        }
        finally{
            setIsLoading(false)
        }
    }
  return (
    <form 
    className='flex flex-wrap gap-4 mt-16' 
    onSubmit={handleSubmit}
    >
        <input 
        type="text" 
        placeholder='Enter the product Link' 
        className='searchbar-input'
        value={searchPrompt}
        onChange={(e) => setSearchPrompt(e.target.value) }
        />
        <button type='submit' className='searchbar-btn' disabled = {searchPrompt === ''}>
            {isLoding? 'Searching...' : 'Search'}
        </button>
    </form>
  )
}

export default Searchbar