import styled from "styled-components";
import { useContext } from "react";
import axios from 'axios';
import UserContext from "../../context/UserContext";
import { ChatbubbleEllipsesOutline } from 'react-ionicons'
export default function Comment({ CommentCount, postId, setComments, setRefresh }) {
    const { accountInformation } = useContext(UserContext);

    function comentClick() {
        if(CommentCount === 0){
            return
        }
      const config = {
        headers: { Authorization: `Bearer ${accountInformation.token}` },
      };
      const request = axios.get(
        `https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/posts/${postId}/comments`,
        config
      );
      request.then((r) => {
        setComments(r.data.comments);
        setRefresh(true);
      });

      request.catch(() => {
        alert("Não foi possível abrir os comentários !");
      });
    }
  return (
    <ContainerCommentNumber>
      <ChatbubbleEllipsesOutline
        color={"#ffffff"}
        height={"20px"}
        width={"25px"}
        style={{ cursor: "pointer" }}
        onClick={() => comentClick()}
      />
      <NumberOfComment>{CommentCount} comments</NumberOfComment>
    </ContainerCommentNumber>
  );
}

const ContainerCommentNumber = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 12px;
`;

const NumberOfComment = styled.div`
  font-size: 11px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  text-align: center;
`;