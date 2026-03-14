import React from 'react';
import '@/components/styles/WishListLg.css';


export default function WishList({ items }) {
  // Verificamos si la lista está vacía para mostrar un mensaje
  if (!items || items.length === 0) {
    return (
      <div className="wish-list-container">
        <p className="empty-message">Tu lista de deseos está vacía. ¡Añade algunos productos!</p>
      </div>
    );
  }

  return (
    <section className="wish-list-container">
      <h2 className="wish-list-title">Mi Lista de Deseos</h2>
      <div className="product-list">
        {items.map(item => (
          // Usamos 'item.id' como 'key' única, lo cual es lo ideal.
          <div key={item.id} className="product-card">
            <img src={item.image} alt={item.name} className="product-image" />
            <div className="product-info">
              <h3 className="product-name">{item.name}</h3>
              <p className="product-price">${item.price.toFixed(2)}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}