import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import * as Api from "api";

import ProductsTopBar from "./ProductsTopBar";
import ProductCard from "./ProductCard";
import SideBar from "components/SideBar";
import Category from "components/Category";
import TabBar from "components/TabBar";
import ConfirmationIcon from "components/ConfirmationIcon";
import InfiniteScroll from "./InfiniteScroll";

import useDidMountEffect from "hooks/useDidMountEffect";

const options = [
  { eng: "groups", kor: "추천순" },
  { eng: "salePrice", kor: "저가순" },
  { eng: "reviews", kor: "후기많은순" },
  { eng: "views", kor: "조회수순" },
];

const ProductsPage = () => {
  const [isOpenSideBar, setIsOpenSideBar] = useState(false);
  const [option, setOption] = useState("groups");
  const [products, setProducts] = useState([]);
  const [totalProductsNum, setTotalProductsNum] = useState(1);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [confirmationIcon, setConfirmationIcon] = useState({
    show: false,
    backgroundColor: "#70BD86;",
    color: "",
    icon: "",
    text: "",
  });

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const category = searchParams.get("category");
  const search = searchParams.get("search");

  const getProductData = async () => {
    if (page === 0) return;

    if (page > totalPage) return;

    try {
      setLoading(true);

      if (category) {
        const res = await Api.get("products", "", {
          page: page,
          perPage: 6,
          category: category,
          option: option,
        });

        setProducts((cur) => [...cur, ...res.data.payload.resultList]);
        setTotalProductsNum(res.data.payload.len);
        setTotalPage(res.data.payload.totalPage);
      } else {
        const res = await Api.get("products/search", "", {
          page: page,
          perPage: 6,
          search: search,
          option: option,
        });

        setProducts((cur) => [...cur, ...res.data.payload.resultList]);
        setTotalProductsNum(res.data.payload.len);
        setTotalPage(res.data.payload.totalPage);
      }
    } catch (e) {
      setProducts([]);
      setTotalProductsNum(0);
    }
    setLoading(false);
  };

  useDidMountEffect(() => {
    setProducts([]);
    setTotalPage(1);
    setPage(0);
  }, [category, search]);

  useEffect(() => {
    getProductData();
  }, [page]);

  return (
    <Container noProduct={products?.length === 0}>
      <ProductsTopBar
        search={search}
        category={category}
        setIsOpenSideBar={setIsOpenSideBar}
      />

      <ProductsInfo>
        <span>총 {totalProductsNum}건</span>
        <SelectBox>
          {options.map(({ eng, kor }) => (
            <Option
              key={eng}
              selected={option === eng}
              onClick={() => {
                setOption(eng);
                setPage(0);
                setProducts([]);
              }}
            >
              {kor}
            </Option>
          ))}
        </SelectBox>
      </ProductsInfo>

      {confirmationIcon.show && <ConfirmationIcon style={confirmationIcon} />}

      <ProductsCardContainer>
        <>
          {products.map((product) => (
            <ProductCard
              product={product}
              setConfirmationIcon={setConfirmationIcon}
              key={product.id}
            />
          ))}
        </>
      </ProductsCardContainer>

      {loading && (
        <Loading>
          <div></div>
          <div></div>
          <div></div>
        </Loading>
      )}

      {page !== totalPage && !loading && <InfiniteScroll setPage={setPage} />}

      {totalProductsNum === 0 && !loading && (
        <NoProductContainer>
          <img
            src={`${process.env.PUBLIC_URL}/images/noProduct.svg`}
            alt="no product"
          />
          <span>상품이 존재하지 않습니다.</span>
        </NoProductContainer>
      )}

      <SideBar
        title={"카테고리"}
        isOpenSideBar={isOpenSideBar}
        setIsOpenSideBar={setIsOpenSideBar}
      >
        <Category
          setIsOpenSideBar={setIsOpenSideBar}
          setProducts={setProducts}
          setPage={setPage}
        />
      </SideBar>

      <TabBar />
    </Container>
  );
};

export default ProductsPage;

const Container = styled.div`
  padding-bottom: ${({ noProduct }) => (noProduct ? "0;" : "110px;")}
  position: relative;
  width: 100%;
  max-width: 770px;
  min-width: 360px;
  min-height: 100vh;
  background-color: #ffffff;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ProductsInfo = styled.div`
  width: 84%;
  margin: 25px 8%;
  margin-left: 8%;
  display: flex;
  align-items: center;
  font-size: 12px;
  @media (min-width: 600px) {
    font-size: 14px;
  }

  > span {
    font-weight: 600;
  }
`;

const SelectBox = styled.div`
  margin-left: 15px;
  display: flex;
`;

const Option = styled.div`
  cursor: pointer;
  padding: 6px 10px;
  margin: 0 2px;
  border-radius: 20px;
  transition: box-shadow 0.4s;
  ${({ selected }) => {
    if (selected) return "box-shadow: 0 0 6px #636363;";
  }}
  @media (max-width: 370px) {
    font-size: 11px;
  }
`;

const ProductsCardContainer = styled.div`
  width: 84%;
  @media (min-width: 600px) {
    margin-top: 50px;
  }
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 15px;
  @media (min-width: 600px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const rotate = keyframes`
  0% {
    transform: rotate(0);
  }
  25% {
    transform: rotate(180deg);
  }
  50% {
    transform: rotate(180deg);
  }
  75% {
    transform: rotate(360deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const Loading = styled.div`
  margin-top: 40px;
  margin-bottom: 20px;
  width: 100px;
  height: 100px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  animation: ${rotate} 2s linear infinite;

  > div {
    background-color: #f79831;
    width: 9px;
    height: 9px;
    border-radius: 50%;
  }
`;

const NoProductContainer = styled.div`
  width: 100%;
  max-width: 770px;

  display: flex;
  flex-direction: column;
  align-items: center;

  > img {
    width: 50%;
  }

  > span {
    margin-top: 50px;
    font-size: 4vw;
    @media (min-width: 770px) {
      font-size: 32px;
    }
  }
`;
