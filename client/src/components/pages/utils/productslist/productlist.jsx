import React from 'react'
import { Link } from 'react-router-dom'
const Productlist = ({ product }) => {
  return (
    <div className="products">
      <div className="product_card">
        <img src={product.images.url} alt="images" />

        <div className="product_box">
          <h2 title={product.title}>{product.title}</h2>
          <span>${product.price}</span>
          <p>{product.description}</p>
        </div>
        <div className="btn">
          <Link className='buy_btn' to="/">Buy now</Link>
          <Link className='view_btn' to={`/detail/${product._id}`}>View now</Link>
        </div>
      </div>
    </div>
  );
};

export default Productlist;
