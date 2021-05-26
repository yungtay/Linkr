import styled from "styled-components";
import { HeartOutline } from "react-ionicons";
import { Heart } from "react-ionicons";
import { useState } from "react";
import { useHistory } from "react-router";

export default function Post({ posts }) {
  const [toggle, setToggle] = useState(false);
  const history = useHistory();

  return (
    <Structure>
      <LeftContainer>
        <img
          onClick={() => history.push(`/user/${posts.user.id}`)}
          src={posts.user.avatar}
          alt="avatar do usuário"
        />
        {!toggle ? (
          <HeartOutline
            onClick={() => setToggle(!toggle)}
            color={"#ffffff"}
            height="18px"
            width="20px"
          />
        ) : (
          <Heart
            onClick={() => setToggle(!toggle)}
            color={"#dc1818"}
            height="18px"
            width="20px"
          />
        )}
        <p>
          {posts.likes.length === 1
            ? `${posts.likes.length} like`
            : `${posts.likes.length} likes`}
        </p>
      </LeftContainer>
      <RightContainer>
        <h1 onClick={() => history.push(`/user/${posts.user.id}`)}>
          {posts.user.username}
        </h1>
        <h2>{posts.text}</h2>
        <LinkSheet href={posts.link} target="_blank">
          <LinkText>
            <h1>{posts.linkTitle}</h1>
            <h2>{posts.linkDescription}</h2>
            <h3>{posts.link}</h3>
          </LinkText>
          <LinkImage src={posts.linkImage} alt="link" />
        </LinkSheet>
      </RightContainer>
    </Structure>
  );
}

const Structure = styled.div`
  width: 100%;

  margin-bottom: 29px;

  color: #fff;

  border-radius: 16px;
  padding: 20px;
  background-color: #171717;
  display: flex;
`;

const LeftContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  img {
    width: 50px;
    height: 50px;

    border-radius: 50%;
    margin-bottom: 19px;
  }

  p {
    font-size: 11px;
  }
`;

const RightContainer = styled.div`
  width: 100%;
  margin-left: 19px;

  h1 {
    font-size: 19px;
    margin-bottom: 7px;
  }

  h2 {
    font-size: 17px;
    margin-bottom: 15px;
    color: #b7b7b7;
  }
`;

const LinkSheet = styled.a`
  width: 503px;
  height: 155px;

  border: 1px solid #4d4d4d;
  border-radius: 11px;

  display: flex;
  justify-content: space-between;

  @media (max-width: 640px) {
    width: calc(100vh - 20px);
  }
`;

const LinkImage = styled.div`
  width: 153px;
  height: 100%;
  background-image: url(${(props) => props.src});
  background-position: center;
  background-size: cover;
  border-radius: 0px 12px 13px 0px;
`;

const LinkText = styled.div`
  width: 350px;
  padding: 24px 10px 24px 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  h1 {
    font-size: 16px;
    color: #cecece;
  }

  h2 {
    font-size: 11px;
    color: #9b9595;
  }

  h3 {
    font-size: 11px;
    color: #cecece;
  }
`;
