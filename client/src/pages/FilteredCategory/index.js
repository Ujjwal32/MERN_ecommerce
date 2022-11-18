import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Navigation from "../../components/Navigation";
import { fetchProductsByCategory } from "../../features/asyncTaskProduct";
import Products from "../../components/Products";

const FilteredCategoryPage = () => {
  const { name } = useParams();
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.filtered);

  useEffect(() => {
    dispatch(fetchProductsByCategory(name));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name]);

  return (
    <>
      <Navigation />
      <Products products={products} title={name.toUpperCase()} />
    </>
  );
};

export default FilteredCategoryPage;
