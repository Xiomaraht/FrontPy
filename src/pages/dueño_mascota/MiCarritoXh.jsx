import HeaderLg from '@/components/common/HeaderLg'
import FooterLg from '@/components/common/FooterLg'
import CarritoXh from '@/components/dueño_mascota/CarritoXh'
import '@/pages/src/components/styles/MiCarritoXh.css'
import '@/pages/src/components/styles/FormEntXh.css'
import '@/pages/src/components/styles/DireccionXh.css'

export default function MiPerfilXh() {
  return (
        <>
            <HeaderLg />
            <div>
              <CarritoXh/>
            </div>
            <FooterLg />
        </>
  )
}