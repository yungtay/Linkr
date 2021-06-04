import axios from "axios";
import { useContext, useEffect, useState } from "react";
import Loader from "react-loader-spinner";
import styled from "styled-components";
import UserContext from "../../context/UserContext";
import Post from "../Post/Post";
import SideBar from "../SideBar/Sidebar";
import AddPost from "./AddPost";
import InfiniteScroll from "react-infinite-scroller";
import useInterval from "./useInterval";

export default function TimeLine() {
  const { accountInformation, whoYouFollow } = useContext(UserContext);
  const [posts, setPosts] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [lastId, setLastId] = useState(null);
  const [delay, setDelay] = useState(15000);
  useInterval(() => {
    const config = {
      headers: { Authorization: `Bearer ${accountInformation.token}` },
    };
    const request = axios.get(
      "https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/following/posts",
      config
    );
    request.then((response) => {
      setPosts(response.data.posts);
    });
    request.catch(() =>
      alert("Houve uma falha ao obter os posts, por favor atualize a página")
    );
  }, delay);
  useEffect(() => {
    setRefresh(false);
    const config = {
      headers: { Authorization: `Bearer ${accountInformation.token}` },
    };
    const request = axios.get(
      "https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/following/posts",
      config
    );
    request.then((response) => {
      setPosts(response.data.posts);
      
    });
    request.catch(() =>
      alert("Houve uma falha ao obter os posts, por favor atualize a página")
    );
  }, [refresh, accountInformation.token]);

  function loadMorePosts() {
    const config = {
      headers: { Authorization: `Bearer ${accountInformation.token}` },
    };
    const request = axios.get(
      `https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/posts?olderThan=${lastId}`,
      config
    );
    request.catch(() =>
      alert("Houve uma falha ao obter novos posts, por favor atualize a página")
    );
    request.then((response) => {
      setPosts([...posts, ...response.data.posts]);
    });
  }

  return (
    <>
      <Application>
        <Title>timeline</Title>
        <Container>
          <Posts>
            {!posts ? (
              <PositionLoader>
                <Loader type="Oval" color="#FFF" height={80} width={80} />
              </PositionLoader>
            ) : posts.length === 0 ? (
              <>
                <AddPost setRefresh={setRefresh} />
                <p>
                  {whoYouFollow?.length === 0
                    ? "Você não segue ninguém ainda, procure por perfis na busca"
                    : "Nenhuma publicação encontrada"}
                </p>
              </>
            ) : (
              <>
                <AddPost setRefresh={setRefresh} />
                <InfiniteScroll
                  pageStart={10}
                  loadMore={loadMorePosts}
                  hasMore={true || false}
                  loader={
                    <PositionLoader>
                      <Loader type="Oval" color="#FFF" height={80} width={80} />
                    </PositionLoader>
                  }
                >
                  {posts.map((item, i) => {
                    return (
                      <Post
                        key={item.repostId || item.id}
                        posts={item}
                        setRefresh={setRefresh}
                        setLastId={setLastId}
                        index={i}
                        postsArray={posts}
                        rePostCount={item.repostCount}
                        refresh={refresh}
                      />
                    );
                  })}
                </InfiniteScroll>
              </>
            )}
          </Posts>
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
    margin: 0;
  }
`;

const Title = styled.div`
  width: 100%;
  height: 43px;
  margin-bottom: 43px;
  font-size: 43px;

  font-weight: bold;
  font-family: "Oswald", sans-serif;

  color: #fff;

  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 640px) {
    font-size: 33px;
    padding-left: 17px;
  }
`;

const FollowUnFollow = styled.div`
  cursor: pointer;

  width: 112px;
  height: 31px;

  display: flex;
  justify-content: center;
  align-items: center;

  border-radius: 5px;
  background: ${(prop) => (prop.follow ? "white" : "#1877F2")};
  opacity: ${(prop) => (prop.loadingFollow ? 0.35 : 1)};
  pointer-events: ${(prop) => (prop.loadingFollow ? "none" : "initial")};

  color: ${(prop) => (prop.follow ? "#1877F2" : "white")};
  font-size: 14px;
  font-weight: 700;
  font-family: Lato;
`;

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const Posts = styled.div`
  width: 611px;
  height: 100%;
  background-color: #333;

  display: flex;
  flex-direction: column;
  align-items: center;

  > p {
    color: #fff;
    font-size: 30px;
  }

  @media (max-width: 640px) {
    width: 100%;
    height: 100%;
  }
`;

const PositionLoader = styled.div`
  width: 100%;
  margin-top: 50px;
  display: flex;
  justify-content: center;
`;
export { Application, Title, FollowUnFollow, Container, Posts, PositionLoader };
