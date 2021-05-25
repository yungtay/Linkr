import { Link } from 'react-router-dom'
import {LoginRegisterScreen, LoginRegisterText, LoginRegisterLogo, LoginRegisterSubTitle, LoginRegisterContainerForms,Form} from "../Login/Login"
import { useState } from 'react'

export default function Registration() {

    const [userSignUpInformation, setUserSignUpInformation] = useState({});
    
    return (
        <LoginRegisterScreen>
          <LoginRegisterText>
            <LoginRegisterLogo>linkr</LoginRegisterLogo>
            <LoginRegisterSubTitle>
              save, share and discover the best links on the web
            </LoginRegisterSubTitle>
          </LoginRegisterText>
          <LoginRegisterContainerForms>
            <Form>
              <input type="text" placeholder="e-mail" onChange={(e) => setUserSignUpInformation({...userSignUpInformation, email: e.target.value})} />
              <input type="password" placeholder="password" onChange={(e) => setUserSignUpInformation({...userSignUpInformation, password: e.target.value})} />
              <input type="text" placeholder="username" onChange={(e) => setUserSignUpInformation({...userSignUpInformation, username: e.target.value})} />
              <input type="url" placeholder="picture url" onChange={(e) => setUserSignUpInformation({...userSignUpInformation, picture: e.target.value})} />
              <button type="submit">Sign Up</button>
              <Link to="/">Switch back to log in</Link>
            </Form>
          </LoginRegisterContainerForms>
        </LoginRegisterScreen>
      );
}