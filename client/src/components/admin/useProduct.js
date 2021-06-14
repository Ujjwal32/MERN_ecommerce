import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';


const useProduct = (id) => {
    const products = useSelector(state => state.product.products[0]?.product)
    const [product,setProduct] = useState()
    
    useEffect(() => {
        if(id){
            const selectedProd = products && products.filter(single => single._id === id)
             setProduct(selectedProd[0])
        } else {
            setProduct([])
        }
    }, [id])
    console.log(product)
    return product
}

export default useProduct
