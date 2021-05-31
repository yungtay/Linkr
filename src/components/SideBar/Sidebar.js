import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import UserContext from "../../context/UserContext";
import Loader from "react-loader-spinner";

export default function SideBar() {
  const { accountInformation } = useContext(UserContext);
  const [trendingHashs, setTrendingHashs] = useState([]);
  const [inputedHashtag, setInputedHashtag] = useState();
  const [flag, setFlag] = useState(false);
  const history = useHistory();

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
                  <Trendings key={trendHash.id}> # {trendHash.name} </Trendings>
                </Link>
              );
            })}
            <span>#</span>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                history.push(`/hashtag/${inputedHashtag}`);
                setInputedHashtag("");
              }}
            >
              <SearchHashtag
                placeholder="type a hashtag"
                value={inputedHashtag}
                onChange={(e) => setInputedHashtag(e.target.value)}
              />
            </form>
          </TrendingList>
        </TrendingMenu>
      ) : (
        <TrendingMenu>
          <Title>trending</Title>
          <Loading>
            <Loader type="ThreeDots" color="white" height={20} />
          </Loading>
        </TrendingMenu>
      )}
    </>
  );
}

const TrendingMenu = styled.div`
  width: 301px;
  background-color: #171717;
  border-radius: 16px;
  position: absolute;
  right: 0;
  padding: 0px 16px;
  @media (max-width: 640px) {
    display: none;
  }
`;
const Title = styled.div`
  height: 61px;
  color: #fff;
  font-size: 27px;
  font-weight: bold;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #484848;
`;
const TrendingList = styled.ul`
  width: 100%;
  margin-top: 18px;
  position: relative;
  span {
    position: absolute;
    bottom: 25px;
    left: 10px;
    font-size: 19px;
    font-weight: bold;
    color: #fff;
  }
`;
const Loading = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80%;
`;
const Trendings = styled.li`
  font-size: 19px;
  font-weight: bold;
  line-height: 23px;
  letter-spacing: 0.05em;
  color: #fff;
  margin-bottom: 10px;
`;
const SearchHashtag = styled.input`
  width: 100%;
  height: 35px;
  border-radius: 8px;
  background-color: #252525;
  outline: none;
  border: none;
  margin-bottom: 15px;
  padding-left: 36px;
  color: #fff;
  font-weight: bold;
  font-size: 16px;
  ::placeholder {
    font-size: 16px;
    color: #575757;
    letter-spacing: 0.05em;
    line-height: 19px;
    font-style: italic;
  }
`;
