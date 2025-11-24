/* Hooks */
import { useContext, useEffect } from 'react'
import { useGetData } from '../../hooks/useGetData';
/* React router dom */
import { useLocation } from 'react-router-dom';
/* Components */
import ProductCard from './ProductCard';
import Loader from '../Loader';
/* Context */
import { FilterData } from '../../context/FilterContext';
import { ProductData } from '../../context/ProductContext';

const ProductList = ({ title, filters }) => {
  // Contextos
  const { dataQuery } = useContext(FilterData)
  const { setTotalProducts } = useContext(ProductData);
  // Hooks
  const { action, responseData, loading } = useGetData();
  const location = useLocation();

  // Pegamos a productos
  useEffect(() => {
    if(filters || dataQuery){
      action(`/products/getAll?${new URLSearchParams(filters || dataQuery).toString()}`);
    }
  }, [filters, dataQuery]);

  // Guardamos totales y estado de carga para usarlo en el productControl
  useEffect(() => {
    if(!responseData && location.pathname  === '/') return;
    setTotalProducts(responseData?.data?.length || 0);
  }, [responseData])

  return (
    <aside className='flex flex-col justify-center items-center gap-8 h-full w-full bg-secondary/60 p-8 rounded-md'>
      <h2 className='text-xl font-secondary font-medium text-primary text-center mx-auto'>{title}</h2>
      <div className={`flex ${ loading ? 'justify-center' : responseData?.data?.length >= 4 ? 'justify-center' : 'justify-start' } flex-wrap items-center gap-6 h-full w-full`}>
        {

          loading
          ? <Loader width={'80px'} height={'80px'} borderWidth={'6px'}/>
          : 
            (
              responseData?.data?.length > 0
              ? 
              (
                responseData.data.map(product => (
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
