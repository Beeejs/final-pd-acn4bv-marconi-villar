/* Hooks */
import { useEffect, useState } from 'react'
/* Components */
import ProductCard from './ProductCard';
import Loader from '../Loader';

const ProductList = ({ title, responseData }) => {

  console.log(responseData)

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000)
  }, [])

  return (
    <aside className='flex flex-col justify-center items-center gap-8 h-full w-full bg-secondary/60 p-8 rounded-md'>
      <h2 className='text-xl font-secondary font-medium text-primary text-center mx-auto'>{title}</h2>
      <div className={`flex ${ loading ? 'justify-center' : responseData?.length >= 4 ? 'justify-center' : 'justify-start' } flex-wrap items-center gap-6 h-full w-full`}>
        {

          loading
          ? <Loader width={'80px'} height={'80px'} borderWidth={'6px'}/>
          : 
            (
              responseData?.length > 0
              ? 
              (
                responseData.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))
              )
              : <h3 className='text-lg font-secondary font-medium text-game-flame-medio text-center mx-auto'>¡No se encontraron productos!</h3>
            )            
        }
      </div>
    </aside>
  )
}

export default ProductList
