import styled from "styled-components";
import axios from "axios";
import { SearchOutline } from "react-ionicons";
import { DebounceInput } from "react-debounce-input";
import { useEffect, useState, useContext } from "react";
import UserContext from "../../context/UserContext";

export default function SearchBar() {
  const { accountInformation } = useContext(UserContext);
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  useEffect(() => {
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
        console.log(resp.data.users);
        setSearchResult(resp.data.users);
      });
    }
  }, [search]);
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
          {searchResult.map((result) => {
            console.log(result.username);
            return (
              <li>
                <div>
                  <img
                    src={result.avatar}
                    alt={result.username + " profile image"}
                  />
                </div>{" "}
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
    width: 100%;
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
`;
