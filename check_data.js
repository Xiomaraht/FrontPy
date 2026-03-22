async function checkData() {
    const API_BASE_URL = 'http://localhost:8080';
    try {
        console.log("Fetching all clinics...");
        const clinicsRes = await fetch(`${API_BASE_URL}/api/veterinary-clinics`);
        const clinics = await clinicsRes.json();
        console.log("Clinics count:", clinics.length);
        clinics.forEach(c => console.log(`- ${c.name} (ID: ${c.id}, Email: ${c.email})`));

        console.log("\nFetching all users...");
        const usersRes = await fetch(`${API_BASE_URL}/api/users`);
        const users = await usersRes.json();
        console.log("Users count:", users.length);
        users.forEach(u => console.log(`- ${u.username} (ID: ${u.id}, Email: ${u.email}, Role: ${u.authority?.name})`));

        const petitos = clinics.find(c => c.name && c.name.toLowerCase().includes('petitos'));
        const prueba = users.find(u => u.username === 'prueba');

        if (petitos) {
            console.log("\nPetitos found:", petitos.id);
        } else {
            console.log("\nPetitos NOT found");
        }

        if (prueba) {
            console.log("Prueba user found:", prueba.id);
            // Check if prueba user has a clinic associated in the response
            // Actually the current User model doesn't have clinicId, it's in the DTO or separate.
        } else {
            console.log("Prueba user NOT found");
        }
    } catch (error) {
        console.error("Error:", error.message);
    }
}

checkData();
