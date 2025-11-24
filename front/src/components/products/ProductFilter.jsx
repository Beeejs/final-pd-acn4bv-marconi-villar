// ProductFilters.jsx

/* Hooks */
import { useContext, useState } from 'react';
/* MUI */
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
/* Context */
import { FilterData } from '../../context/FilterContext';
/* Constants */
import { PLATFORM_OPTIONS, GENRE_OPTIONS, CATEGORY_OPTIONS } from '../../constants/constants';

const ProductFilters = () => {
  // Contexto
  const { handleSetFilters } = useContext(FilterData);
  // Estados
  const [filters, setFilters] = useState({});

  const handleChange = (field) => (event) => {
    const value = event.target.value;
    setFilters({ ...filters, [field]: value === 'all' ? '' : value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSetFilters(filters);
  };

  return (
    <form
      className="flex flex-row justify-center md:justify-end items-stretch gap-4 w-full flex-wrap lg:flex-nowrap"
      onSubmit={handleSubmit}
    >
      {/* Plataforma */}
      <Box sx={{ minWidth: 160 }} className="max-w-sm mx-auto w-full">
        <FormControl fullWidth size="small">
          <InputLabel id="platform-label">Plataforma</InputLabel>
          <Select
            labelId="platform-label"
            id="platform"
            value={filters.platform || 'all'}
            label="Plataforma"
            onChange={handleChange('platform')}
          >
            {PLATFORM_OPTIONS.map((opt) => (
              <MenuItem key={opt.id} value={opt.value}>
                {opt.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {/* Género */}
      <Box sx={{ minWidth: 160 }} className="max-w-sm mx-auto w-full">
        <FormControl fullWidth size="small">
          <InputLabel id="genre-label">Género</InputLabel>
          <Select
            labelId="genre-label"
            id="genre"
            value={filters.genre || 'all'}
            label="Género"
            onChange={handleChange('genre')}
          >
            {GENRE_OPTIONS.map((opt) => (
              <MenuItem key={opt.id} value={opt.value}>
                {opt.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {/* Categoría */}
      <Box sx={{ minWidth: 160 }} className="max-w-sm mx-auto w-full">
        <FormControl fullWidth size="small">
          <InputLabel id="category-label">Categoría</InputLabel>
          <Select
            labelId="category-label"
            id="category"
            value={filters.category || 'all'}
            label="Categoría"
            onChange={handleChange('category')}
          >
            {CATEGORY_OPTIONS.map((opt) => (
              <MenuItem key={opt.id} value={opt.value}>
                {opt.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {/* Botónes */}
      <div className="flex justify-center items-cente gap-4 mx-auto w-full">
        <button
          type="submit"
          className='cursor-pointer font-secondary text-base bg-gray-500 hover:bg-gray-700 transition-colors duration-300 text-white px-4 rounded-md p-1'
        >
          Aplicar
        </button>
        <button
          type="button"
          className='cursor-pointer font-secondary text-base bg-gray-500 hover:bg-gray-700 transition-colors duration-300 text-white px-4 rounded-md p-1'
          onClick={() => {
            setFilters({});
            handleSetFilters({ search: '', platform: '', genre: '', category: '', topSell: '' });
          }}
        >
          Limpiar
        </button>
      </div>
    </form>
  );
};

export default ProductFilters;
