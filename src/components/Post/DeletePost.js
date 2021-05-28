import { useState, useContext } from "react";
import Modal from "react-modal";
import UserContext from "../../context/UserContext";
import styled from "styled-components";
import axios from "axios";

export default function DeletePost({ postsId, setModalIsOpen, modalIsOpen }) {
  const { accountInformation } = useContext(UserContext);
  const [sentRequest, setSentRequest] = useState(false);

  function closeModal(e) {
    e.stopPropagation();
    setModalIsOpen(false);
  }

  function deletePost(e, idPost) {
    e.stopPropagation();
    setSentRequest(true);
    const config = {
      headers: {
        Authorization: `Bearer ${accountInformation.token}`,
      },
    };
    const data = {};
    const request = axios.delete(
      `https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/posts/${idPost}`,
      config
    );
    request.then(() => {
      setModalIsOpen(false);
      setSentRequest(false);
    });
    request.catch(() => {
      setModalIsOpen(false);
      setSentRequest(false);
      alert("Não foi possível excluir o post");
    });
  }
  Modal.setAppElement("body");

  return (
    <>
      <Modal
        isOpen={modalIsOpen}
        animationType="fade"
        contentLabel="Deleting post modal"
      >
        <ConfirmDelete disabled={sentRequest}>
          <div>
            {sentRequest
              ? "Aguarde um instante"
              : "Tem certeza que deseja excluir essa publicação?"}
          </div>
          <div>
            <button
              className="cancel"
              onClick={(e) => closeModal(e)}
              disabled={sentRequest}
            >
              Não, voltar
            </button>
            <button
              className="confirm"
              onClick={(e) => deletePost(e, postsId)}
              disabled={sentRequest}
            >
              Sim, excluir
            </button>
          </div>
        </ConfirmDelete>
      </Modal>
    </>
  );
}
const ConfirmDelete = styled.div`
  background-color: #333;
  height: 262px;
  width: 597px;
  position: fixed;
  top: 35%;
  left: 35%;
  color: #fff;
  border-radius: 50px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  text-align: center;
  font-size: 34px;
  font-family: "Lato", sans-serif;
  font-weight: 700;
  padding: 10px 100px;
  div {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  button {
    width: 134px;
    height: 37px;
    border-radius: 5px;
    outline: none;
    border: none;
    margin: 0px 15px;
    font-size: 18px;
    font-weight: bold;
    opacity: ${(props) => (props.disabled ? 0.6 : 1)};
  }
  .confirm {
    background-color: #1877f2;
    color: #fff;
  }
  .cancel {
    background-color: #fff;
    color: #1877f2;
  }
`;
