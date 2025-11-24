/* Components */
import Carousel from "../components/Carousel"
import ProductList from "../components/products/ProductList"


const Home = () => {

  return (
    <section className='flex flex-col justify-center items-center h-full gap-24'>
      <Carousel/>
      <ProductList title={'Los Más Vendidos'} filters={{topSell: true}}/>
      <ProductList title={'Consolas'} filters={{category: 'consoles'}}/>
    </section>
  )
}

export default Home