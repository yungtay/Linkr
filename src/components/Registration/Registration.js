import { Link } from 'react-router-dom'
import {LoginRegisterScreen, LoginRegisterText, LoginRegisterLogo, LoginRegisterSubTitle, LoginRegisterContainerForms,Form} from "../Login/Login"
import { useState } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import Loader from "react-loader-spinner";  

export default function Registration() {
  const [userSignUpInformation, setUserSignUpInformation] = useState({
    email: "",
    password: "",
    username: "",
    pictureUrl: "",
  });
  const [isLoading, setIsLoading] = useState("");
  const history = useHistory();

  function submitSignUp(e) {
    e.preventDefault();
    for (const key in userSignUpInformation) {
      if (!userSignUpInformation[key]) {
        setIsLoading("");
        alert(`Por favor, preencha o campo: ${key}`);
        return;
      }
    }
    const request = axios.post(
      "https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/sign-up",
      userSignUpInformation
    );
    request.then(submitSignUpSucess);
    request.catch(submitSignUpFail);
  }

  function submitSignUpSucess(response) {
    setIsLoading("");
    alert("Parabéns você cadastrou neste lindo site !");
    setUserSignUpInformation({
      email: "",
      password: "",
      username: "",
      pictureUrl: "",
    });
    history.push("/");
  }

  function submitSignUpFail(error) {
    setIsLoading("");
    alert("O e-mail inserido já está em uso");
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
        <Form onSubmit={(e) => submitSignUp(e)} loading={isLoading}>
          <input
            type="text"
            placeholder="e-mail"
            value={userSignUpInformation.email}
            onChange={(e) =>
              setUserSignUpInformation({
                ...userSignUpInformation,
                email: e.target.value,
              })
            }
          />
          <input
            type="password"
            placeholder="password"
            value={userSignUpInformation.password}
            onChange={(e) =>
              setUserSignUpInformation({
                ...userSignUpInformation,
                password: e.target.value,
              })
            }
          />
          <input
            type="text"
            placeholder="username"
            value={userSignUpInformation.username}
            onChange={(e) =>
              setUserSignUpInformation({
                ...userSignUpInformation,
                username: e.target.value,
              })
            }
          />
          <input
            type="url"
            placeholder="picture url"
            value={userSignUpInformation.pictureUrl}
            onChange={(e) =>
              setUserSignUpInformation({
                ...userSignUpInformation,
                pictureUrl: e.target.value,
              })
            }
          />
          <button type="submit" onClick={() => setIsLoading("carregando")}>
            {isLoading ? (
              <Loader type="ThreeDots" color="white" height={20} />
            ) : (
              "Sign Up"
            )}
          </button>
          <Link to="/">Switch back to log in</Link>
        </Form>
      </LoginRegisterContainerForms>
    </LoginRegisterScreen>
  );
}