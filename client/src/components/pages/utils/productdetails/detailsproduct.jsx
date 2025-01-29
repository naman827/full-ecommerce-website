import React, { useContext, useEffect, useState } from 'react'
import { GlobalState } from "../../../../globalStates";
import {useParams} from 'react-router-dom'
import { FaShoppingCart } from "react-icons/fa";
import {Link} from 'react-router-dom'
const Detailsproduct = () => {

  const params =useParams()
  const state = useContext(GlobalState);
 const [products] = state.ProductAPI.products;
  const [detailProducts,setdetailedProducts] = useState([])
  useEffect(()=>{
    if(params){
      products.forEach((product) => {
        if (product._id === params.id) {
          setdetailedProducts(product);
        }
      });
    }
  },[params,products])
  if(detailProducts.length===0) return null;
  console.log(detailProducts)
  return (
    <div className="detail_products">
      <img src={detailProducts.images.url} alt="images" />
      <div className="detail_box">
        <h2>{detailProducts.title}</h2>
        <h4>{detailProducts.product_id}</h4>
        <span>${detailProducts.price}</span>
        <p>{detailProducts.description}</p>
        <p>{detailProducts.content}</p>
        <span>sold:{detailProducts.sold}</span>
        <Link to="/cart" className="cart_btn">
          <span>Add to cart</span>
          <FaShoppingCart/>
        </Link>
      </div>
    </div>
  );
}

export default Detailsproduct
