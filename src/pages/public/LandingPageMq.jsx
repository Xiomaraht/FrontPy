import ContentGenMq from "@/components/common/ContentGenMq";
import HeaderLg from "@/components/common/HeaderLg";
import FooterLg from "@/components/common/FooterLg";
import heroImg1 from "@/assets/images/service_vet_consult.png";
import heroImg2 from "@/assets/images/product_dog_food.png";

export default function LandingPageMq() {
    return (
        <>
            <HeaderLg />
            <ContentGenMq title={'Thiiy Get Your werkace Thiew For PariL ito Noft'} description={'Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis tempore esse, numquam accusantium neque sapiente similique dolor earum unde quidem expedita animi alias odit? Laudantium exercitationem rem explicabo inventore non'} buttons={[{texto:'Soy Dueño de Mascota', hrf:'/auth/login?action=register&role=customer'}, {texto:'Soy Veterinario', hrf:'/auth/login?action=register&role=vet'}]} imageSrc={heroImg1}/>
            <ContentGenMq title='Here you can find all for your pet' description='Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis tempore esse, numquam accusantium neque sapiente similique dolor earum unde quidem expedita animi alias odit? Laudantium exercitationem rem explicabo inventore non' buttons={[{texto:'Services', hrf:'/servicios'}]} optionalStyle='whitestyle' miniTitle='Present' imageSrc={heroImg2}/>
            <FooterLg />
        </>
    )
}
