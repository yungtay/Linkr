import axios from "axios";
import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import UserContext from "../../context/UserContext";
import { Application, Title, Container, Posts } from "../TimeLine/TimeLine";
import SideBar from "../SideBar/Sidebar";

export default function HashTag() {
  const { accountInformation } = useContext(UserContext);
  const { hashtag } = useParams();
  const [posts, setPosts] = useState([]);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const config = {
      headers: { Authorization: `Bearer ${accountInformation.token}` },
    };
    const request = axios.get(
      `https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/hashtags/${hashtag}/posts`,
      config
    );
    request.then();
    request.catch();
  }, [hashtag, accountInformation]);

  return (
    <>
      <Application>
        <Title># {hashtag}</Title>
        <Container>
          <Posts></Posts>
          <SideBar />
        </Container>
      </Application>
    </>
  );
}
