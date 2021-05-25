import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { useState } from 'react'

export default function Login() {
  const [userLogInInformation, setUserLogInInformation] = useState({email:"", password:""});
  console.log(userLogInInformation)

  function submitLogin(e) {
    e.preventDefault()
    console.log(userLogInInformation)
  }

  return (
    <LoginRegisterScreen>
      <LoginRegisterText>
        <LoginRegisterLogo>linkr</LoginRegisterLogo>
        <LoginRegisterSubTitle>
          save, share and discover the best links on the web
        </LoginRegisterSubTitle>
      </LoginRegisterText>
      <LoginRegisterContainerForms>
        <Form onSubmit={(e) => submitLogin(e)}>
          <input
            type="text"
            placeholder="e-mail"
            onChange={(e) => setUserLogInInformation({...userLogInInformation, email: e.target.value})}
          />
          <input type="password" placeholder="password" onChange={(e) => setUserLogInInformation({...userLogInInformation, password: e.target.value})} />
          <button type="submit">Log In</button>
          <Link to="/sign-up">First time? Create a account!</Link>
        </Form>
      </LoginRegisterContainerForms>
    </LoginRegisterScreen>
  );
}

const LoginRegisterScreen = styled.div`
    display: flex;
    height: 100vh;
    font-weight: 400;

`;

const LoginRegisterText = styled.div`
  width: 62.85%;
  background: #151515;
  color: white;

  padding: 301px 0 0 144px;
`;

const LoginRegisterLogo = styled.div`
    font-size: 106px;
    font-family: 'Passion One', cursive;
    line-height: 117px;
    letter-spacing: 0.05em;
`;

const LoginRegisterSubTitle = styled.div`
    width: 412px;
    font-size: 43px;
    font-weight: 700;
    font-family: 'Oswald';
    line-height: 64px;
`

const LoginRegisterContainerForms = styled.div`
    width: 37.15%;

    padding: 317px 2.57% 0 2.57%;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;

    align-items: center;

    input, button {
        width: 100%;
        height: 65px;

        border: 0px solid;
        border-radius: 6px;

        margin-bottom: 13px;
        padding: 0 0 0 17px;

        font-size: 27px;
        font-weight: 700;
        font-family: 'Oswald';

        &::placeholder {
            color: #9F9F9F;
        }
    }

    button {
        color: white;
        background: #1877F2;

        margin-bottom: 22px;
    }

    a {
        color: white;
        font-family: Lato;
        font-size: 20px;
        text-decoration: none;
        border-bottom: 1px solid #fff;
        padding-bottom: 2px;

    }
`

export {
  LoginRegisterScreen,
  LoginRegisterText,
  LoginRegisterLogo,
  LoginRegisterSubTitle,
  LoginRegisterContainerForms,
  Form
};

