import axios from 'axios';

const api = axios.create({ baseURL: 'http://localhost:8080' });

const products = [
    {
        name: "Alimento Premium Perros",
        brand: "Hills",
        price: 85000,
        stock: 50,
        description: "Alimento completo y balanceado para perros adultos de raza mediana.",
        picture: "https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=500",
        categoryIds: []
    },
    {
        name: "Juguete Interactivo Gatos",
        brand: "PetCareToys",
        price: 25000,
        stock: 120,
        description: "Rascador y juguete interactivo para mantener a tu gato activo.",
        picture: "https://images.unsplash.com/photo-1545249390-6bdfa286032f?w=500",
        categoryIds: []
    },
    {
        name: "Shampoo Avena y Aloe",
        brand: "DogClean",
        price: 18000,
        stock: 35,
        description: "Shampoo suave para mascotas con piel sensible. Hipoalergénico.",
        picture: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=500",
        categoryIds: []
    },
    {
        name: "Cama Ortopédica Grande",
        brand: "SleepyPet",
        price: 150000,
        stock: 15,
        description: "Cama ideal para perros grandes o mascotas mayores con dolor articular.",
        picture: "https://images.unsplash.com/photo-1590422749890-093416b9cbbe?w=500",
        categoryIds: []
    },
    {
        name: "Snacks Dentales",
        brand: "Pedigree",
        price: 12500,
        stock: 200,
        description: "Barras dentales para limpieza profunda y aliento fresco.",
        picture: "https://images.unsplash.com/photo-1623387641168-d9804dd9d10e?w=500",
        categoryIds: []
    }
];

const services = [
    {
        name: "Consulta Medica General",
        description: "Revisión completa de rutina, chequeo de peso y signos vitales.",
        picture: "https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?w=500",
        status: true,
        veterinaryClinicIds: []
    },
    {
        name: "Corte de Pelo y Baño",
        description: "Peluquería completa, corte de uñas, limpieza de oídos y baño relajante.",
        picture: "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?w=500",
        status: true,
        veterinaryClinicIds: []
    },
    {
        name: "Vacunación Anual",
        description: "Esquema completo de vacunas para mantener tu mascota protegida.",
        picture: "https://images.unsplash.com/photo-1628009368231-7bb7cbcb8127?w=500",
        status: true,
        veterinaryClinicIds: []
    },
    {
        name: "Radiografía Digital",
        description: "Estudios radiológicos de alta resolución para diagnósticos exactos.",
        picture: "https://images.unsplash.com/photo-1584820927498-cafe2c1bf015?w=500",
        status: true,
        veterinaryClinicIds: []
    },
    {
        name: "Guardería de Día",
        description: "Cuidado profesional, recreación y socialización segura por horas.",
        picture: "https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=500",
        status: true,
        veterinaryClinicIds: []
    }
];

async function seedData() {
    try {
        console.log("Autenticando...");
        const authResp = await api.post('/api/auth/login', { username: "adminvet", password: "password" });
        const token = authResp.data.token || authResp.data.accessToken;
        
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        console.log("Iniciando inyección de datos (Productos)...");
        for (const p of products) {
            await api.post('/products', p);
            console.log(`Producto ${p.name} insertado.`);
        }
        
        console.log("Iniciando inyección de datos (Servicios)...");
        for (const s of services) {
            await api.post('/services', s);
            console.log(`Servicio ${s.name} insertado.`);
        }
        console.log("¡Completado con éxito!");
    } catch (e) {
        console.error("Error en el seeding:", Object.keys(e));
        if (e.response) {
            console.error(e.response.data);
            console.error(e.response.status);
        }
    }
}

seedData();
