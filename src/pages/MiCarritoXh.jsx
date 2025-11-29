import HeaderLg from '../components/Laura/HeaderLg'
import FooterLg from '../components/Laura/FooterLg'
import CarritoXh from '../src/components/Xiomara/CarritoXh'
import '../src/components/styles/MiCarritoXh.css'
import '../src/components/styles/FormEntXh.css'
import '../src/components/styles/DireccionXh.css'

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