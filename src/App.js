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
                    <Route to="/" exact>
                        <Login />
                    </Route>
                    <Route to="sign-up" exact>
                        <Registration />
                    </Route>
                    <Route to="/timeline" exact>
                        <TimeLine />
                    </Route>
                    <Route to="/my-posts" exact>
                        <Mypost />
                    </Route>
                    <Route to="/hashtag/:hastag" exact>
                        <HashTag />
                    </Route>
                    <Route to="/user/:id" exact>
                        <MyFriendPosts />
                    </Route>
                    <Route to="/my-likes" exact>
                        <MyLikes />
                    </Route>
                    <Route to="/siderbar" exact>
                        <SideBar />
                    </Route>
                </Switch>
            </Container>
        </BrowserRouter>
    );
}

const Container = styled.div`
    background: red;
`;
