import ContentGenMq from "../components/Manuel/ContentGenMq";
import HeaderLg from "../components/Laura/HeaderLg";
import FooterLg from "../components/Laura/FooterLg"

export default function LandingPageMq() {
    return (
        <>
            <HeaderLg />
            <ContentGenMq title={'Thiiy Get Your werkace Thiew For PariL ito Noft'} description={'Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis tempore esse, numquam accusantium neque sapiente similique dolor earum unde quidem expedita animi alias odit? Laudantium exercitationem rem explicabo inventore non'} buttons={[{texto:'Ingrese', hrf:'/login'}, {texto:'Registrese', hrf:'/login?action=register'}]}/>
            <ContentGenMq title='Here you can find all for your pet' description='Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis tempore esse, numquam accusantium neque sapiente similique dolor earum unde quidem expedita animi alias odit? Laudantium exercitationem rem explicabo inventore non' buttons={[{texto:'Services', hrf:'/servicios'}]} optionalStyle='whitestyle' miniTitle='Present'/>
            <FooterLg />
        </>
    )
}
