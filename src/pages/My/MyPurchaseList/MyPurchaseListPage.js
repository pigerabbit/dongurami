import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

import MyWishListTabs from "../MyWishListTabs";
import ParticipatePurchaseListTab from "./ParticipatePurchaseListTab";
import OpenPurchaseListTab from "./OpenPurchaseListTab";
import * as Api from "api";
import MyPageLayout from "../MyPageLayout";

const MyPurchaseListPage = () => {
  const { user } = useSelector((state) => state.user);

  const [tab, setTab] = useState("tab1");
  const [participatedData, setParticipatedData] = useState(null);
  const [openedData, setOpenedData] = useState(null);

  const getOpenedGroupData = async () => {
    try {
      const res = await Api.get("groups/manager/true");
      const data = res.data.payload;
      setOpenedData(data);
    } catch (err) {
      console.log(err);
    }
  };

  const getParticipatedGroupData = async () => {
    try {
      const res = await Api.get("groups/manager/false");
      const data = res.data.payload;
      setParticipatedData(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getParticipatedGroupData();
    getOpenedGroupData();
  }, []);

  if (participatedData === null || openedData === null) {
    return "loading...";
  }

  return (
    <MyPageLayout pageName="공구 내역" previousPage="/mypage">
      <Container>
        <MyWishListTabs
          tab={tab}
          setTab={setTab}
          tabNames={["내가 참여한 공구", "내가 연 공구"]}
        />
        {tab === "tab1" && (
          <ParticipatePurchaseListTab
            participatedData={participatedData}
            userId={user?.id}
          />
        )}
        {tab === "tab2" && (
          <OpenPurchaseListTab openedData={openedData} userId={user?.id} />
        )}
      </Container>
    </MyPageLayout>
  );
};

export default MyPurchaseListPage;

const Container = styled.div`
  position: relative;
  width: 100%;
  max-width: 770px;
  min-width: 360px;
  background-color: #f6f6f6;
  padding-bottom: 220px;
`;

const WishListTitle = styled.div`
  width: 100%;
  height: 75px;
  background-color: #fff;
  h2 {
    text-align: center;
    line-height: 75px;
    color: #939393;
  }
`;
