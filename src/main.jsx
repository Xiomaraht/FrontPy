import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import ProtectedRoute from './components/Manuel/ProtectedRoute';

import './components/styles/main.css'

//importaciones de componentes principales
import LandingPageMq from './pages/LandingPageMq'
import Login from './pages/Login'
import ProductsLw from './pages/ProductsLw'
import HomePageLg from './pages/HomePageLg'
import ServicesLw from './pages/ServicesLw'
import RouteAdminGenMq from './pages/RouteAdminGenMq';
import MiPerfilXh from './pages/MiPerfilXh'
import VeterinariasMq from './pages/VeterinariasMq';
import HistorialMascotaMq from './pages/HistorialMascotaMq';
import NotFoundMq from './pages/NotFoundMq';
import ProductsItemsMq from './components/Manuel/ProductsItemsMq';
import ServicesItemsMq from './components/Manuel/ServicesItemsMq';
import MiWishListLg from './pages/MiWishListLg';
import CarritoComprasTL from './components/Tomas/CarritoComprasTL';
import NavigationAdminMq from './pages/NavigationAdminMq';
import RegisterMascotasMq from './components/Manuel/RegisterMascotasMq';

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
        <ProtectedRoute allowedRoles={['ROLE_ADMIN','ROLE_CUSTOMER']}>
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
        <ProtectedRoute allowedRoles={['ROLE_ADMIN']}>
          <NavigationAdminMq/> // Ruta Manuel
        </ProtectedRoute>
      },  
      { path: '*', element: <NotFoundMq/>}
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={rutas}/>
  </StrictMode>,
)
