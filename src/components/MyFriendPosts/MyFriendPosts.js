import axios from 'axios'
import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import UserContext from "../../context/UserContext"
import { Application, Title, FollowUnFollow, Container, Posts, PositionLoader} from '../TimeLine/TimeLine'
import Loader from "react-loader-spinner";
import SideBar from "../SideBar/Sidebar";
import Post from "../Post/Post";
import FollowOrUnfollow from "./FollowOrUnfollow"
export default function MyFriendPosts() {
    const { accountInformation, whoYouFollow, setRefreshWhoYouFollow} = useContext(UserContext);
    const { id } = useParams();
    const [posts, setPosts] = useState([]);
    const [refresh, setRefresh] = useState(false);
    const [follow, setFollow] = useState(false);
    const [loadingFollow, setLoadingFollow] = useState(false)
    const [name, setName] = useState(null);

    useEffect(() => {
        setFollow(whoYouFollow?.includes(parseInt(id)))
      }
    , [id, whoYouFollow])

    useEffect(() => {
      setRefresh(false);
      const request = axios.get(
        `https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/users/${id}/posts`,
        { headers: { Authorization: `Bearer ${accountInformation.token}` } }
      );

      request.then((r) => {
        setPosts(r.data.posts);
        setRefresh(true);
      });

      request.catch(() =>
        alert("Houve uma falha ao obter os posts, por favor atualize a página")
      );

      const requestName = axios.get(
        `https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/users/${id}`,
        { headers: { Authorization: `Bearer ${accountInformation.token}` } }
      );

      requestName.then((s) => {
        setName(s.data.user.username);
        setRefresh(true);
      });

      requestName.catch(() =>
        alert("Houve uma falha ao obter os posts, por favor atualize a página")
      );
    }, [id, accountInformation]);

    return (
      <>
        <Application>
          <Title>
            {name ? `${name}'s posts` : ""}{" "}
            {name && parseInt(id) !== accountInformation.user.id ? (
              <FollowUnFollow
                follow={follow}
                loadingFollow={loadingFollow}
                onClick={() =>
                  FollowOrUnfollow(
                    follow,
                    setFollow,
                    id,
                    accountInformation,
                    setLoadingFollow,
                    setRefreshWhoYouFollow
                  )
                }
              >
                {follow ? "Unfollow" : "Follow"}
              </FollowUnFollow>
            ) : (
              ""
            )}
          </Title>
          <Container>
            <Posts>
              {!refresh ? (
                <PositionLoader>
                  <Loader type="Oval" color="#FFF" height={80} width={80} />
                </PositionLoader>
              ) : posts.length === 0 ? (
                <>
                  <p>Nenhum post encontrado</p>
                </>
              ) : (
                <>
                  {posts.map((item) => (
                    <Post key={item.id} posts={item} />
                  ))}
                </>
              )}
            </Posts>
            <SideBar />
          </Container>
        </Application>
      </>
    );
}


