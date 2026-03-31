import Head from "next/head";
import Home from "./home";
import axios from "axios";
export default function Index({ categoryList, productList }) {
  return (
    <div className="">
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Home categoryList={categoryList} productList={productList} />
    </div>
  );
}

export const getServerSideProps = async () => {
    const category = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/categories`
    );
    const product = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/products`
    );

    return {
        props: {
            categoryList: category.data ? category.data : [],
            productList: product.data ? product.data : [],
        },
    };
};