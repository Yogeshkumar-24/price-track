import HeroCarousal from "@/components/HeroCarousal"
import ProductCard from "@/components/ProductCard"
import Searchbar from "@/components/Searchbar"
import { getAllProuducts } from "@/lib/actions"
import Image from "next/image"

const Home = async () => {
  const allProducts = await getAllProuducts();
  return (
    <>
      <section className=" md:px-20 py-24 px-6">
        <div className="flex max-xl:flex-col gap-16">
          <div className="flex flex-col justify-center">
              <p className="flex px-2 text-sky-400">
                Smart shoping starts here: 
                <Image 
                  className=" dark:invert ml-2"
            
                  src= '/assets/icons/arrow-right.svg'
                  alt="arrow-right"
                  width={16}
                  height={16}
                />
              </p>
              <h1 className="head-text">
                Think Smart! <br /> 
                Shop Smart! <br />
                Use Price<span className="text-sky-400">Track</span>
              </h1>
              <p className="mt-6">
                Powerful, self-serve product and growth analytics to help you
                convert, engage, and retain more.
              </p>
              <Searchbar />
          </div>
          <HeroCarousal />
        </div>
      </section>
      <section className="trending-section">
        <h2 className="section-text">Trending</h2>
        <div className="flex flex-wrap gap-x-8 gap-y-16">
          {allProducts?.map((product) => (
            <ProductCard key={product._id } product={product} />
          ))
          
          }
        </div>
      </section>
    </>
  )
}
export default Home