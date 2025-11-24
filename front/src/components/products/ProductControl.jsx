import { useContext } from 'react';
/* Components */
import ProductFilters from './ProductFilter';
import Loader from '../Loader';
/* Context */
import { ProductData } from '../../context/ProductContext';
import { FilterData } from '../../context/FilterContext';

const ProductControl = () => {
  const { totalProducts } = useContext(ProductData);
  const { dataQuery } = useContext(FilterData);

  return (
    <aside className='flex flex-col justify-between items-start gap-12 lg:gap-0 lg:items-center h-full w-full my-12 lg:flex-row'>
      <div className="flex flex-col justify-center items-start gap-2 lg:gap-4">
        <p className="text-base font-secondary text-primary">Busqueda: <span className="text-game-flame-medio">{dataQuery.search || 'Ninguna'}</span></p>
        <p className="text-base font-secondary text-primary">Resultados: <span className="text-game-flame-medio">{totalProducts}</span></p>
      </div>
      <div className="flex flex-col justify-center items-end gap-4">
        <ProductFilters/>
      </div>
    </aside>
  )
}

export default ProductControl