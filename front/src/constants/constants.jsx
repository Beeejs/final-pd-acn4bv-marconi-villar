/* Icons */
import HomeIcon from '@mui/icons-material/Home';
import EmailIcon from '@mui/icons-material/Email';
import SegmentIcon from '@mui/icons-material/Segment';


export const navbarLinks = [
  {
    id: 1,
    title: 'Inicio',
    url: '/',
    icon: HomeIcon
  },
  {
    id: 2,
    title: 'Contacto',
    url: '/contacto',
    icon: EmailIcon
  },
  {
    id: 3,
    title: 'Productos',
    url: '/products',
    icon: SegmentIcon
  }
];


export const carouselList = [
  {
    id: 1,
    image: '/carousel/Elden.jpg'
  },
  {
    id: 2,
    image: '/carousel/Hellblade.jpg'
  },
  {
    id: 3,
    image: '/carousel/Hellblade2.jpg'
  }
]


export const PLATFORM_OPTIONS = [
  { id: 1, value: 'all', label: 'Todas las plataformas' },
  { id: 2, value: 'PS5', label: 'PS5' },
  { id: 3, value: 'XBOX', label: 'Xbox' },
  { id: 4, value: 'Switch', label: 'Nintendo Switch' },
];

export const GENRE_OPTIONS = [
  { id: 1, value: 'all', label: 'Todos los géneros' },
  { id: 2, value: 'action', label: 'Acción' },
  { id: 3, value: 'rpg', label: 'RPG' },
  { id: 4, value: 'racers', label: 'Carreras' },
  { id: 5, value: 'adventure', label: 'Aventura' },
];

export const CATEGORY_OPTIONS = [
  { id: 1, value: 'all', label: 'Todas las categorías' },
  { id: 2, value: 'consoles', label: 'Consolas' },
  { id: 3, value: 'games', label: 'Juegos' },
];