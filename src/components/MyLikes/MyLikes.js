import { useContext, useEffect, useState } from "react";
import Loader from "react-loader-spinner";
import UserContext from "../../context/UserContext";
import {
  Application,
  Title,
  Container,
  Posts,
  PositionLoader,
} from "../TimeLine/TimeLine";
import Post from "../Post/Post";
import SideBar from "../SideBar/Sidebar";
import axios from "axios";

export default function MyLikes() {
  const { accountInformation } = useContext(UserContext);
  const [posts, setPosts] = useState([]);
  const [refresh, setRefresh] = useState(true);
  const [lastId, setLastId] = useState(null);

  useEffect(() => {
    const config = {
      headers: { Authorization: `Bearer ${accountInformation.token}` },
    };
    const request = axios.get(
      "https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/posts/liked",
      config
    );
    request.then((response) => {
      setPosts(response.data.posts);
      setRefresh(false);
    });
    request.catch(() =>
      alert(
        "Houve algum erro na comunicação com o servidor, recarregue a página"
      )
    );
  }, [accountInformation.token]);

  return (
    <Application>
      <Title>my likes</Title>
      <Container>
        <Posts>
          {refresh ? (
            <PositionLoader>
              <Loader type="Oval" color="#FFF" height={80} width={80} />
            </PositionLoader>
          ) : posts.length === 0 ? (
            <p>Nenhum post encontrado</p>
          ) : (
            <>
              {posts.map((item, i) => {
                return (
                  <Post
                    key={item.id}
                    posts={item}
                    setRefresh={setRefresh}
                    setLastId={setLastId}
                    index={i}
                    postsArray={posts}
                    refresh={refresh}
                  />
                );
              })}
            </>
          )}
        </Posts>
        <SideBar />
      </Container>
    </Application>
  );
}
