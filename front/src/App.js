import React, { useState, useEffect, useReducer, createContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import "./reset.css";
import styled from "styled-components";

import * as Api from "./api";
import { login } from "./redux/userSlice";

import MainPage from "./pages/Main/MainPage";
import LoginPage from "pages/User/LoginPage";
import RegisterPage from "pages/User/RegisterPage";
import MyPage from "pages/My/MyPage/MyPage";
import MarketPage from "pages/My/Market/MarketPage";
import ReviewsPage from "pages/My/MyReviews/ReviewsPage";
import InquiresPage from "pages/My/MyInquires/InquiresPage";

import ScrollToTop from "ScrollToTop";

export const UserStateContext = createContext(null);
export const DispatchContext = createContext(null);

function App() {
  const dispatch = useDispatch();

  const [isFetchCompleted, setIsFetchCompleted] = useState(false);

  const fetchCurrentUser = async () => {
    try {
      const res = await Api.get("user/current");
      const currentUser = res.data;

      dispatch(login(currentUser));
    } catch {
      console.log("%c SessionStorage에 토큰 없음.", "color: #d93d1a;");
    }

    setIsFetchCompleted(true);
  };

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  if (!isFetchCompleted) {
    return "loading...";
  }

  return (
    <Router>
      <ScrollToTop />
      <Container>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/mypage/reviews" element={<ReviewsPage />} />
          <Route path="/mypage/inquires" element={<InquiresPage />} />
          <Route path="/markets/:id" element={<MarketPage />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;

const Container = styled.div`
  width = 100vw;
  min-height: 100vh;
  background-color: #F2F2F2;
  display: flex;
  justify-content: center;
`;
