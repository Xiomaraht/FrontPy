import ContentGenMq from "@/components/common/ContentGenMq";
import HeaderLg from "@/components/common/HeaderLg";
import FooterLg from "@/components/common/FooterLg";
import heroImg1 from "@/assets/images/service_vet_consult.png";
import heroImg2 from "@/assets/images/product_dog_food.png";

export default function LandingPageMq() {
    return (
        <>
            <HeaderLg />
            <ContentGenMq 
                title={'El mejor cuidado para tu mejor amigo'} 
                description={'En PetCare conectamos a dueños de mascotas con las mejores veterinarias. Todo lo que tu compañero necesita en un solo lugar: salud, bienestar y amor.'} 
                buttons={[{texto:'Soy Dueño de Mascota', hrf:'/auth/login?action=register&role=customer'}, {texto:'Soy Veterinario', hrf:'/auth/login?action=register&role=vet'}]} 
                imageSrc={heroImg1}
            />
            <ContentGenMq 
                title='Encuentra todo lo que buscas' 
                description='Explora nuestro amplio catálogo de productos premium y servicios especializados. Agenda citas de manera rápida y segura desde cualquier dispositivo.' 
                buttons={[{texto:'Ver Servicios', hrf:'/servicios'}]} 
                optionalStyle='whitestyle' 
                miniTitle='Servicios Exclusivos' 
                imageSrc={heroImg2}
            />
            <FooterLg />
        </>
    )
}
