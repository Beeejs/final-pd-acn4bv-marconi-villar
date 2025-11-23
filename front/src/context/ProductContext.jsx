
import { createContext, useState } from 'react';

export const ProductData = createContext({});


const ProductContext = ({ children }) =>
{
  const [totalProducts, setTotalProducts] = useState(0);

  return (
    <ProductData.Provider value={{ totalProducts, setTotalProducts }}>
      {children}
    </ProductData.Provider>
  );
};

export default ProductContext;
