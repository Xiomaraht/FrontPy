import { Link } from "react-router-dom";
import '@/components/styles/NotFoundMq.css'

export default function NotFoundMq() {
    return (
        <div className="containerNf-Mq">
            <h1>Pagina no encontrada 😒</h1>
            <Link to={'/'}>
                <button className="buttonNf-Mq">Vuelva al inicio</button>
            </Link>

        </div>
    )
}
