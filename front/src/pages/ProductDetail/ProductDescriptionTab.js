import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import * as Api from "api";

import { faHeart as fullHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as Heart } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ProductDescriptionTab = ({ product, seller }) => {
  const navigate = useNavigate();

  const [wish, setWish] = useState(false);

  const {
    name,
    price,
    salePrice,
    discountRate,
    shippingFee,
    shippingFeeCon,
    images,
    description,
    descriptionImg,
  } = product;

  const [
    priceStr,
    salePriceStr,
    discountRateStr,
    shippingFeeStr,
    shippingFeeConStr,
  ] = [price, salePrice, discountRate, shippingFee, shippingFeeCon].map((v) =>
    v.toLocaleString()
  );

  let shippingConStr = "";
  if (shippingFeeCon > 0) {
    shippingConStr = ` (${shippingFeeConStr}원 이상 무료 배송)`;
  }

  const putWish = async () => {
    try {
      const res = await Api.put(`toggle/product/${product.id}`);
      setWish((cur) => !cur);
    } catch (e) {
      console.log("wish put 실패");
    }
  };

  const getWish = async () => {
    try {
      const res = await Api.get("toggle/products");
      if (res.data.indexOf(product.id) !== -1) setWish(true);
      else setWish(false);
    } catch (e) {
      console.log("wish get 실패");
    }
  };

  useEffect(() => {
    getWish();
  }, []);

  return (
    <Container>
      <ImgContainer>
        <img id="productImg" src={images} alt={product.name + " 사진"} />
        {/* <img
          id="productImg"
          src="/test_images/strawberry.jpeg"
          alt={product.name + " 사진"}
        /> */}
      </ImgContainer>
      <Seller
        onClick={() => {
          navigate("/store");
        }}
      >
        {seller.business[0].businessName}
        <GoSeller />
      </Seller>
      <InfoContainer>
        {name}
        <span onClick={putWish}>
          {wish && <FontAwesomeIcon icon={fullHeart} size="1x" />}
          {!wish && <FontAwesomeIcon icon={Heart} size="1x" />}
        </span>
        <PriceInfo>
          <DiscountRate>{discountRateStr}%</DiscountRate>
          <Price>
            <p id="salePrice">{salePriceStr} 원</p>
            <p id="price">{priceStr} 원</p>
          </Price>
        </PriceInfo>
        <p id="shippingFee">
          배송비 {shippingFeeStr}원{shippingConStr}
        </p>
      </InfoContainer>
      <DescriptionContainer>
        {description && <div>{description}</div>}
        {descriptionImg && (
          <img
            id="descriptionImg"
            src={descriptionImg}
            alt={name + " 설명 사진"}
          />
        )}
        {/* <img
          id="descriptionImg"
          src="/test_images/pigerabbit.png"
          alt={name + " 설명 사진"}
        /> */}
      </DescriptionContainer>
    </Container>
  );
};

export default ProductDescriptionTab;

const Container = styled.div`
  width: 100%;
  min-width: 360px;
  max-width: 770px;
  background-color: #ffffff;
`;

const ImgContainer = styled.div`
  width: 95%;
  margin: 0 auto;
  height: 360px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: #f8f8f8;

  #productImg {
    width: auto;
    height: 360px;
  }
`;

const Seller = styled.div`
  margin: 20px 0 15px 20px;
  font-size: 15px;
  font-weight: bold;
  cursor: pointer;
`;

const GoSeller = styled.i`
  border: solid black;
  border-width: 0 1px 1px 0;
  display: inline-block;
  padding: 5px;
  margin-left: 5px;
  transform: rotate(-45deg);
  -webkit-transform: rotate(-45deg);
`;

const InfoContainer = styled.div`
  margin-left: 20px;

  #shippingFee {
    margin-top: 10px;
    font-size: 13px;
  }

  span {
    position: absolute;
    right: 30px;
    color: #ff0000;
  }
`;

const PriceInfo = styled.div`
  margin-top: 13px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`;

const DiscountRate = styled.div`
  display: inline-block;
  font-size: 34px;
  color: #ff9b2f;
`;

const Price = styled.div`
  display: inline-block;
  margin-left: 10px;
  #salePrice {
    font-weight: bold;
    font-size: 20px;
  }
  #price {
    margin-top: 5px;
    font-size: 15px;
    color: #636363;
    text-decoration: line-through solid 1px;
  }
`;

const DescriptionContainer = styled.div`
  position: relative;
  margin: 15px auto;
  padding-top: 15px;
  width: 95%;
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
  border-top: 1px solid #d0d0d0;

  img {
    width: 100%;
    height: auto;
  }
`;