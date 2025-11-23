
import { createContext, useState } from 'react';

export const FilterData = createContext({});


const FilterContext = ({ children }) =>
{
  const [dataQuery, setDataQuery] = useState(
    { 
      search: '',
      platform: '',
      genre: '',
      category: '',
      topSell: ''
    }
  );

  const handleSetFilters = (filters) =>
  {
    setDataQuery(prevDataQuery =>
    {
      return {
        ...prevDataQuery,
        ...filters
      };
    });
  };

  return (
    <FilterData.Provider value={{ dataQuery, handleSetFilters }}>
      {children}
    </FilterData.Provider>
  );
};

export default FilterContext;
