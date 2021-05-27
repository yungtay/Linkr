import styled from "styled-components";
import SideBar from "../SideBar/Sidebar";
import AddPost from "./AddPost";

export default function TimeLine() {
  return (
    <>
      <Application>
        <Title>timeline</Title>
        <Container>
          <Posts>
            <AddPost />
          </Posts>
          <SideBar />
        </Container>
      </Application>
    </>
  );
}

const Application = styled.div`
  width: 937px;
  height: 100%;
  position: relative;
  margin: 0 auto;
`;

const Title = styled.div`
  width: 100%;
  margin-bottom: 43px;
  font-size: 43px;

  font-weight: bold;
  font-family: "Oswald", sans-serif;

  color: #fff;
`;

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const Posts = styled.div`
  width: 611px;
  height: 200px;
  background-color: #333;

  @media (max-width: 640px) {
    width: 100%;
  }
`;

export { Application, Title, Container, Posts}
