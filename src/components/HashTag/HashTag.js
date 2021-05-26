import axios from 'axios'
import { useParams } from "react-router-dom";
import { useContext, useEffect } from "react";
import UserContext from "../../context/UserContext"
import { Application, Title, Container, Posts} from '../TimeLine/TimeLine'
import SideBar from "../SideBar/Sidebar";
//import AddPost from "../TimeLine/AddPost";
export default function HashTag() {
    const { accountInformation } = useContext(UserContext);
    const { hashtag } = useParams();

    useEffect(() => {
        const config = {headers: { Authorization: `Bearer ${accountInformation.token}` }};
        const request = axios.get(`https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/hashtags/${hashtag}/posts`, config)
        request.then((r) => console.log(r.data))
        request.catch((e) => console.log(e.data))
    },[hashtag, accountInformation])

        return (
          <>
            <Application>
              <Title># {hashtag}</Title>
              <Container>
                <Posts>
                </Posts>
                <SideBar />
              </Container>
            </Application>
          </>
        );
}