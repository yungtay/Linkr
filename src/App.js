import { BrowserRouter, Switch, Route } from "react-router-dom";
import styled from "styled-components";

import Login from "./components/Login/Login";
import Registration from "./components/Registration/Registration";
import SideBar from "./components/SideBar/Sidebar";
import TimeLine from "./components/TimeLine/TimeLine";
import Mypost from "./components/MyPost/MyPost";
import MyFriendPosts from "./components/MyFriendPosts/MyFriendPosts";
import HashTag from "./components/HashTag/HashTag";
import MyLikes from "./components/MyLikes/MyLikes";
import "./styles/reset.css";

export default function App() {
    return (
        <BrowserRouter>
            <Container>
                <Switch>
                    <Route path="/" exact>
                        <Login />
                    </Route>
                    <Route path="/sign-up" exact>
                        <Registration />
                    </Route>
                    <Route path="/timeline" exact>
                        <TimeLine />
                    </Route>
                    <Route path="/my-posts" exact>
                        <Mypost />
                    </Route>
                    <Route path="/hashtag/:hastag" exact>
                        <HashTag />
                    </Route>
                    <Route path="/user/:id" exact>
                        <MyFriendPosts />
                    </Route>
                    <Route path="/my-likes" exact>
                        <MyLikes />
                    </Route>
                    <Route path="/siderbar" exact>
                        <SideBar />
                    </Route>
                </Switch>
            </Container>
        </BrowserRouter>
    );
}

const Container = styled.div`
  background: #333333;
`;
