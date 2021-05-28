import SideBar from "../SideBar/Sidebar";
import styled from "styled-components";
import { useEffect, useContext, useState } from "react";
import axios from "axios";
import UserContext from "../../context/UserContext";
import Post from "../Post/Post";

export default function MyPosts() {
    const { accountInformation } = useContext(UserContext);
    const [myPosts, setMyPosts] = useState([]);
    useEffect(() => {
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
    }, [accountInformation.token, accountInformation.user.id]);
    return (
        <>
            <Application>
                <Title>my posts</Title>
                <Container>
                    {myPosts ? (
                        <>
                            {myPosts.map((myPost) => {
                                return (
                                    <Post key={myPost.id} posts={myPost}></Post>
                                );
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
`;

const Title = styled.div`
  width: 100%;
  margin-bottom: 43px;
  font-size: 43px;

  font-weight: bold;
  font-family: "Oswald", sans-serif;

  color: #fff;
`;

const Container = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    width: 611px;
    @media (max-width: 640px) {
        width: 100%;
    }

`;

const Posts = styled.div`
  width: 611px;
  height: 276px;
  background-color: #171717;
  border-radius: 16px;

  @media (max-width: 640px) {
    width: 100%;
  }
`;
