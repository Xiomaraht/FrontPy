import React from 'react';
import { Table, Typography, Tag } from 'antd';

const { Title } = Typography;

const ContentOrdersLg = ({ data }) => {
    const columns = [
        { title: 'Factura #', dataIndex: 'id', key: 'id' },
        { title: 'Fecha', dataIndex: 'date', key: 'date', render: (date) => new Date(date).toLocaleDateString() },
        { title: 'Cliente', key: 'customer', render: (_, record) => (
            record.customer ? record.customer.name : 'N/A'
        )},
        { title: 'Total', dataIndex: 'total', key: 'total', render: (total) => `$${total?.toFixed(2)}` },
        { title: 'Estado de Pago', dataIndex: 'paymentStatus', key: 'paymentStatus', render: (status) => (
            <Tag color={status === 'PAID' ? 'green' : 'orange'}>{status}</Tag>
        )},
    ];

    return (
        <div className="content-container-CMq">
            <Title level={3}>Pedidos / Facturación</Title>
            <Table 
                dataSource={data} 
                columns={columns} 
                rowKey="id" 
                pagination={{ pageSize: 10 }}
            />
        </div>
    );
};

export default ContentOrdersLg;
