import React from 'react';
import { Table, Typography, Card } from 'antd';

const { Title } = Typography;

const ContentClientsLg = ({ data }) => {
    const columns = [
        { title: 'ID', dataIndex: 'id', key: 'id' },
        { title: 'Nombre', dataIndex: 'name', key: 'name' },
        { title: 'Email', dataIndex: 'email', key: 'email' },
        { title: 'Teléfono', dataIndex: 'phone', key: 'phone' },
        { title: 'Ciudad/Barrio', key: 'location', render: (_, record) => (
            record.barrioCliente ? `${record.barrioCliente.name}` : 'N/A'
        )},
    ];

    return (
        <div className="content-container-CMq">
            <Title level={3}>Clientes de la Clínica</Title>
            <Table 
                dataSource={data} 
                columns={columns} 
                rowKey="id" 
                pagination={{ pageSize: 10 }}
            />
        </div>
    );
};

export default ContentClientsLg;
