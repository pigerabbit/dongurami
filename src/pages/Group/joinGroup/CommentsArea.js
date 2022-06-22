import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import * as Api from "api";

import CommentForm from "./CommentForm";
import CommentCard from "./CommentCard";

const CommentsArea = ({ group, setJoinedGroup, joinedGroup }) => {
  const { user } = useSelector((state) => state.user);

  const [comments, setComments] = useState([]);

  const getComments = async () => {
    try {
      const res = await Api.get(`posts`, "", {
        receiver: group.groupId,
        type: "groupChat",
      });
      if (res.data.success) {
        setComments(res.data.payload);
      }
    } catch (e) {
      console.log("댓글 get 실패");
    }
  };

  useEffect(() => {
    getComments();
  }, []);

  useEffect(() => {
    if (user && Object.keys(group).length > 0)
      setJoinedGroup(
        group.participants.filter((v) => v.userId === user.id).length > 0
      );
  }, [user]);

  return (
    <Container>
      {!joinedGroup && <Blur>댓글 읽기/작성은 공동구매 참여 후 가능</Blur>}
      <CommentsContainer>
        <h4>댓글 ({comments.length})</h4>
        <CommentForm setComments={setComments} joinedGroup={joinedGroup} />
        <div id="comments">
          {comments.length > 0 &&
            comments.map((comment) => (
              <CommentCard
                key={comment.postId}
                postId={comment.postId}
                content={comment.content}
                writerId={comment.writer}
                createdAt={comment.createdAt}
                setComments={setComments}
              />
            ))}
        </div>
      </CommentsContainer>
    </Container>
  );
};

export default CommentsArea;

const Container = styled.div`
  width: 100%;
  min-width: 360px;
  max-width: 770px;
  background-color: #ffffff;
  position: relative;
`;

const CommentsContainer = styled.div`
  padding: 10px 0;
  margin: 20px 20px 0px 20px;
  > h4 {
    margin-top: 3px;
  }
`;

const Blur = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  min-height: 70px;
  z-index: 5;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  -webkit-backdrop-filter: blur(5px);
  backdrop-filter: blur(5px);

  font-weight: bold;
  font-size: 17px;
`;
