// ServicesLw.jsx

import { useEffect, useState } from 'react';
// 🛑 Usar la API en lugar del JSON local
import { obtenerServicios } from '@/api/servicesApi'; 
import '@/components/styles/ServicesLw.css';
import HeaderLg from '@/components/common/HeaderLg';
import BannerLw from '@/components/common/BannerLw';
import FilterLw from '@/components/common/FilterLw';
import CardLw from '@/components/common/CardLw';
import PaginationLw from '@/components/common/PaginationLw';
import FooterLg from '@/components/common/FooterLg';
import { Link } from 'react-router-dom';

export default function ServicesLw() {
    const [services, setServices] = useState([]);
    const [errorMesagge, setErrorMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const [currentPage, setCurrentPage] = useState(1);
    const [activeFilters, setActiveFilters] = useState({});
    const servicesPerPage = 12;

    // --- Carga de Datos de la API ---
    useEffect(() => {
        setIsLoading(true);
        setErrorMessage(null);
        
        obtenerServicios()
            .then((data) => setServices(data))
            .catch((error) => setErrorMessage(error.message))
            .finally(() => setIsLoading(false));
    }, []);

    // --- Lógica de Filtros y Paginación (Mantenida) ---
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleFilterChange = (filterTitle, selectedValue) => {
        setActiveFilters(prev => {
            const newFilters = { ...prev };
            if (selectedValue && selectedValue.toLowerCase() !== 'todos') {
                newFilters[filterTitle] = selectedValue;
            } else {
                delete newFilters[filterTitle];
            }
            return newFilters;
        });
        setCurrentPage(1);
    };

    const handleRemoveFilter = (filterKey) => {
        handleFilterChange(filterKey, null);
    };

    const handleClearAllFilters = () => {
        setActiveFilters({});
        setCurrentPage(1);
    };

    // Generamos categorías dinámicamente de los servicios cargados por la API
    // Asumiendo que la propiedad es 'categoria'
    const allServiceCategories = services.map(service => service.categoria).filter(Boolean);
    const serviceCategories = ['Todos', ...new Set(allServiceCategories)];

    // Filtrado de servicios
    const filteredServices = services.filter(service => {
        if (activeFilters['Servicios'] && service.categoria !== activeFilters['Servicios']) {
            return false;
        }
        return true;
    });

    // Paginación
    const totalFilteredServices = filteredServices.length;
    const totalPages = Math.ceil(totalFilteredServices / servicesPerPage);
    const startIndex = (currentPage - 1) * servicesPerPage;
    const paginatedServices = filteredServices.slice(startIndex, startIndex + servicesPerPage);

    const firstServiceIndex = totalFilteredServices > 0 ? startIndex + 1 : 0;
    const lastServiceIndex = Math.min(startIndex + servicesPerPage, totalFilteredServices);

    const displayableActiveFilters = Object.entries(activeFilters);
    const shouldShowClearButton = Object.keys(activeFilters).length > 0;

    // --- Renderizado con manejo de estados ---
    if (isLoading) {
         return (
            <>
                <HeaderLg />
                <BannerLw titulo={'Servicios'} />
                <div className="products-page-container">
                    <p style={{textAlign: 'center', padding: '100px'}}>Cargando servicios...</p>
                </div>
                <FooterLg />
            </>
        );
    }

    if (errorMesagge) {
        return (
            <>
                <HeaderLg />
                <BannerLw titulo={'Servicios'} />
                <div className="products-page-container">
                    <p style={{textAlign: 'center', color: 'red', padding: '100px'}}>
                        Error al cargar los servicios: {errorMesagge}
                    </p>
                </div>
                <FooterLg />
            </>
        );
    }

    return (
        <>
            <HeaderLg />
            <BannerLw titulo={'Servicios'} />
            <div className="products-page-container">
                <aside className="filters-sidebar">
                    <div className="sidebar-header">
                        <h2>Filtros</h2>
                        {shouldShowClearButton && (
                            <button onClick={handleClearAllFilters} className="clear-filters-btn">Limpiar</button>
                        )}
                    </div>
                    <hr />
                    {/* Filtro de Categoría de Servicios */}
                    <FilterLw
                        onFilterChange={handleFilterChange}
                        categories={serviceCategories} 
                        headerTitle='Servicios' 
                        className='Servicios'
                        selectedValue={activeFilters['Servicios']}
                        closeOnSelect={false}
                    />
                </aside>

                <main className="products-main-content">
                    <div className="results-and-sort-header">
                        <h6>{`Mostrando ${firstServiceIndex}-${lastServiceIndex} de ${totalFilteredServices} resultados`}</h6>
                    </div>

                    {displayableActiveFilters.length > 0 && (
                        <div className="active-filters-section">
                            <h5>Filtro Activo:</h5>
                            <div className="active-filters-list">
                                {displayableActiveFilters.map(([key, value]) => (
                                    <div key={key} className="filter-pill">
                                        <span>{value}</span>
                                        <button onClick={() => handleRemoveFilter(key)} className="remove-filter-btn" aria-label={`Remover filtro ${value}`}>&times;</button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}


                    <div className="product-grid">
                        {paginatedServices.map(service => (
                            <Link key={service.id} to={`/servicios/${service.id}`}>
                                <CardLw
                                    productName={service.name || service.nombre || 'Servicio sin nombre'} 
                                    imageUrl={service.picture || service.imagenUrl || service.image || undefined} 
                                    showPrice = {false}
                                    showCartIcon = {false}
                                    showHeartIcon = {false}
                                />
                            </Link>
                        ))}
                    </div>

                    
                </main>
            </div>
            <PaginationLw
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
            />
            <FooterLg />
        </>
    );
}