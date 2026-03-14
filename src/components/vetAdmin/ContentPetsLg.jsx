import React from 'react';
import { Table, Typography, Avatar } from 'antd';

const { Title } = Typography;

const ContentPetsLg = ({ data }) => {
    const columns = [
        { title: 'ID', dataIndex: 'id', key: 'id' },
        { title: 'Imagen', dataIndex: 'imageUrl', key: 'imageUrl', render: (url) => (
            <Avatar src={url} shape="square" size={64} />
        )},
        { title: 'Nombre', dataIndex: 'name', key: 'name' },
        { title: 'Dueño', key: 'customer', render: (_, record) => (
            record.customer ? record.customer.name : 'Desconocido'
        )},
        { title: 'Especie/Raza', key: 'breed', render: (_, record) => (
            record.raza ? `${record.raza.name}` : 'N/A'
        )},
        { title: 'Sexo', dataIndex: 'gender', key: 'gender' },
    ];

    return (
        <div className="content-container-CMq">
            <Title level={3}>Mascotas Atendidas</Title>
            <Table 
                dataSource={data} 
                columns={columns} 
                rowKey="id" 
                pagination={{ pageSize: 10 }}
            />
        </div>
    );
};

export default ContentPetsLg;
