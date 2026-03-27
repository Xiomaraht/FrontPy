import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import '@/components/styles/VeterinariasMq.css'
import BannerLw from '@/components/common/BannerLw'
import HeaderLg from '@/components/common/HeaderLg'
import FooterLg from '@/components/common/FooterLg'
import CardsByMq from '@/components/common/CardsByMq'
import { obtenerClinicasVeterinarias } from '@/api/veterinaryClinicApi'
import { Card, Button, Row, Col, Typography, Spin, message } from 'antd'

const { Title, Paragraph, Text } = Typography;

export default function VeterinariasMq() {
    const [clinics, setClinics] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedClinic, setSelectedClinic] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchClinics = async () => {
            try {
                const data = await obtenerClinicasVeterinarias();
                const filtered = data.filter(c => c.name && c.name.toLowerCase().includes("petitos"));
                setClinics(filtered);
                if (filtered.length > 0) {
                    setSelectedClinic(filtered[0]);
                }
            } catch (error) {
                console.error("Error al obtener clínicas:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchClinics();
    }, []);

    const handleSelectClinic = (clinic) => {
        setSelectedClinic(clinic);
    };

    const handleRedirectToServices = () => {
        if (selectedClinic && selectedClinic.documentNumber) {
            navigate(`/servicios?clinicDoc=${selectedClinic.documentNumber}&clinicName=${encodeURIComponent(selectedClinic.name)}`);
        } else {
            message.warning("Esta clínica no tiene un identificador válido.");
        }
    };

    return (
        <>
            <HeaderLg/>
            <BannerLw titulo={'Veterinarias'}/>
            <div className="containerContentVet-Mq">
                <main style={{ display: 'flex', gap: '30px', padding: '20px' }}>
                    <div style={{ flex: 1 }}>
                        <div className="searchVet-Mq">
                            <span>Busqueda</span>
                            <div className="inputSearchVet-Mq">
                                <input type="text" placeholder='Busca locacion, por nombre o servicio' />
                                <i className="bi bi-search"></i>
                            </div>
                        </div>
                        <div className="containerCardsVet-Mq">
                            {loading ? (
                                <Spin style={{ margin: 'auto', display: 'block', marginTop: '5vh' }} />
                            ) : clinics.length > 0 ? (
                                clinics.map((item, index) => (
                                    <div key={index} onClick={() => handleSelectClinic(item)} style={{ cursor: 'pointer' }}>
                                        <CardsByMq 
                                            title={item.name} 
                                            image={item.picture || 'https://images.unsplash.com/photo-1584820927498-cafe2c1bf015?w=500'} 
                                            style={'veterinaria'} 
                                        />
                                    </div>
                                ))
                            ) : (
                                <Text type="secondary" style={{ marginLeft: '10px' }}>No hay clínicas registradas con ese nombre.</Text>
                            )}
                        </div>
                    </div>

                    {selectedClinic && (
                        <div className="clinic-detail-sidebar" style={{ width: '350px', background: '#fff', padding: '20px', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
                            <Title level={3}>{selectedClinic.name}</Title>
                            <img src={selectedClinic.picture || 'https://images.unsplash.com/photo-1584820927498-cafe2c1bf015?w=500'} alt={selectedClinic.name} style={{ width: '100%', borderRadius: '8px', marginBottom: '15px' }} />
                            <Paragraph>{selectedClinic.description || "Agendando citas disponibles para los mimados del hogar."}</Paragraph>
                            <div style={{ marginBottom: '20px' }}>
                                <Paragraph><Text strong>Dirección:</Text> {selectedClinic.address}</Paragraph>
                                <Paragraph><Text strong>Teléfono:</Text> {selectedClinic.phone}</Paragraph>
                                <Paragraph><Text strong>Horario:</Text> {selectedClinic.openingHours || '8:00 AM - 6:00 PM'}</Paragraph>
                            </div>
                            <Button 
                                type="primary" 
                                size="large" 
                                block 
                                onClick={handleRedirectToServices}
                            >
                                Agendar Cita en Servicios
                            </Button>
                        </div>
                    )}
                </main>
            </div>
            <FooterLg/>
        </>
    )
}
