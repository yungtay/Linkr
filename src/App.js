import {BrowserRouter, Switch, Route} from "react-router-dom"
import styled from 'styled-components'

import Login from './components/Login/Login'
import Registration from './components/Registration/Registration'
import SideBar from './components/SideBar/Sidebar'
import TimeLine from './components/TimeLine/TimeLine'
import Mypost from './components/MyPost/MyPost'
import MyFriendPosts from './components/MyFriendPosts/MyFriendPosts'
import HashTag from './components/HashTag/HashTag'
import MyLikes from './components/MyLikes/MyLikes'



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
          <Route to="/timeline">
            <TimeLine/>
          </Route>
          <Route to="/my-posts">
            <Mypost />
          </Route>
          <Route to="/hashtag/:hastag">
            <HashTag />
          </Route>
          <Route to="/user/:id">
            <MyFriendPosts />
          </Route>
          <Route to="/my-likes">
            <MyLikes />
          </Route>
          <Route to="/siderbar">
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