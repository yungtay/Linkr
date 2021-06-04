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
import Repost from "./Repost";
import Comment from "./Comment"
import { RepeatSharp } from "react-ionicons";
import { PaperPlaneOutline } from 'react-ionicons'
import axios from 'axios';

export default function Post({
  posts,
  setRefresh,
  setLastId,
  index,
  postsArray,
  rePostCount,
  refresh
}) {
  const [likes, setLikes] = useState(posts.likes.length);
  const [message, setMessage] = useState({ text: posts.text });
  const [edit, setEdit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [editSucess, setEditSucess] = useState(false);
  const inputRef = useRef(null);
  const history = useHistory();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalIsOpenRepost, setModalIsOpenRepost] = useState(false);
  const [comments, setComments] = useState(null);
  const [myComment, setMyComments] = useState("")
  const [refreshComment, setRefreshComment] = useState(false);
  const [toggleComment, setToggleComment] = useState(false)
  const [openMaps, setOpenMaps] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  const { accountInformation, whoYouFollow } = useContext(UserContext);
  const config = {
    headers: { Authorization: `Bearer ${accountInformation.token}` },
  };
  
    if (index === postsArray?.length - 1) {
    setLastId(posts.id);
  }

  useEffect(() => {
    if (edit) {
      inputRef.current.focus();
    }
  }, [edit]);

  function submit(e) {
    e.preventDefault();
    const request = axios.post(
      `https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/posts/${posts.id}/comment`, {text: myComment},
      config
    );
    request.then(() => {
      setMyComments("")
      setRefreshComment(true)
    })
    request.catch(() => {
      alert("Não foi possível postar")
    })
  }

  return (
    <RepostContainer reposted={posts.repostedBy}>
      <WhoResposted reposted={posts.repostedBy}>
        <RepeatSharp color={"#ffffff"} height={"15px"} width={"25px"} />
        Re-posted by{" "}
        <strong onClick={() => history.push(`/user/${posts.repostedBy?.id}`)}>
          {posts.repostedBy?.username}
        </strong>
      </WhoResposted>
      <Structure>
        <LeftContainer>
          <img
            onClick={() => history.push(`/user/${posts.id}`)}
            src={posts.user.avatar}
            alt="avatar do usuário"
          />
          <Likepost posts={posts} likes={likes} setLikes={setLikes} />
          <Comment
            CommentCount={posts.commentCount}
            postId={posts.id}
            setComments={setComments}
            setRefresh={setRefresh}
            refreshComment={refreshComment}
            setRefreshComment={setRefreshComment}
            toggleComment={toggleComment}
            setToggleComment={setToggleComment}
            setMyComments={setMyComments}
            refresh={refresh}
          />
          <Repost
            rePostCount={rePostCount}
            postId={posts.id}
            modalIsOpenRepost={modalIsOpenRepost}
            setModalIsOpenRepost={setModalIsOpenRepost}
            setRefresh={setRefresh}
          />
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
            <div>
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
      {comments && toggleComment ? (
        <>
          {comments.map((c) => (
            <CommentSection key={c.id}>
              <img
                onClick={() => history.push(`/user/${c.user.id}`)}
                src={c.user.avatar}
                alt="avatar do usuário"
              />
              <UsersComments>
                <NameUserComment
                  onClick={() => history.push(`/user/${c.user.id}`)}
                >
                  {c.user.id === posts.user.id ? (
                    <CommentUserName>
                      {c.user.username}{" "}
                      <CommentUserInformation>
                        • post’s author
                      </CommentUserInformation>
                    </CommentUserName>
                  ) : whoYouFollow.includes(c.user.id) ? (
                    <CommentUserName>
                      {c.user.username}
                      <CommentUserInformation>
                        {" "}
                        • following
                      </CommentUserInformation>
                    </CommentUserName>
                  ) : (
                    c.user.username
                  )}
                </NameUserComment>
                {c.text}
              </UsersComments>
            </CommentSection>
          ))}
          <CommentSection>
            <img
              onClick={() =>
                history.push(`/user/${accountInformation.user.id}`)
              }
              src={accountInformation.user.avatar}
              alt="avatar do usuário"
            />
            <ContainerSendComment>
              <Form onSubmit={submit}>
                <SendComment
                  placeholder="write a comment..."
                  onChange={(e) => setMyComments(e.target.value)}
                  value={myComment}
                />
              </Form>
              <PaperPlaneOutline
                color={"#F3F3F3"}
                title={"Comment"}
                height="25px"
                width="25px"
                onClick={submit}
              />
            </ContainerSendComment>
          </CommentSection>
        </>
      ) : (
        ""
      )}
    </RepostContainer>
  );
}

const Structure = styled.div`
  width: 100%;

  margin-bottom: 29px;

  color: #fff;

  border-radius: 16px;
  padding: 20px 12px;
  background-color: #171717;
  display: flex;

  @media (max-width: 640px) {
    width: 100%;
    border-radius: 0px;
    padding: 9px 15px 15px 15px;
  }
`;

const LeftContainer = styled.div`
  width: 12%;
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
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;

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

const RepostContainer = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  background: #1e1e1e;
  border-radius: 16px;
  margin-bottom: 29px;

  ${Structure} {
    margin-bottom: 0;
  }
`;

const WhoResposted = styled.div`
  color: white;
  margin: 4.5px 0 4.5px 13px;
  
  display: ${(prop) => (prop.reposted ? "flex" : "none")};


  strong {
    margin-left: 4px;
    cursor: pointer;
  }
`;

const CommentSection = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: start;
  margin: 16px 25px;

  position: relative;

  &:after {
  position: absolute;
  content: '';
  border-bottom: 1px solid #353535;
  width: 100%;
  transform: translateX(-50%);
  bottom: -16px;
  left: 50%;
}

  img {
    width: 39px;
    height: 39px;

    border-radius: 50%;
    margin-right: 18px;

    cursor: pointer;
    @media (max-width: 640px) {
      width: 39px;
      height: 39px;
    }
  }
`;

const UsersComments = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;

  font-size: 14px;
  color: #ACACAC;
  word-break: break-all;
`;

const NameUserComment = styled.div`
  color: #f3f3f3;
  font-size: 14px;
  font-weight: 700;

  margin-bottom: 10px;
  cursor: pointer;
`;

const ContainerSendComment = styled.div`
width: 100%;
display: flex;
justify-content: space-between;
align-items: center;
padding-right: 17px;

background: #252525;
border-radius: 8px;
`

const SendComment = styled.input`
  width: 100%; 
  height: 39px;

  background: none;
  border: 0px solid;
  outline: none;

  padding-left: 16px;
  color: #575757;
  font-style: italic;
  font-size: 14px;
`;

const CommentUserName = styled.div`
  display: flex;
  justify-content: center;
`;

const CommentUserInformation = styled.div`
  margin-left: 5px;
  color: #565656;
  font-size: 14px;
  font-weight: 400;
`;

const Form = styled.form`
  width: 90%;
`;

