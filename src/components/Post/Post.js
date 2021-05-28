import styled from "styled-components";
import { useContext, useState } from "react";
import { useHistory } from "react-router";
import UserContext from "../../context/UserContext";
import { Trash, Create } from "react-ionicons";
import ReactHashtag from "react-hashtag";
import Likepost from "./Likepost";
import ReactTooltip from "react-tooltip";

export default function Post({ posts }) {
  const [likes, setLikes] = useState(posts.likes.length);
  const history = useHistory();
  const { accountInformation } = useContext(UserContext);

  return (
    <Structure>
      <LeftContainer>
        <img
          onClick={() => history.push(`/user/${posts.user.id}`)}
          src={posts.user.avatar}
          alt="avatar do usuário"
        />
        <Likepost posts={posts} likes={likes} setLikes={setLikes} />
        <p
          data-tip={
            posts.likes.length > 2
              ? `${
                  posts.likes[0]["user.username"] === undefined
                    ? posts.likes[0].username
                    : posts.likes[0]["user.username"]
                }, ${
                  posts.likes[1]["user.username"] === undefined
                    ? posts.likes[1].username
                    : posts.likes[1]["user.username"]
                } e outras ${posts.likes.length - 2} pessoas`
              : posts.likes.map(
                  (item) => " " + (item["user.username"] || item.username)
                )
          }
        >
          {likes === 1 ? `${likes} like` : `${likes} likes`}
        </p>
        <ReactTooltip
          className="tool-tip-custom"
          place="bottom"
          type="light"
          effect="solid"
        />
      </LeftContainer>
      <RightContainer>
        <div>
          <h1 onClick={() => history.push(`/user/${posts.user.id}`)}>
            {posts.user.username}
          </h1>
          {posts.user.id === accountInformation.user.id ? (
            <div>
              <Create
                onClick={() => console.log(`editar ${posts.id}`)}
                color={"#ffffff"}
                height="18px"
                width="18px"
              />
              <Trash
                onClick={() => console.log(`excluir ${posts.id}`)}
                color={"#ffffff"}
                height="18px"
                width="18px"
              />
            </div>
          ) : (
            ""
          )}
        </div>

        <h2>
          <ReactHashtag
            renderHashtag={(hashtagValue) => (
              <strong
                onClick={() =>
                  history.push(`/hashtag/${hashtagValue.substring(1)}`)
                }
              >
                {hashtagValue}
              </strong>
            )}
          >
            {posts.text}
          </ReactHashtag>
        </h2>

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

  @media (max-width: 640px) {
    width: 100%;
    border-radius: 0px;
    padding: 9px 15px 15px 15px;
  }
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

    cursor: pointer;
    @media (max-width: 640px) {
      width: 40px;
      height: 40px;
    }
  }

  p {
    font-size: 11px;
    cursor: default;

    @media (max-width: 640px) {
      font-size: 9px;
    }
  }
  .tool-tip-custom {
    height: 24px;
    font-weight: bold;
    color: #505050;
    background-color: rgba(255, 255, 255, 0.9);
    font-size: 11px;
    border-radius: 10px;
  }
`;

const RightContainer = styled.div`
  width: 100%;
  margin-left: 19px;

  overflow-x: hidden;

  > div {
    display: flex;
    justify-content: space-between;

    div {
      width: 45px;
      display: flex;
      justify-content: space-between;
    }
  }

  h1 {
    font-size: 19px;
    margin-bottom: 7px;
    cursor: pointer;

    @media (max-width: 640px) {
      font-size: 17px;
    }
  }

  h2 {
    font-size: 17px;
    margin-bottom: 15px;
    color: #b7b7b7;
    cursor: default;

    @media (max-width: 640px) {
      font-size: 15px;
    }
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
    width: 100%;
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
  height: 100%;
  padding: 24px 10px 24px 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;

  h1 {
    font-size: 16px;
    color: #cecece;
    max-height: 32px;
    overflow: hidden;

    @media (max-width: 640px) {
      font-size: 11px;
      max-height: 33px;
    }
  }

  h2 {
    font-size: 11px;
    color: #9b9595;
    max-height: 33px;
    overflow: hidden;

    @media (max-width: 640px) {
      font-size: 9px;
      max-height: 27px;
    }
  }

  h3 {
    font-size: 11px;
    color: #cecece;
    max-height: 33px;
    overflow: hidden;

    @media (max-width: 640px) {
      font-size: 9px;
      max-height: 18px;
    }
  }
`;
