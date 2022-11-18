import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const useProduct = (id) => {
  const products = useSelector((state) => state.product.products);
  const [product, setProduct] = useState();

  useEffect(() => {
    if (id) {
      const selectedProd =
        products && products.filter((single) => single._id === id);
      setProduct(selectedProd[0]);
    } else {
      setProduct([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);
  return product;
};

export default useProduct;
