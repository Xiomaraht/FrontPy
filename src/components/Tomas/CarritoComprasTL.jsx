import { useState } from "react";
import "../styles/CarritoComprasTL.css";
import HeaderLg from "../Laura/HeaderLg";
import FooterLg from "../Laura/FooterLg";
import Titulo from "./TituloCarritoTL";
import ListaProductos from "./ListaProductosTL";
import ResumenCompra from "./ResumenCarritoTL";
import VaciarCarrito from "./VaciarCarritoTL";
import FormaEntrega from "./FormaEntregaCarritoTL";
import NuevoDomicilio from "./NuevoDomiciloTL";
import FechaEnvio from "./FechaEnvioTL"; 
import MetodoPago from "./MetodoPagoTL"; 
import PedidoListo from "./PedidoListoTL"; 

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

    const [productos, setProductos] = useState([
        { id: 1, nombre: "Nombre Producto", peso: "Peso producto", precioUnit: 20000, cantidad: 1 },
        { id: 2, nombre: "Nombre Producto", peso: "Peso producto", precioUnit: 15000, cantidad: 1 },
        { id: 3, nombre: "Nombre Producto", peso: "Peso producto", precioUnit: 41000, cantidad: 1 },
    ]);

    const aumentar = (id) => {
        setProductos(productos.map(p => 
            p.id === id ? { ...p, cantidad: p.cantidad + 1 } : p
        ));
    };

    const disminuir = (id) => {
        setProductos(productos.map(p => 
            p.id === id && p.cantidad > 1 ? { ...p, cantidad: p.cantidad - 1 } : p
        ));
    };

    const vaciar = () => {
        setProductos([]);
    };

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
                    <ResumenCompra productos={productos} subtotal={subtotal} goToNextStep={goToDelivery} isDeliveryView={false}/>
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