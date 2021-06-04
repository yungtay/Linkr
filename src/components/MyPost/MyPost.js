import SideBar from "../SideBar/Sidebar";
import styled from "styled-components";
import { useEffect, useContext, useState } from "react";
import axios from "axios";
import UserContext from "../../context/UserContext";
import Post from "../Post/Post";

export default function MyPosts() {
  const { accountInformation } = useContext(UserContext);
  const [myPosts, setMyPosts] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [lastId, setLastId] = useState(null);

  useEffect(() => {
    setRefresh(false);
    const config = {
      headers: {
        Authorization: `Bearer ${accountInformation.token}`,
      },
    };
    const request = axios.get(
      `https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/users/${accountInformation.user.id}/posts`,
      config
    );
    request.then((resp) => {
      setMyPosts(resp.data.posts);
    });
  }, [accountInformation.token, accountInformation.user.id, refresh]);
  return (
    <>
      <Application>
        <Title>my posts</Title>
        <Container>
          {myPosts ? (
            <>
<<<<<<< HEAD
              {myPosts.map((myPost) => {
                return (
                  <Post
                    key={myPost.repostId || myPost.id}
                    posts={myPost}
                    setRefresh={setRefresh}
                    rePostCount={myPost.repostCount}
                  ></Post>
                );
=======
              {myPosts.map((myPost, i) => {
                return <Post key={ myPost.repostId || myPost.id} posts={myPost} setRefresh={setRefresh} rePostCount={myPost.repostCount} index={i} setLastId={setLastId} postsArray={myPosts}></Post>;
>>>>>>> 06ae05e2e0768b332fd530b59e3ab83985f8b959
              })}
            </>
          ) : (
            <div>Carregando</div>
          )}

          <SideBar />
        </Container>
      </Application>
    </>
  );
}

const Application = styled.div`
  width: 937px;
  height: 100%;
  position: relative;
  margin: 0 auto;
  @media (max-width: 640px) {
    width: 100%;
    padding: 0px 10px;
  }
`;

const Title = styled.div`
  width: 100%;
  margin-bottom: 43px;
  font-size: 43px;
  font-weight: bold;
  font-family: "Oswald", sans-serif;
  color: #fff;
  @media (max-width: 640px) {
    width: 100%;
    padding: 0px 10px;
  }
`;

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  width: 611px;
  @media (max-width: 640px) {
    width: 100%;
    padding: 0px 10px;
  }
`;
