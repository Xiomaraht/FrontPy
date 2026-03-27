import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import ProtectedRoute from '@/components/common/ProtectedRoute';

import '@/components/styles/main.css'

//importaciones de componentes principales
import LandingPageMq from '@/pages/public/LandingPageMq'
import Login from '@/pages/public/Login'
import ProductsLw from '@/pages/public/ProductsLw'
import HomePageLg from '@/pages/public/HomePageLg'
import ServicesLw from '@/pages/public/ServicesLw'
import RouteAdminGenMq from '@/pages/adminGeneral/RouteAdminGenMq';
import MiPerfilXh from '@/pages/dueño_mascota/MiPerfilXh'
import VeterinariasMq from '@/pages/public/VeterinariasMq';
import HistorialMascotaMq from '@/pages/dueño_mascota/HistorialMascotaMq';
import NotFoundMq from '@/pages/public/NotFoundMq';
import ProductsItemsMq from '@/components/vetAdmin/ProductsItemsMq';
import ServicesItemsMq from '@/components/vetAdmin/ServicesItemsMq';
import MiWishListLg from '@/pages/dueño_mascota/MiWishListLg';
import CarritoComprasTL from '@/components/dueño_mascota/CarritoComprasTL';
import NavigationAdminMq from '@/pages/vetAdmin/NavigationAdminMq';
import RegisterMascotasMq from '@/components/common/RegisterMascotasMq';
import AgendarCitaMq from '@/pages/dueño_mascota/AgendarCitaMq';

const rutas = createBrowserRouter([
      { path:'/', element:<LandingPageMq/>},
      { path:'/home', element:<HomePageLg/>},
      { path:'/auth/login', element:<Login />},
      { path:'/registerPet', element:<RegisterMascotasMq/>},
      { path:'/products', element:<ProductsLw/>},
      { path:'/products/:productid', element:<ProductsItemsMq/>}, 
      { path:'/ingresoAdmin', element:
        <ProtectedRoute allowedRoles={['ROLE_ADMIN']}>
          <RouteAdminGenMq/>
        </ProtectedRoute>
      },
      { path:'/servicios', element:<ServicesLw />},
      { path:'/servicios/:serviceid', element:<ServicesItemsMq />}, 
      { path:'/agendar-cita/:serviceid', element:
        <ProtectedRoute allowedRoles={['ROLE_ADMIN','ROLE_CUSTOMER']}>
          <AgendarCitaMq />
        </ProtectedRoute>
      },
      { path:'/miperfil/:sectionBack' ,element:
        <ProtectedRoute allowedRoles={['ROLE_ADMIN','ROLE_CUSTOMER']}>
          <MiPerfilXh />
        </ProtectedRoute>
      },
      { path:'/miperfil' ,element:
        <ProtectedRoute allowedRoles={['ROLE_ADMIN','ROLE_CUSTOMER']}>
          <MiPerfilXh />
        </ProtectedRoute>
      },
      { path:'/veterinarias', element:<VeterinariasMq/>},
      { path:'/historial', element:
        <ProtectedRoute allowedRoles={['ROLE_ADMIN','ROLE_CUSTOMER','ROLE_VETERINARIAN','VETERINARIO']}>
          <HistorialMascotaMq/>
        </ProtectedRoute>
      },
      { path:'/wishlist', element:
        <ProtectedRoute allowedRoles={['ROLE_ADMIN','ROLE_CUSTOMER']}>
          <MiWishListLg/>
        </ProtectedRoute>
      },
      { path:'/cart', element:
        <ProtectedRoute allowedRoles={['ROLE_ADMIN','ROLE_CUSTOMER']}>
          <CarritoComprasTL/>
        </ProtectedRoute>  
      },
      { path: '/adminClient', element:
        <ProtectedRoute allowedRoles={['ROLE_ADMIN', 'ROLE_VETERINARIAN']}>
          <NavigationAdminMq/> // Ruta Manuel
        </ProtectedRoute>
      },  
      { path: '*', element: <NotFoundMq/>}
]);

import { CartProvider } from '@/context/CartContext';
import { WishlistProvider } from '@/context/WishlistContext';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CartProvider>
      <WishlistProvider>
        <RouterProvider router={rutas}/>
      </WishlistProvider>
    </CartProvider>
  </StrictMode>,
)
