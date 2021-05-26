import styled from "styled-components";
import { HeartOutline } from "react-ionicons";
import { Heart } from "react-ionicons";
import { useState } from "react";

export default function Post() {
  const [toggle, setToggle] = useState(false);
  return (
    <Structure>
      <LeftContainer>
        <img
          onClick={() => console.log("Enviar pro perfil da pessoa")}
          src="https://pbs.twimg.com/profile_images/1382815821148385287/evfQlSZ__400x400.jpg"
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
        <p>14 likes</p>
      </LeftContainer>
      <RightContainer>
        <h1 onClick={() => console.log("Enviar pro perfil da pessoa")}>
          Juvenal Juvêncio
        </h1>
        <h2>
          Muito maneiro esse tutorial de Material UI com React, deem uma olhada!
          <strong onClick={() => console.log("Levar para o link da hashtag")}>
            {" "}
            #react
          </strong>
        </h2>
        <LinkSheet onClick={() => console.log("Levar para o link")}>
          <LinkText>
            <h1>Como aplicar o Material UI em um projeto React</h1>
            <h2>
              Hey! I have moved this tutorial to my personal blog. Same content,
              new location. Sorry about making you click through to another
              page.
            </h2>
            <h3>https://medium.com/@pshrmn/a-simple-react-router</h3>
          </LinkText>
          <img
            src="https://pbs.twimg.com/profile_images/1382815821148385287/evfQlSZ__400x400.jpg"
            alt="avatar do usuário"
          />
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
  background-color: blue;
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

const LinkSheet = styled.div`
  width: 503px;
  height: 155px;

  border: 1px solid #4d4d4d;
  border-radius: 11px;

  display: flex;
  justify-content: space-between;

  img {
    border-radius: 0px 12px 13px 0px;
  }
`;

const LinkText = styled.div`
  width: 100%;
  padding: 24px 27px 24px 20px;
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
