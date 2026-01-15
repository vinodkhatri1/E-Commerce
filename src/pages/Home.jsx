import Nav from "../component/Nav";
import ContainerRules from "../component/ContainerRules";
import TrandingProduct from "../component/TrandingProduct";
import Banner from "../component/Banner";
import NewArrivals from "../component/NewArrivals";
const Home = () => {
    return (
        <div>
            <Nav />
            <ContainerRules />
            <TrandingProduct />
            <Banner />
            <NewArrivals />
        </div>
    )
}
export default Home