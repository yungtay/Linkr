import styled from "styled-components";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { SearchOutline } from "react-ionicons";
import { DebounceInput } from "react-debounce-input";
import { useEffect, useState, useContext } from "react";
import UserContext from "../../context/UserContext";

export default function SearchBar() {
  const { accountInformation } = useContext(UserContext);
  const history = useHistory();
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const followedProfile = searchResult
    ? searchResult.filter((result) => result.isFollowingLoggedUser)
    : [];
  const unfollowedProfile = searchResult
    ? searchResult.filter((result) => !result.isFollowingLoggedUser)
    : [];
  useEffect(() => {
    setSearchResult([]);
    if (search !== "") {
      const config = {
        headers: {
          Authorization: `Bearer ${accountInformation.token}`,
        },
      };
      const request = axios.get(
        `https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/users/search?username=${search}`,
        config
      );
      request.then((resp) => {
        setSearchResult(resp.data.users);
      });
    }
  }, [search, accountInformation.token]);
  return (
    <>
      <Form onSubmit={(e) => e.preventDefault()}>
        <DebounceInput
          minLength={3}
          value={search}
          debounceTimeout={300}
          placeholder="Search for people and friends"
          onChange={(e) => setSearch(e.target.value)}
        />
        <button>
          <SearchOutline color={"#c6c6c6"} height="25px" width="25px" />
        </button>
      </Form>
      {searchResult !== [] && search !== "" ? (
        <SearchList>
          {followedProfile.length === 0 ? (
            <li className="not-follow">
              You do not follow anyone with this description at the momment
            </li>
          ) : (
            <>
              {followedProfile.map((result) => {
                return (
                  <li
                    onClick={() => {
                      history.push(`/user/${result.id}`);
                      setSearch("");
                    }}
                  >
                    <div>
                      <img src={result.avatar} />
                    </div>
                    <span>{result.username}</span>
                    <span className="following">• following</span>
                  </li>
                );
              })}
            </>
          )}
          {unfollowedProfile.map((result) => {
            return (
              <li
                onClick={() => {
                  history.push(`/user/${result.id}`);
                  setSearch("");
                }}
              >
                <div>
                  <img src={result.avatar} />
                </div>
                <span>{result.username}</span>
              </li>
            );
          })}
        </SearchList>
      ) : (
        ""
      )}
    </>
  );
}
const Form = styled.form`
  display: flex;
  align-items: flex-end;
  justify-content: center;
  position: relative;
  position: fixed;
  right: 0;
  left: 0;
  width: 563px;
  margin: 0 auto;
  button {
    background-color: #fff;
    border: none;
    height: 45px;
    position: absolute;
    right: 10px;
    border-radius: 8px;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    padding-right: 12px;
    width: 10px;
  }
  input {
    outline: none;
    border: none;
    height: 45px;
    border-radius: 8px;
    padding: 10px 15px;
    font-size: 19px;
    width: 563px;
    color: #515151;
    ::placeholder {
      font-size: 19px;
      color: #c6c6c6;
    }
  }
  @media (max-width: 640px) {
    position: fixed;
    height: 50px;
    top: 72px;
    width: 95%;
    left: 0;
    right: 0;

    input {
      ::placeholder {
        color: #515151;
      }
      width: 100%;
    }
    button {
      width: auto;
    }
  }
`;
const SearchList = styled.ul`
  background-color: #e7e7e7;
  position: absolute;
  top: 54px;
  right: 0;
  left: 0;
  margin: 0 auto;
  width: 563px;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  max-height: 200px;
  overflow-y: scroll;
  .not-follow {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .following {
    color: #c5c5c5;
    margin-left: 15px;
  }
  li {
    display: flex;
    margin: 10px;
    align-items: center;
    background-color: inherit;
    border-radius: 8px;
    :hover {
      filter: brightness(50%);
    }
  }
  img {
    height: 39px;
    width: 39px;
    border-radius: 50px;
    margin-right: 10px;
  }
  span {
    color: #515151;
    font-size: 19px;
  }
  @media (max-width: 640px) {
    width: 90%;
    top: 122px;
  }
`;
