import styled from "styled-components";
import { useContext } from "react";
import Modal from "react-modal";
import axios from 'axios';
import UserContext from "../../context/UserContext";
import { RepeatSharp } from 'react-ionicons'

export default function Repost({
  rePostCount,
  postId,
  modalIsOpenRepost,
  setModalIsOpenRepost,
  setRefresh
}) {
  const { accountInformation } = useContext(UserContext);

  function repostClick() {
    const config = {
      headers: { Authorization: `Bearer ${accountInformation.token}` },
    };
    const request = axios.post(
      `https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/posts/${postId}/share`,
      {},
      config
    );
    request.then(() => {
      setModalIsOpenRepost(false)
      setRefresh(true)
    });

    request.catch(() => {
      alert('Não foi possível repostar !')
    });
  }
  Modal.setAppElement("body");

  return (
      <RepostContainer>
        <RepeatSharp
          color={"#ffffff"}
          height={"30px"}
          width={"25px"}
          onClick={() => setModalIsOpenRepost(true)}
          style={{cursor: "pointer"}}
        />
        <NumberOfRePosts>{rePostCount} re-posts</NumberOfRePosts>
        <Modal
        isOpen={modalIsOpenRepost}
        animationType="fade"
        contentLabel="Repost modal"
        overlayClassName={ModalOverlay}
        style={CustomStyleModal}
      >
        <ConfirmRepost>
          <div>
            {false
              ? "Aguarde um instante"
              : "Do you want to re-post this link?"}
          </div>
          <div>
            <button
              className="cancel"
              onClick={() => setModalIsOpenRepost(false)}
            >
              No, cancel
            </button>
            <button
              className="confirm"
              onClick={() => repostClick()}
            >
              Yes, share !
            </button>
          </div>
        </ConfirmRepost>
      </Modal>
      </RepostContainer>
    
  );
}

const RepostContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 15px;

`;

const NumberOfRePosts = styled.div`
  font-size: 11px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
`;

const ConfirmRepost = styled.div`
  background-color: #333;
  height: 262px;
  width: 597px;
  position: fixed;
  top: 35%;
  margin: 5% auto;
  left: 0;
  right: 0;
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
  @media (max-width: 640px) {
    width: 100%;
    left: 0%;
    font-size: 25px;
    padding: 10px 10px;
  }
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

const CustomStyleModal = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 20,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
  },
  content: {
    position: "absolute",
    top: "40px",
    left: "40px",
    right: "40px",
    bottom: "40px",
    border: "0px solid",
    background: "rgba(255, 255, 255, 0)",
    overflow: "auto",
    WebkitOverflowScrolling: "touch",
    borderRadius: "4px",
    outline: "none",
    padding: "20px",
  },
};



