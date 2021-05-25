import axios from "axios";
import { Link } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import UserContext from "../../context/UserContext";

//HARD-CODED SIDEBAR - ESPERANDO CORPO FICAR PRONTO

export default function SideBar() {
    const { accountInformation } = useContext(UserContext);
    const [trendingHashs, setTrendingHashs] = useState([]);
    const [flag, setFlag] = useState(false);

    console.log(trendingHashs);
    useEffect(() => {
        const config = {
            headers: {
                Authorization: `Bearer ${accountInformation.token}`,
            },
        };
        const request = axios.get(
            "https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/hashtags/trending",
            config
        );
        request.then((resp) => {
            setTrendingHashs(resp.data.hashtags);
            setFlag(true);
        });
    }, [flag, accountInformation.token]);

    return (
        <>
            {flag ? (
                <TrendingMenu>
                    <Title>trending</Title>
                    <TrendingList>
                        {trendingHashs.map((trendHash, i) => {
                            return (
                                <Link
                                    key={i}
                                    to={`/hashtag/${trendHash.name}`}
                                    style={{ textDecoration: "none" }}
                                >
                                    <Trendings key={trendHash.id}>
                                        {" "}
                                        # {trendHash.name}{" "}
                                    </Trendings>
                                </Link>
                            );
                        })}
                    </TrendingList>
                </TrendingMenu>
            ) : (
                <TrendingMenu>
                    <Title>trending</Title>
                    <TrendingList>Carregando</TrendingList>
                </TrendingMenu>
            )}
        </>
    );
}

const TrendingMenu = styled.div`
    width: 301px;
    height: 406px;
    background-color: #171717;
    border-radius: 16px;
    position: absolute;
    right: 0;
`;
const Title = styled.div`
    height: 61px;
    padding: 0px 16px;
    color: #fff;
    font-size: 27px;
    font-weight: bold;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #484848;
`;
const TrendingList = styled.ul`
    width: 100%;
    padding: 0px 16px;
    margin-top: 18px;
`;
const Trendings = styled.li`
    font-size: 19px;
    font-weight: bold;
    line-height: 23px;
    letter-spacing: 0.05em;
    color: #fff;
    margin-bottom: 10px;
`;
