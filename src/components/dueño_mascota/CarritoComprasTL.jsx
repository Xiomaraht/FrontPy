import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { Link } from "react-router-dom";
import "@/components/styles/CarritoComprasTL.css";
import HeaderLg from "@/components/common/HeaderLg";
import FooterLg from "@/components/common/FooterLg";
import Titulo from "@/components/dueño_mascota/TituloCarritoTL";
import ListaProductos from "@/components/dueño_mascota/ListaProductosTL";
import ResumenCompra from "@/components/dueño_mascota/ResumenCarritoTL";
import VaciarCarrito from "@/components/dueño_mascota/VaciarCarritoTL";
import FormaEntrega from "@/components/dueño_mascota/FormaEntregaCarritoTL";
import NuevoDomicilio from "@/components/dueño_mascota/NuevoDomiciloTL";
import FechaEnvio from "@/components/dueño_mascota/FechaEnvioTL"; 
import MetodoPago from "@/components/dueño_mascota/MetodoPagoTL"; 
import PedidoListo from "@/components/dueño_mascota/PedidoListoTL"; 

const STEPS = {
    CART: 'cart',
    DELIVERY: 'delivery',
    ADDRESS: 'address',
    DATE: 'date',
    PAYMENT: 'payment',
    CONFIRMATION: 'confirmation',
};

export default function CarritoComprasTL() {

    const [step, setStep] = useState(STEPS.CART); 

    const { cart: productos, increaseQuantity: aumentar, decreaseQuantity: disminuir, clearCart: vaciar } = useCart();

    const subtotal = productos.reduce((acc, p) => acc + p.precioUnit * p.cantidad, 0);

    const goToDelivery = () => {
        setStep(STEPS.DELIVERY);
    };

    const goToAddress = () => {
        setStep(STEPS.ADDRESS);
    };

    const goToDate = () => {
        setStep(STEPS.DATE)
    };

    const [direccion, setDireccion] = useState(''); 

    const goToPayment = () => {
        setStep(STEPS.PAYMENT)
    };

    const goToConfirmation = () => {
        setStep(STEPS.CONFIRMATION)
    };
    
    let CurrentView;

    if (step === STEPS.CART) {
        CurrentView = (
            <>
                <Titulo />
                <div className="contenedor">
                    <ListaProductos productos={productos} aumentar={aumentar} disminuir={disminuir}/>
                    <div className="cart-actions-column">
                        <ResumenCompra productos={productos} subtotal={subtotal} goToNextStep={goToDelivery} isDeliveryView={false}/>
                        <Link to="/products" className="btn-view-more">Ver más productos</Link>
                    </div>
                </div>
                {productos.length > 0 && <VaciarCarrito vaciar={vaciar} />}
            </>
        );
    } else if (step === STEPS.DELIVERY) {
        // Vista 2: Forma de Entrega
        CurrentView = (
            <FormaEntrega productos={productos} subtotal={subtotal} goToNextStep={goToAddress}/>
        );
    } else if (step === STEPS.ADDRESS) {
        // Vista 3: Detalles del Domicilio
        CurrentView = (
            <NuevoDomicilio productos={productos} subtotal={subtotal} setDireccionPrincipal={setDireccion} goToNextStep={goToDate}/>
        );
    } else if (step === STEPS.DATE){
        // vista 4: Fecha de envio
        CurrentView = (
            <FechaEnvio productos={productos} subtotal={subtotal} direccionSeleccionada={direccion} goToNextStep={goToPayment}/>
        )
    } else if (step === STEPS.PAYMENT){
        CurrentView = (
            <MetodoPago productos={productos} subtotal={subtotal} goToNextStep={goToConfirmation}/>
        )
    } else if (step === STEPS.CONFIRMATION){
        CurrentView = (
            <PedidoListo productos={productos} subtotal={subtotal}/>
        )
    }
    
    return (
        <div className="page-layout"> 
            <HeaderLg />
            <div className="body">
                {CurrentView} 
            </div>
            <FooterLg />
        </div>
    );
}