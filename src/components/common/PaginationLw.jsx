import '@/components/styles/PaginationLw.css';
import { Pagination } from 'react-bootstrap';
import { useState, useEffect } from 'react';

const PaginationLw = ({ currentPage, totalPages, onPageChange }) => {
const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    // Función que actualiza el estado con el ancho de la ventana
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    // Añade el event listener cuando el componente se monta
    window.addEventListener('resize', handleResize);

    // Función de limpieza que se ejecuta cuando el componente se desmonta
    // Esto es muy importante para evitar fugas de memoria.
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []); // El array vacío asegura que el efecto se ejecute solo una vez (al montar y desmontar)

  // No renderizar nada si hay 1 página o menos
  if (totalPages <= 1) {
    return null;
  }

  // Determina cuántos botones de página mostrar según el ancho de la pantalla.
  // Puedes ajustar este valor según tu diseño.
  const maxPagesToShow = width < 768 ? 3 : 5;

  const renderPageNumbers = () => {
    const pageNumbers = [];

    if (totalPages <= maxPagesToShow) {
      // Muestra todos los números si el total es menor que el máximo a mostrar
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(
          <Pagination.Item key={i} active={i === currentPage} onClick={() => onPageChange(i)}>
            {i}
          </Pagination.Item>
        );
      }
    } else {
      // Lógica para mostrar un set limitado de páginas con puntos suspensivos
      let startPage, endPage;
      const halfPages = Math.floor(maxPagesToShow / 2);

      if (currentPage <= halfPages + 1) {
        startPage = 1;
        endPage = maxPagesToShow;
      } else if (currentPage + halfPages >= totalPages) {
        startPage = totalPages - maxPagesToShow + 1;
        endPage = totalPages;
      } else {
        startPage = currentPage - halfPages;
        endPage = currentPage + halfPages;
      }

      // Botón para la primera página y suspensivos iniciales
      if (startPage > 1) {
        pageNumbers.push(<Pagination.Item key={1} onClick={() => onPageChange(1)}>{1}</Pagination.Item>);
        if (startPage > 2) {
          pageNumbers.push(<Pagination.Ellipsis key="start-ellipsis" disabled />);
        }
      }

      // Números de página del rango calculado
      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(
          <Pagination.Item key={i} active={i === currentPage} onClick={() => onPageChange(i)}>
            {i}
          </Pagination.Item>
        );
      }

      // Botón para la última página y suspensivos finales
      if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
          pageNumbers.push(<Pagination.Ellipsis key="end-ellipsis" disabled />);
        }
        pageNumbers.push(<Pagination.Item key={totalPages} onClick={() => onPageChange(totalPages)}>{totalPages}</Pagination.Item>);
      }
    }
    return pageNumbers;
  };

  return (
    <Pagination className="pagination-container">
      <Pagination.First onClick={() => onPageChange(1)} disabled={currentPage === 1} />
      <Pagination.Prev onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1} />
      {renderPageNumbers()}
      <Pagination.Next onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages} />
      <Pagination.Last onClick={() => onPageChange(totalPages)} disabled={currentPage === totalPages} />
    </Pagination>
  );
};

export default PaginationLw;

