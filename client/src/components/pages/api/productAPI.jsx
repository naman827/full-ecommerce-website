import axios from 'axios'
import { useEffect, useState } from 'react'

const ProductAPI =()=>{
    const[Products,setProducts]=useState([])
    
    useEffect(()=>{
        axios.get('/api/products')
        .then((response)=>{
            setProducts(response.data)
        }).catch((error)=>{
            console.log(error)  
        })
    })

    return{
     products:[Products,setProducts]
    }
}

export default ProductAPI