import styled from "styled-components";
import { ReturnUpForwardOutline } from 'react-ionicons'

export default function Repost() {
  return (
    <RepostContainer>
      <ReturnUpForwardOutline
        color={"#ff0f0f"}
        title={Repost}
        height={"12px"}
        width= {"20px"}
      />
      <NumberOfRePosts>0 re-posts</NumberOfRePosts>
    </RepostContainer>
  );
}

const RepostContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 22px;
`;

const NumberOfRePosts = styled.div`
  font-size: 11px;
`;


