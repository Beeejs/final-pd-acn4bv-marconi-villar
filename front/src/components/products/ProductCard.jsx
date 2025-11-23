import React from 'react'
import { formattedPrice } from '../../utils/helper';

const ProductCard = ({ product }) => {

  const { title, price, img } = product;

  return (
    <article class="flex flex-col justify-center items-center w-64 h-64 gap-4 bg-secondary/80 rounded-md shadow p-4 hover:scale-105 hover:bg-secondary transition-all duration-300">
      <img src={img || '/sinimagen.png'} class="w-40 h-40 rounded-md shadow" alt="Imagen Producto"/>
      <div class="flex flex-col justify-center items-center">
        <h6 className='font-secondary text-lg text-center text-primary truncate w-60'>{title}</h6>
        <p className='font-secondary font-medium text-base text-game-flame-medio'>{formattedPrice(price)}</p>
      </div>
    </article>
  )
}

export default ProductCard