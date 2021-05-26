import styled from "styled-components";
import axios from 'axios'
import { Link, useHistory } from "react-router-dom";
import { useState, useContext } from "react";
import UserContext from "../../context/UserContext"
import Loader from "react-loader-spinner";

export default function Login() {
  const history = useHistory();
  const [userLogInInformation, setUserLogInInformation] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState("");
  const { setAccountInformation } = useContext(UserContext);

  checkLocalStorage()

  function submitLogin(e) {
    e.preventDefault();
    for (const key in userLogInInformation) {
      if (!userLogInInformation[key]) {
        setIsLoading("")
        alert(`Por favor, preencha o campo: ${key}`);
        return;
      }
    }
    const request = axios.post(
      "https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/sign-in",
      userLogInInformation
    );
    request.then(submitLoginSucess);
    request.catch(submitLoginFail);
  }

  function submitLoginSucess(response) {
    setIsLoading("")
    alert("Parabéns você logou neste lindo site !");
    setUserLogInInformation({ email: "", password: "" });
    setAccountInformation(response.data);
    const userSerializados = JSON.stringify(response.data);
    localStorage.setItem("user", userSerializados)
    history.push("/timeline");
  }

  function submitLoginFail(error) {
    console.log(error.response.status)
    setIsLoading("")
    if(error.response.status === 403){
      alert("E-mail ou senha incorretos");
    } else {
      alert("Um erro desconhecido ocorreu, call reinforcements");
    }
  }

  function checkLocalStorage() {
    if(localStorage.getItem("user")){
      const userSerializado = localStorage.getItem("user")
      setAccountInformation(JSON.parse(userSerializado))
      history.push("/timeline")
    }
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
        <Form onSubmit={(e) => submitLogin(e)} loading={isLoading}>
          <input
            type="text"
            placeholder="e-mail"
            value={userLogInInformation.email}
            onChange={(e) =>
              setUserLogInInformation({
                ...userLogInInformation,
                email: e.target.value,
              })
            }
          />
          <input
            type="password"
            placeholder="password"
            value={userLogInInformation.password}
            onChange={(e) =>
              setUserLogInInformation({
                ...userLogInInformation,
                password: e.target.value,
              })
            }
          />
          <button type="submit" onClick={() => setIsLoading("carregando")}>
            {isLoading ? (
              <Loader type="ThreeDots" color="white" height={20} />
            ) : (
              "Log In"
            )}
          </button>
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
  background: #333333;
`;

const LoginRegisterText = styled.div`
  width: 62.85%;
  background: #151515;
  color: white;

  padding: 301px 0 0 144px;
`;

const LoginRegisterLogo = styled.div`
  font-size: 106px;
  font-family: "Passion One", cursive;
  line-height: 117px;
  letter-spacing: 0.05em;
`;

const LoginRegisterSubTitle = styled.div`
  width: 412px;
  font-size: 43px;
  font-weight: 700;
  font-family: "Oswald";
  line-height: 64px;
`;

const LoginRegisterContainerForms = styled.div`
  width: 37.15%;

  padding: 317px 2.57% 0 2.57%;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;

  align-items: center;

  input,
  button {
    width: 100%;
    height: 65px;

    border: 0px solid;
    border-radius: 6px;

    margin-bottom: 13px;
    padding: 0 0 0 17px;

    font-size: 27px;
    font-weight: 700;
    font-family: "Oswald";

    opacity: ${prop => prop.loading ? 0.35 : 1};
    background: ${prop => prop.loading ? "#F2F2F2" : "white"};
    pointer-events: ${prop => prop.loading ? "none" : "initial"};

    &::placeholder {
      color: #9f9f9f;
    }
  }

  button {
    color: white;
    background: #1877f2;

    margin-bottom: 22px;
  }

  a {
    color: white;
    font-family: Lato;
    font-size: 20px;
    text-decoration: none;
    border-bottom: 1px solid #fff;
    padding-bottom: 2px;
    pointer-events: ${prop => prop.loading ? "none" : "initial"};
  }
`;

export {
  LoginRegisterScreen,
  LoginRegisterText,
  LoginRegisterLogo,
  LoginRegisterSubTitle,
  LoginRegisterContainerForms,
  Form,
};
