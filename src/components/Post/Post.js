import styled from "styled-components";
import { useContext, useState, useRef, useEffect } from "react";
import { useHistory } from "react-router";
import UserContext from "../../context/UserContext";
import Edit from "./Edit";
import { Trash, Create, LocationSharp } from "react-ionicons";
import ReactHashtag from "react-hashtag";
import DeletePost from "./DeletePost";
import Likepost from "./Likepost";
import ModalMaps from "./ModalMaps";
import DialogLink from "./DialogLink";
import ReactPlayer from "react-player/youtube";
import getYouTubeID from "get-youtube-id";

export default function Post({
  posts,
  setRefresh,
  setLastId,
  index,
  postsArray,
}) {
  const [likes, setLikes] = useState(posts.likes.length);
  const [message, setMessage] = useState({ text: posts.text });
  const [edit, setEdit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [editSucess, setEditSucess] = useState(false);
  const inputRef = useRef(null);
  const history = useHistory();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [openMaps, setOpenMaps] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  const { accountInformation } = useContext(UserContext);
  if (index === postsArray.length - 1) {
    setLastId(posts.id);
  }
  useEffect(() => {
    if (edit) {
      inputRef.current.focus();
    }
  }, [edit]);

  return (
    <Structure>
      <LeftContainer>
        <img
          onClick={() => history.push(`/user/${posts.user.id}`)}
          src={posts.user.avatar}
          alt="avatar do usuário"
        />
        <Likepost posts={posts} likes={likes} setLikes={setLikes} />
      </LeftContainer>
      <RightContainer>
        <div>
          <div>
            <h1 onClick={() => history.push(`/user/${posts.user.id}`)}>
              {posts.user.username}
            </h1>
            {posts.geolocation !== undefined ? (
              <>
                <LocationSharp
                  onClick={() => setOpenMaps(true)}
                  color={"#ffffff"}
                  height="16px"
                  width="16px"
                />
                <ModalMaps
                  openMaps={openMaps}
                  setOpenMaps={setOpenMaps}
                  posts={posts}
                />
              </>
            ) : (
              ""
            )}
          </div>

          {posts.user.id === accountInformation.user.id ? (
            <div>
              <Create
                onClick={() => {
                  setEdit(!edit);
                  setMessage(message);
                }}
                color={"#ffffff"}
                height="18px"
                width="18px"
              />
              <Trash
                onClick={() => setModalIsOpen(true)}
                color={"#ffffff"}
                height="18px"
                width="18px"
              />
              <DeletePost
                postsId={posts.id}
                modalIsOpen={modalIsOpen}
                setModalIsOpen={setModalIsOpen}
              />
            </div>
          ) : (
            ""
          )}
        </div>

        <h2>
          {edit ? (
            <Edit
              message={message}
              setMessage={setMessage}
              accountInformation={accountInformation}
              posts={posts}
              inputRef={inputRef}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
              setEditSucess={setEditSucess}
              setEdit={setEdit}
              setRefresh={setRefresh}
            />
          ) : (
            <ReactHashtag
              renderHashtag={(hashtag) => (
                <a href={`/hashtag/${hashtag.substring(1)}`}>{hashtag}</a>
              )}
            >
              {editSucess ? message.text : posts.text}
            </ReactHashtag>
          )}
        </h2>
        {getYouTubeID(posts.link) !== null ? (
          <PositionPlayer>
            <ReactPlayer width="100%" url={posts.link} />
            <a href={posts.link}>{posts.link}</a>
          </PositionPlayer>
        ) : (
          <>
            <LinkSheet onClick={() => setOpenDialog(true)}>
              <LinkText>
                <h1>{posts.linkTitle}</h1>
                <h2>{posts.linkDescription}</h2>
                <h3>{posts.link}</h3>
              </LinkText>
              <LinkImage src={posts.linkImage} alt="link" />
            </LinkSheet>
            <DialogLink
              openDialog={openDialog}
              setOpenDialog={setOpenDialog}
              posts={posts}
            />
          </>
        )}
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
  width: 503px;
  margin-left: 19px;

  overflow: hidden;

  > div {
    display: flex;
    justify-content: space-between;

    > div {
      display: flex;
      align-items: center;

      h1 {
        font-size: 19px;
        margin-bottom: 7px;
        margin-right: 7px;
        cursor: pointer;

        @media (max-width: 640px) {
          width: 100%;

          font-size: 17px;
        }
      }
    }

    div {
      display: flex;
      justify-content: space-between;
      cursor: pointer;
    }
  }

  > h2 {
    font-size: 17px;
    margin-bottom: 15px;
    color: #b7b7b7;
    cursor: default;

    a {
      cursor: pointer;
      text-decoration: none;
      font-weight: bold;
      color: #fff;
    }

    @media (max-width: 640px) {
      font-size: 15px;
    }
  }
`;

const PositionPlayer = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  a {
    margin-top: 6px;
    font-size: 17px;
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
  cursor: pointer;

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
    line-height: 19px;
    color: #cecece;

    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;

    @media (max-width: 640px) {
      font-size: 11px;
    }
  }

  h2 {
    font-size: 11px;
    line-height: 13px;
    color: #9b9595;

    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;

    @media (max-width: 640px) {
      font-size: 9px;
    }
  }

  h3 {
    font-size: 11px;
    line-height: 13px;
    color: #cecece;

    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;

    @media (max-width: 640px) {
      font-size: 9px;
    }
  }
`;
