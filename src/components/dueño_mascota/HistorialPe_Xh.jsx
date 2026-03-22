import React, { useState, useEffect } from 'react';
import { getPetsByCustomerIdApi } from '@/api/petsApi';
import { Link } from 'react-router-dom';
import { Spin, Empty, Button, Card, Row, Col } from 'antd';
import '@/components/styles/HistorialPe_Xh.css';

export default function HistorialPe_Xh({ customerId }) {
  const [mascotas, setMascotas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPets = async () => {
      try {
        if (!customerId) return;
        const data = await getPetsByCustomerIdApi(customerId);
        setMascotas(data);
      } catch (error) {
        console.error("Error fetching pets for history:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPets();
  }, [customerId]);

  if (loading) return <div style={{ textAlign: 'center', padding: '50px' }}><Spin size="large" /></div>;

  if (mascotas.length === 0) return <Empty description="No tienes mascotas registradas para ver su historial" />;

  return (
    <div className="Historial">
      <h2 className="titulo-seccion">Historial de Mis Mascotas</h2>
      <p className="subtitulo-seccion">Selecciona una mascota para ver su historial clínico detallado</p>
      
      <Row gutter={[20, 20]} className="contenedor-mascotas-historial">
        {mascotas.map((mascota) => (
          <Col xs={24} md={12} key={mascota.id}>
            <div className="pet-history-card">
              <div className="pet-info-header">
                <img src={mascota.imageUrl || '/placeholder-pet.png'} alt={mascota.name} className="pet-thumb" />
                <div className="pet-basic-data">
                  <h3>{mascota.name}</h3>
                  <span>{mascota.raceName}</span>
                </div>
              </div>
              <div className="pet-details-grid">
                <div className="detail-item">
                  <strong>Color:</strong> {mascota.color || 'N/A'}
                </div>
                <div className="detail-item">
                  <strong>Género:</strong> {mascota.gender}
                </div>
                <div className="detail-item">
                  <strong>Microchip:</strong> {mascota.microchip || 'No registrado'}
                </div>
              </div>
              <div className="pet-card-footer">
                <Link to={'/historial'} state={{ mascota }}>
                  <button className="btn-ver-historial">Ver Historial Clínico</button>
                </Link>
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </div>
  );
}