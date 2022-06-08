import styled from "styled-components";
import { productList } from "../MyMockData";
import MyWishListCard from "./MyWishListCard";

const ProductWishListTab = () => {
  return (
    <Container>
      <Count>
        총 <strong>{productList.length}</strong>개
      </Count>
      <ProductWishListWrapper>
        {productList.map((product) => (
          <MyWishListCard
            key={product.id}
            title={product.name}
            price={product.price}
            salePrice={product.salePrice}
            discountRate={product.discountRate}
            contentPercent={["73%", "68%"]}
          />
        ))}
      </ProductWishListWrapper>
    </Container>
  );
};

export default ProductWishListTab;

const Container = styled.div`
  width: 100%;
  max-width: 770px;
  min-width: 360px;
  height: 100%;
  margin-top: 10px;
  overflow-y: scroll;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const Count = styled.p`
  margin: 2%;
`;

const ProductWishListWrapper = styled.div`
  width: 100%;
`;