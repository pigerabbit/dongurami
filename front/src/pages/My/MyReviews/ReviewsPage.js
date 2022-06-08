import React, { useEffect, useState } from "react";
import styled from "styled-components";
import * as Api from "api";

import MyPageLayout from "../MyPageLayout";
import ReviewCard from "./ReviewCard";
import { useSelector } from "react-redux";

const ReviewsPage = () => {
  const { user } = useSelector((state) => state.user);
  const [reviews, setReviews] = useState([]);

  const deleteReview = (id) => {
    const index = reviews.findIndex((review) => review.postId === id);
    setReviews((cur) => {
      const copy = [...cur];
      copy.splice(index, 1);
      return copy;
    });
  };

  const getReviews = async () => {
    if (user) {
      const res = await Api.get("posts", `${user.id}/review`);
      setReviews(res.data.payload);
    }
  };

  useEffect(() => {
    getReviews();
  }, []);

  return (
    <MyPageLayout pageName={"나의 후기"}>
      <Container>
        <TotalNumber>총 {reviews.length}건</TotalNumber>

        {reviews.map((review) => (
          <ReviewCard
            review={review}
            deleteReview={deleteReview}
            key={review.postId}
          />
        ))}

        {reviews.length === 0 && (
          <NoReviewContainer>
            <img
              src={`${process.env.PUBLIC_URL}/images/noContent.svg`}
              alt="no nearby"
            />
            작성된 후기가 없습니다.
          </NoReviewContainer>
        )}
      </Container>
    </MyPageLayout>
  );
};

export default ReviewsPage;

const Container = styled.div`
  padding-bottom: 80px;
  @media (max-width: 440px) {
    padding-bottom: 70px;
  }
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TotalNumber = styled.div`
  width: 90%;
  max-width: 550px;
  margin-top: 15px;
  margin-bottom: 5px;
  font-size: 2.5vw;
  @media (min-width: 620px) {
    font-size: 16px;
  }
`;

const NoReviewContainer = styled.div`
  margin-top: 10%;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 3vw;
  @media (min-width: 650px) {
    font-size: 20px;
  }

  > img {
    width: 50%;
    margin-bottom: 5%;
  }
`;