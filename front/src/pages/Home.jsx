/* Components */
import Carousel from "../components/Carousel"
import ProductList from "../components/products/ProductList"


const Home = () => {

    // MOCK Datos de Consolas
  const CONSOLES_DATA = [
    {
      "category": "consoles",
      "description": "Consola XBOX Series S",
      "img": "",
      "price": 1400000,
      "status": true,
      "title": "Xbox Series S",
      "topSell": false
    },
    {
      "category": "consoles",
      "description": "Consola Nintendo Switch OLED, color blanco.",
      "img": "",
      "price": 1850000,
      "status": true,
      "title": "Nintendo Switch OLED",
      "topSell": false
    },
    {
      "category": "consoles",
      "description": "Consola PlayStation 5 con lector de discos.",
      "img": "",
      "price": 2800000,
      "status": true,
      "title": "PlayStation 5",
      "topSell": false
    }
  ];

  // MOCK Datos de Productos Destacados (Top Sellers)
  const TOP_SELLERS_DATA = [
    {
      "category": "games",
      "description": "Juego de PS5, versión remasterizada.",
      "genre": "adventure",
      "img": "",
      "platform": "PS5",
      "price": 190000,
      "status": true,
      "title": "The Last of Us Part II Remastered",
      "topSell": true
    },
    {
      "category": "accessories",
      "description": "Mando inalámbrico DualSense para PS5, color Midnight Black.",
      "img": "",
      "price": 350000,
      "status": true,
      "title": "DualSense - Midnight Black",
      "topSell": true
    },
    {
      "category": "games",
      "description": "Juego de aventura en mundo abierto para Xbox Series X/S.",
      "genre": "RPG",
      "img": "",
      "platform": "Xbox Series X/S",
      "price": 250000,
      "status": true,
      "title": "Starfield",
      "topSell": true
    },
    {
      "category": "accessories",
      "description": "Tarjeta de memoria microSD de 128GB para Nintendo Switch.",
      "img": "",
      "price": 120000,
      "status": true,
      "title": "MicroSD 128GB para Switch",
      "topSell": true
    }
  ];

  return (
    <section className='flex flex-col justify-center items-center h-full gap-24'>
      <Carousel/>
      <ProductList title={'Los Más Vendidos'} responseData={CONSOLES_DATA}/>
      <ProductList title={'Consolas'} responseData={TOP_SELLERS_DATA}/>
    </section>
  )
}

export default Home