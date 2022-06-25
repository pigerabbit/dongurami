import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const MyListTabs = ({ tab, setTab, tabNames, isWishList }) => {
  const navigate = useNavigate();

  const handleClick = (tab) => () => {
    setTab(tab);
    const route = isWishList ? "/wishlist" : "/purchaselist";
    navigate(`${route}?tab=${tab}`, { replace: true });
  };

  return (
    <TabsContainer>
      <Tab
        onClick={handleClick("tab1")}
        borderBottom={tab === "tab1" ? "2px solid #ffb564" : "none"}
      >
        <span>{tabNames[0]}</span>
      </Tab>
      <Tab
        onClick={handleClick("tab2")}
        borderBottom={tab === "tab2" ? "2px solid #ffb564" : "none"}
      >
        <span>{tabNames[1]}</span>
      </Tab>
    </TabsContainer>
  );
};

export default MyListTabs;

const TabsContainer = styled.div`
  position: relative;
  margin-top: 5px;
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: space-evenly;
`;

const Tab = styled.div`
  cursor: pointer;
  width: 48%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  border-bottom: ${(props) => props.borderBottom};
  span {
    pointer-events: none;
  }
`;
