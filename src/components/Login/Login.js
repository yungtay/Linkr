import styled from 'styled-components'

export default function Login() {
  return (
    <LoginRegisterScreen>
      <LoginRegisterText>
        <LoginRegisterLogo>linkr</LoginRegisterLogo>
        <LoginRegisterSubTitle>save, share and discover the best links on the web</LoginRegisterSubTitle>
      </LoginRegisterText>
      <LoginRegisterContainerForms>oi</LoginRegisterContainerForms>
    </LoginRegisterScreen>
  );
}

const LoginRegisterScreen = styled.div`
    display: flex;
    font-weight: 700;

`;

const LoginRegisterText = styled.div`
  width: 62.85%;
  background: #151515;
  color: white;

  padding: 301px 0 0 144px;
`;

const LoginRegisterLogo = styled.div`
    font-size: 106px;
`;

const LoginRegisterSubTitle = styled.div`
    font-size: 43px;
    `

const LoginRegisterContainerForms = styled.div`
    width: 37.15%;
    background: red;
`;

