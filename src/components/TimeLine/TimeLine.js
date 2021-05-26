import axios from "axios";
import { useContext, useEffect, useState } from "react";
import Loader from "react-loader-spinner";
import styled from "styled-components";
import UserContext from "../../context/UserContext";
import Post from "../Post/Post";
import SideBar from "../SideBar/Sidebar";
import AddPost from "./AddPost";

export default function TimeLine() {
    const { accountInformation } = useContext(UserContext);
    const [posts, setPosts] = useState([]);
    const [refresh, setRefresh] = useState(false);

    useEffect(() => {
        const config = {
            headers: { Authorization: `Bearer ${accountInformation.token}` },
        };
        const request = axios.get(
            "https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/posts",
            config
        );
        request.then((response) => {
            setPosts(response.data.posts);
            setRefresh(true);
        });
        request.catch(() =>
            alert(
                "Houve uma falha ao obter os posts, por favor atualize a página"
            )
        );
    }, [refresh, accountInformation.token]);

    return (
        <>
            <Application>
                <Title>timeline</Title>
                <Container>
                    <Posts>
                        {!refresh ? (
                            <PositionLoader>
                                <Loader
                                    type="Oval"
                                    color="#FFF"
                                    height={80}
                                    width={80}
                                />
                            </PositionLoader>
                        ) : posts.length === 0 ? (
                            <>
                                <AddPost setRefresh={setRefresh} />
                                <p>Nenhum post encontrado</p>
                            </>
                        ) : (
                            <>
                                <AddPost setRefresh={setRefresh} />
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
`;

const Posts = styled.div`
    width: 611px;
    height: 200px;
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
    }
`;

const PositionLoader = styled.div`
    width: 100%;
    margin-top: 50px;
    display: flex;
    justify-content: center;
`;

export { Application, Title, Container, Posts };
