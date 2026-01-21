import ImageSlider from "../component/ImageSlider";
import ContainerRules from "../component/ContainerRules";
import TrandingProduct from "../component/TrandingProduct";
import Banner from "../component/Banner";
import NewArrivals from "../component/NewArrivals";

const Home = () => {
  return (
    <div className="w-full overflow-hidden">
      <ImageSlider />
      <ContainerRules />
      <TrandingProduct />
      <Banner />
      <NewArrivals />
    </div>
  );
};
export default Home;
