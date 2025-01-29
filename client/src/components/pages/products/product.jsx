import React, { useContext } from "react";
import { GlobalState } from "../../../globalStates";
import Productlist from "../utils/productslist/productlist";

const Product = () => {
  const state = useContext(GlobalState)
  const [product] = state.ProductAPI.products
  return (
    <div className="products">
      {product.map((product) => {
        return <Productlist key={product.id} product={product} />;
      })}
    </div>
  );
};

export default Product;
