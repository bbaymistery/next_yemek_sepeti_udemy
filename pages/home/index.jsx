import axios from "axios";
import About from "../../components/About";
import Campaigns from "../../components/Campaigns";
import Carousel from "../../components/Carousel";
import Customers from "../../components/customers/Customers";
import MenuWrapper from "../../components/product/MenuWrapper";
import Reservation from "../../components/Reservation";

const Index = ({ categoryList }) => {
    return (
        <>
            <Carousel />
            <Campaigns />
            <MenuWrapper categoryList={categoryList} />
            <About />
            <Reservation />
            <Customers />
        </>
    )
};

export default Index;

export const getServerSideProps = async () => {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/categories`);
    return {
        props: {
            categoryList: res.data ? res.data : [],
        },
    };
};