import '../styles/ContenidoAdminGeneralMq.css'

export default function ContenidoAdminGeneralMq({tituloReporte, buttonOne, buttonTwo, alterButton}) {
    return (
        <div className="contendorPrincipalAdGen-Mq">
            <h1>{tituloReporte}</h1>
            <div className="contenedorBotonesAdGen-Mq">
                <div className="iconButtonAdGen-Mq">
                    <i class="bi bi-box-arrow-up"></i>
                    <button>{buttonOne}</button>
                </div>
                <div className="iconButtonAdGen-Mq">
                    <i class="bi bi-eye"></i>
                    <button>{buttonTwo}</button>
                </div>
            </div>
            <div className='contHistorialReportesAdGen-Mq'>
                <i class="bi bi-arrow-left-circle"></i>
                <strong>{alterButton}</strong>
            </div>
        </div>
    )
}
