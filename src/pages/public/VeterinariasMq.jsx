import React, { useState } from 'react'
import '@/components/styles/VeterinariasMq.css'
import BannerLw from '@/components/common/BannerLw'
import HeaderLg from '@/components/common/HeaderLg'
import FooterLg from '@/components/common/FooterLg'
import CardsByMq from '@/components/common/CardsByMq'
import VeterinariasDataMq from '@/components/Data/VeterinariasDataMq.json'
import BookingModalMq from '@/components/dueño_mascota/BookingModalMq'
import { Card, Button, Row, Col, Typography } from 'antd'

const { Title, Paragraph, Text } = Typography;

export default function VeterinariasMq() {
    const [selectedClinic, setSelectedClinic] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');

    const handleSelectClinic = (clinic) => {
        setSelectedClinic(clinic);
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
                            {VeterinariasDataMq.map((item, index)=>{
                                return(
                                    <div key={index} onClick={() => handleSelectClinic(item)} style={{ cursor: 'pointer' }}>
                                        <CardsByMq title={item.title} description={item.description} image={item.image} style={'veterinaria'}/>
                                    </div>
                                )
                            })}
                        </div>
                    </div>

                    {selectedClinic && (
                        <div className="clinic-detail-sidebar" style={{ width: '350px', background: '#fff', padding: '20px', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
                            <Title level={3}>{selectedClinic.title}</Title>
                            <img src={selectedClinic.image} alt={selectedClinic.title} style={{ width: '100%', borderRadius: '8px', marginBottom: '15px' }} />
                            <Paragraph>{selectedClinic.description}</Paragraph>
                            <div style={{ marginBottom: '20px' }}>
                                <Paragraph><Text strong>Dirección:</Text> {selectedClinic.address}</Paragraph>
                                <Paragraph><Text strong>Teléfono:</Text> {selectedClinic.phone}</Paragraph>
                                <Paragraph><Text strong>Horario:</Text> 8:00 AM - 6:00 PM</Paragraph>
                            </div>
                            <Button 
                                type="primary" 
                                size="large" 
                                block 
                                onClick={() => setIsModalOpen(true)}
                                disabled={!userInfo.userId}
                            >
                                {userInfo.userId ? 'Agendar Cita' : 'Inicia sesión para agendar'}
                            </Button>
                        </div>
                    )}
                </main>
            </div>
            <FooterLg/>

            {selectedClinic && (
                <BookingModalMq 
                    open={isModalOpen}
                    onCancel={() => setIsModalOpen(false)}
                    clinicId={selectedClinic.id}
                    clinicName={selectedClinic.title}
                    customerId={userInfo.userId}
                />
            )}
        </>
    )
}
