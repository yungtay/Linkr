import { BrowserRouter, Switch, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import styled from "styled-components";
import axios from 'axios'

import Login from "./components/Login/Login";
import Registration from "./components/Registration/Registration";
import SideBar from "./components/SideBar/Sidebar";
import TimeLine from "./components/TimeLine/TimeLine";
import MyPost from "./components/MyPost/MyPost";
import MyFriendPosts from "./components/MyFriendPosts/MyFriendPosts";
import HashTag from "./components/HashTag/HashTag";
import MyLikes from "./components/MyLikes/MyLikes";
import NavBar from "./components/NavBar/NavBar";
import "./styles/reset.css";
import UserContext from "./context/UserContext";

export default function App() {
  const userSerializado = localStorage.getItem("user");
  const [accountInformation, setAccountInformation] = useState(
    JSON.parse(userSerializado)
  );
  
    const [refreshWhoYouFollow, setRefreshWhoYouFollow] = useState(false);
    const [whoYouFollow, setWhoYouFollow] = useState(null)
    useEffect(() => {
      if (accountInformation) {
        setRefreshWhoYouFollow(false);
        const request = axios.get(
          "https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/users/follows",
          {
            headers: { Authorization: `Bearer ${accountInformation.token}` },
          }
        );
        request.then((r) => {
          setWhoYouFollow(r.data.users.map((users) => users.id));
        });

        request.catch(() => alert("Não foi possível checar quem você segue"));
      }
    }, [accountInformation?.token, refreshWhoYouFollow]);

    return (
        <BrowserRouter>
            <Switch>
                <UserContext.Provider
                    value={{ accountInformation, setAccountInformation, whoYouFollow, setWhoYouFollow, setRefreshWhoYouFollow }}
                >
                    <Route path="/" exact>
                        <Login />
                    </Route>
                    <Route path="/sign-up" exact>
                        <Registration />
                    </Route>
                    <Container>
                        <Route path="/timeline" exact>
                            <NavBar />
                            <TimeLine />
                        </Route>
                        <Route path="/my-posts" exact>
                            <NavBar />
                            <MyPost />
                        </Route>
                        <Route path="/hashtag/:hashtag" exact>
                            <NavBar />
                            <HashTag />
                        </Route>
                        <Route path="/user/:id" exact>
                            <NavBar />
                            <MyFriendPosts />
                        </Route>
                        <Route path="/my-likes" exact>
                            <NavBar />
                            <MyLikes />
                        </Route>
                        <Route path="/siderbar" exact>
                            <SideBar />
                        </Route>
                    </Container>
                </UserContext.Provider>
            </Switch>
        </BrowserRouter>
    );
}

const Container = styled.div`
  padding-top: 125px;
`;
