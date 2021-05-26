//import styled from "styled-components";
import axios from 'axios'
import { useParams } from "react-router-dom";
import { useContext, useEffect } from "react";
import UserContext from "../../context/UserContext"
export default function HashTag() {
    const { accountInformation } = useContext(UserContext);
    const { hashtag } = useParams();

    useEffect(() => {
        const config = {headers: { Authorization: `Bearer ${accountInformation.token}` }};
        const request = axios.get(`https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/hashtags/${hashtag}/posts`, config)
        request.then((r) => console.log(r.data))
        request.catch((e) => console.log(e.data))
    },[hashtag, accountInformation])

    return(
        <div>Olá mundo</div>
    )
}