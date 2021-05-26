import { Link } from "react-router-dom";

import styled from "styled-components";

//HARD-CODED SIDEBAR - ESPERANDO CORPO FICAR PRONTO

export default function SideBar() {
    const Trends = [
        "JavaScript",
        "React",
        "Swift",
        "Angular",
        "Vue",
        "Node",
        "SQL",
        "Python",
        "CSS",
        "HTML",
    ];

    return (
        <>
            <TrendingMenu>
                <Title>trending</Title>
                <TrendingList>
                    {Trends.map((trend, i) => {
                        return (
                            <Link
                                key={i}
                                to={`/hashtag/${trend}`}
                                style={{ textDecoration: "none" }}
                            >
                                <Trendings key={i}> # {trend} </Trendings>
                            </Link>
                        );
                    })}
                </TrendingList>
            </TrendingMenu>
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
