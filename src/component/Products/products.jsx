import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Loading from "../../more/Loader";
import ProductCard from "./ProductCard";
import { clearErrors, getProduct } from "../../actions/productActions";
import Pagination from "react-js-pagination";
import "./Product.css"; // Import the CSS file
import Typography from "@material-ui/core/Typography";
import MetaData from "../../more/MetaData";
import BottomTab from "../../more/BottomTab";
import Header from "../Home/Header";
import Footer from "../../more/Footer";

const categories = [
  "Denim",
  "Party",
  "Business and formal",
  "Casual wear",
  "Dresses",
  "Footwear",
  "Formal wear",
  "Jackets",
  "Jeans",
  "Vests",
  "Lingerie",
  "Sport wear",
];

const Products = ({ match }) => {
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);
  const [category, setCategory] = useState("");

  const { products, loading, error, productsCount, resultPerPage } =
    useSelector((state) => state.products);

  const keyword = match.params.keyword;

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };

  useEffect(() => {
    if (error) {
      alert(error);
      dispatch(clearErrors());
    }
    dispatch(getProduct(keyword, currentPage, category));
  }, [dispatch, keyword, currentPage, category, error]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <MetaData title="Products" />
          <Header />

          {/* Dropdown and Current Location Display */}
          <div className="dropdown-container">
            {/* Dropdown for Categories */}
            <div>
              <select
                onChange={(e) => setCategory(e.target.value)}
                value={category}
                className="category-dropdown"
              >
                <option value="">Select Category</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            {/* Current Location / Project Display */}
            <div>
              <p className="current-category">
                {category
                  ? `Current Category: ${category}`
                  : "Please select a category to proceed."}
              </p>
            </div>
          </div>

          {/* Featured Products Section */}
          <div>
            {products.length === 0 ? (
              ""
            ) : (
              <h2 className="featured-title">Featured Products</h2>
            )}
            <div className="sidebar-product">
              

              {products.length === 0 ? (
                <span className="no-products">No Product Found ....</span>
              ) : (
                <div className="products">
                  {products &&
                    products.map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                </div>
              )}
            </div>

            {/* Pagination Section */}
            <div className="pagination-box">
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resultPerPage}
                totalItemsCount={productsCount}
                onChange={setCurrentPageNo}
                nextPageText="Next"
                prevPageText="Prev"
                firstPageText="First"
                lastPageText="Last"
                itemClass="page-item"
                linkClass="page-link"
                activeClass="pageItemActive"
                activeLinkClass="pageLinkActive"
              />
            </div>
          </div>
          <Footer />
          <BottomTab />
        </>
      )}
    </>
  );
};

export default Products;
