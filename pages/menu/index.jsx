import axios from "axios";
import React from "react";
import MenuWrapper from "../../components/product/MenuWrapper";

const Index = ({ categoryList, productList }) => {
  return (
    <div className="pt-10">
      <MenuWrapper categoryList={categoryList} productList={productList} />
    </div>
  );
};

export const getServerSideProps = async () => {
  try {
    const [categoryRes, productRes] = await Promise.all([
      axios.get(`${process.env.NEXT_PUBLIC_API_URL}/categories`),
      axios.get(`${process.env.NEXT_PUBLIC_API_URL}/products`)
    ]);

    return {
      props: {
        categoryList: categoryRes.data ? categoryRes.data : [],
        productList: productRes.data ? productRes.data : [],
      },
    };
  } catch (error) {
    return {
      props: {
        categoryList: [],
        productList: [],
      },
    };
  }
};

export default Index;
