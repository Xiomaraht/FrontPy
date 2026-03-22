async function checkPets() {
    const API_BASE_URL = 'http://localhost:8080';
    try {
        console.log("Fetching all pets...");
        const res = await fetch(`${API_BASE_URL}/api/pets`);
        const pets = await res.json();
        console.log("Pets found:", pets.length);
        pets.forEach(p => console.log(`- ${p.name} (ID: ${p.id}, OwnerID: ${p.customerId})`));
    } catch (error) {
        console.error("Error:", error.message);
    }
}
checkPets();
