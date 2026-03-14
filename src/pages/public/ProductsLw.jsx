import { useEffect, useState, useMemo } from 'react';
import '@/components/styles/ProductsLw.css'
import HeaderLg from '@/components/common/HeaderLg'
import BannerLw from '@/components/common/BannerLw'
import FilterLw from '@/components/common/FilterLw'
import CardLw from '@/components/common/CardLw'
import PaginationLw from '@/components/common/PaginationLw'
import FooterLg from '@/components/common/FooterLg'
import { obtenerProductos } from '@/api/productsApi' 
import { obtenerCategorias } from '@/api/categoriesApi';
import { Link } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';

export default function ProductsLw() {
    const { addToCart } = useCart();
    const { toggleWishlist, isInWishlist } = useWishlist();
    // ... (mantener toda la lógica de estado y API)
    const [errorMesagge, setErrorMessage] = useState(null);
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const [currentPage, setCurrentPage] = useState(1);
    const [activeFilters, setActiveFilters] = useState({});
    const productsPerPage = 12; 

    useEffect(() => {
        setIsLoading(true);
        setErrorMessage(null);
        
         obtenerProductos()
            .then((data) => {
                // Soporte para respuestas envueltas { data: [...] } o directas [...]
                const actualData = data?.data || data;
                setProducts(Array.isArray(actualData) ? actualData : []);
            })
            .catch((error) => setErrorMessage(error.message))
            .finally(() => setIsLoading(false));

        obtenerCategorias()
            .then((datos) => {
                const allCategories = [{ id: null, name: 'Todos' }, ...datos];
                setCategories(allCategories);
            })
            .catch((error) => console.error("Error al cargar categorías:", error));
    }, []); 

    // --- Lógica de Filtrado y Ordenamiento (useMemo) ---
    const filteredAndSortedProducts = useMemo(() => {
        let currentProducts = products;
        const activeCategoryName = activeFilters['Categoria'];

        // 1. FILTRO POR CATEGORÍA
        if (activeCategoryName && activeCategoryName.toLowerCase() !== 'todos') {
            const selectedCategory = categories.find(c => c.name === activeCategoryName);

            if (selectedCategory && selectedCategory.id !== null) {
                 currentProducts = currentProducts.filter(product => {
                    const targetId = String(selectedCategory.id);
                    
                    // Soporte para objetos (backend antiguo/refactorizado parcial)
                    if (Array.isArray(product.categories)) {
                        return product.categories.some(cat => String(cat.id) === targetId);
                    }
                    
                    // Soporte para IDs planos (backend actual DTO)
                    if (Array.isArray(product.categoryIds)) {
                        return product.categoryIds.some(id => String(id) === targetId);
                    }

                    return false;
                });
            }
        }
        
        // 2. Otros Filtros (Tipo, Marca)
        if (activeFilters['Tipo'] && activeFilters['Tipo'].toLowerCase() !== 'todos') {
            currentProducts = currentProducts.filter(product => product.type === activeFilters['Tipo']);
        }
        
        if (activeFilters['Marca'] && activeFilters['Marca'].toLowerCase() !== 'todos') {
            currentProducts = currentProducts.filter(product => product.brand === activeFilters['Marca'] || product.marca === activeFilters['Marca']);
        }

        // 3. Ordenamiento
        const sortOption = activeFilters['Ordenar por'];
        if (sortOption) {
            currentProducts.sort((a, b) => {
                if (sortOption === 'Menor precio - Mayor precio') {
                    return a.price - b.price;
                } else if (sortOption === 'Mayor precio - Menor precio') {
                    return b.price - a.price;
                }
                return 0;
            });
        }

        return currentProducts;
    }, [products, activeFilters, categories]);

    // ... (mantener la lógica de paginación y manejo de filtros)
    const totalFilteredProducts = filteredAndSortedProducts.length;
    const totalPages = Math.ceil(totalFilteredProducts / productsPerPage);
    const startIndex = (currentPage - 1) * productsPerPage;
    const paginatedProducts = filteredAndSortedProducts.slice(startIndex, startIndex + productsPerPage);
    
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleFilterChange = (filterTitle, selectedValue) => {
        let valueToStore = selectedValue;

        if (filterTitle === 'Categoria' && typeof selectedValue === 'object') {
            valueToStore = selectedValue.name;
        }

        setActiveFilters(prev => {
            const newFilters = { ...prev };
            
            if (valueToStore && valueToStore.toLowerCase() !== 'todos') {
                newFilters[filterTitle] = valueToStore;
            } else {
                delete newFilters[filterTitle]; 
            }
            return newFilters;
        });

        setCurrentPage(1); 
    };

    const handleRemoveFilter = (filterKey) => {
        if (filterKey === 'Categoria') {
            handleFilterChange(filterKey, { id: null, name: 'Todos' }); 
        } else if (filterKey !== 'Ordenar por') {
            handleFilterChange(filterKey, null); 
        }
    };

    const handleClearAllFilters = () => {
        setActiveFilters({});
        setCurrentPage(1); 
    };

    const displayableActiveFilters = Object.entries(activeFilters).filter(([key]) => key !== 'Ordenar por');
    const shouldShowClearButton = Object.keys(activeFilters).length > 0;
    const firstProductIndex = totalFilteredProducts > 0 ? startIndex + 1 : 0;
    const lastProductIndex = Math.min(startIndex + productsPerPage, totalFilteredProducts);

    // --- Renderizado de Carga y Error ---
    if (isLoading) {
        return (
            <>
                <HeaderLg />
                <BannerLw titulo={'Productos'} />
                <div className="products-page-container">
                    <p style={{textAlign: 'center', padding: '100px'}}>Cargando productos...</p>
                </div>
                <FooterLg />
            </>
        );
    }
    
    if (errorMesagge) {
        return (
            <>
                <HeaderLg />
                <BannerLw titulo={'Productos'} />
                <div className="products-page-container">
                    <p style={{textAlign: 'center', color: 'red', padding: '100px'}}>
                        Error al cargar los productos: {errorMesagge}
                    </p>
                </div>
                <FooterLg />
            </>
        );
    }
    // 🛑 ELIMINAMOS el bloque if (totalFilteredProducts === 0) 
    // y dejamos que la estructura principal se encargue de todo.


    return (
        <>
            <HeaderLg />
            <BannerLw titulo={'Productos'} />

            <div className="products-page-container">
                <aside className="filters-sidebar">
                    <div className="sidebar-header">
                        <h2>Filtros</h2>
                        {shouldShowClearButton && (
                            <button onClick={handleClearAllFilters} className="clear-filters-btn">Limpiar</button>
                        )}
                    </div>
                    <hr className='hrP-Lw' />
                    
                    {/* Componentes de filtro que llaman a handleFilterChange */}
                    <FilterLw onFilterChange={handleFilterChange} categories={categories} headerTitle='Categoria' className='Categoria' selectedValue={activeFilters['Categoria']} closeOnSelect={false}/>
                    
{/*                 <FilterLw onFilterChange={handleFilterChange} categories={['Todos', 'Humedo', 'Concentrado', 'Natural']} headerTitle='Tipo' className='Tipo' selectedValue={activeFilters['Tipo']} closeOnSelect={false}/>
                    <FilterLw onFilterChange={handleFilterChange} categories={['Todos', '.HILLS', 'CHUNKY', 'DIAMOND', 'MONGE', 'REELD`S', 'WHISKAS']} headerTitle='Marca' className='Marca' selectedValue={activeFilters['Marca']} closeOnSelect={false}/> */}
                </aside>

                <main className="products-main-content">
                    <div className="results-and-sort-header">
                        <h6>{`Mostrando ${firstProductIndex}-${lastProductIndex} de ${totalFilteredProducts} resultados`}</h6>
                        <div className="sort-filter-desktop">
                            <FilterLw
                                onFilterChange={(ignoredTitle, value) => handleFilterChange('Ordenar por', value)}
                                categories={['Mayor precio - Menor precio', 'Menor precio - Mayor precio']}
                                headerTitle={activeFilters['Ordenar por'] || 'Ordenar por'}
                                className='Orden'
                                selectedValue={activeFilters['Ordenar por']}/>
                        </div>
                    </div>
                    
                    {/* Renderizado de los filtros activos (pastillas) */}
                    {displayableActiveFilters.length > 0 && (
                        <div className="active-filters-section">
                            <h5>Filtro Activo:</h5>
                            <div className="active-filters-list">
                                {displayableActiveFilters.map(([key, value]) => (
                                    <div key={key} className="filter-pill">
                                        <span>{value}</span>
                                        {/* Botón que llama a handleRemoveFilter */}
                                        <button onClick={() => handleRemoveFilter(key)} className="remove-filter-btn" aria-label={`Remover filtro ${value}`}>&times;</button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    <div className="product-grid">
                        {/* 💡 Nueva lógica para mostrar el mensaje o los productos */}
                        {totalFilteredProducts > 0 ? (
                            paginatedProducts.map((producto) => (
                            <Link key={producto.id} to={`/products/${producto.id}`} style={{textDecoration: 'none'}}>
                                <CardLw
                                    productName={producto.name || producto.nombre || 'Producto sin nombre'}
                                    price={producto.price ? `$${producto.price}` : 'Consultar'} 
                                    imageUrl={producto.imagenPrincipal || producto.imageUrl ||  producto.picture || undefined}
                                    isFavoriteInitial={isInWishlist(producto.id)}
                                    onAddToFavorites={(e) => {
                                        e.preventDefault();
                                        toggleWishlist(producto);
                                    }}
                                    onAddToCart={(e) => {
                                        e.preventDefault();
                                        addToCart(producto);
                                        alert('¡Producto añadido al carrito!');
                                    }}
                                />
                            </Link>
                        ))
                        ) : (
                            // Mensaje de no resultados, pero con los filtros visibles
                            <div style={{gridColumn: '1 / -1', textAlign: 'center', padding: '50px'}}>
                                <p>No se encontraron productos que coincidan con los filtros aplicados.</p>
                            </div>
                        )}
                    </div>
                </main>
            </div>
            
            {/* 💡 Solo mostramos la paginación si hay productos */}
            {totalFilteredProducts > 0 && (
            <PaginationLw
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
            />
            )}
            <FooterLg />
        </>
    )
}