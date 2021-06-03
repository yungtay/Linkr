import styled from "styled-components";
import { useContext, useState, useRef, useEffect } from "react";
import { useHistory } from "react-router";
import UserContext from "../../context/UserContext";
import Edit from "./Edit";
import { Trash, Create } from "react-ionicons";
import ReactHashtag from "react-hashtag";
import DeletePost from "./DeletePost";
import Likepost from "./Likepost";
import Repost from "./Repost"
import { RepeatSharp } from 'react-ionicons'

export default function Post({ posts, setRefresh, rePostCount }) {
  const [likes, setLikes] = useState(posts.likes.length);
  const [message, setMessage] = useState({ text: posts.text });
  const [edit, setEdit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [editSucess, setEditSucess] = useState(false);
  const inputRef = useRef(null);
  const history = useHistory();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalIsOpenRepost, setModalIsOpenRepost] = useState(false);

  const { accountInformation } = useContext(UserContext);

  console.log(posts)

  useEffect(() => {
    if (edit) {
      inputRef.current.focus();
    }
  }, [edit]);

  console.log(posts.repostedBy)

  return (
    <RepostContainer reposted={posts.repostedBy}>
      <WhoResposted reposted={posts.repostedBy}>
        <RepeatSharp
          color={"#ffffff"}
          height={"15px"}
          width={"25px"}
        />
        Re-posted by <strong>{posts.repostedBy?.username}</strong>
      </WhoResposted>
      <Structure>
        <LeftContainer>
          <img
            onClick={() => history.push(`/user/${posts.id}`)}
            src={posts.user.avatar}
            alt="avatar do usuário"
          />
          <Likepost posts={posts} likes={likes} setLikes={setLikes} />
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
            <h1 onClick={() => history.push(`/user/${posts.user.id}`)}>
              {posts.user.username}
            </h1>
            {posts.user.id  === accountInformation.user.id ? (
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
                onHashtagClick={(hashtag) =>
                  history.push(`/hashtag/${hashtag.substring(1)}`)
                }
                renderHashtag={(hashtag) => <strong>{hashtag}</strong>}
              >
                {editSucess ? message.text : posts.text}
              </ReactHashtag>
            )}
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
    </RepostContainer>
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

    > h1 {
      font-size: 19px;
      margin-bottom: 7px;
      cursor: pointer;

      @media (max-width: 640px) {
        font-size: 17px;
      }
    }

    div {
      width: 45px;
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

    strong {
      cursor: pointer;
    }

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
  height: ${prop => prop.reposted ? "279px" : "253px"};
  width: 100%;

  display:flex;
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
  margin: auto 0 auto 13px;

  display: ${prop => prop.reposted ? "flex" : "none"};
  
  strong {
    margin-left: 4px;
  }
`;
