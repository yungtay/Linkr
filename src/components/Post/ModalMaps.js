import Modal from "react-modal";
import styled, { css } from "styled-components";
import { Close } from "react-ionicons";

export default function ModalMaps({ openMaps, setOpenMaps }) {
  function closeMaps() {
    setOpenMaps(false);
  }

  Modal.setAppElement(".root");
  return (
    <>
      <Modal
        className="content"
        isOpen={openMaps}
        onRequestClose={closeMaps}
        contentLabel="Maps modal"
      >
        <ContainerModal>
          <div>
            <p>Fernando's location</p>
            <Close color="#fff" height="31px" width="31px" />
          </div>
          <iframe src="#"></iframe>
        </ContainerModal>
      </Modal>
    </>
  );
}

const ContainerModal = styled.div`
  width: 790px;
  height: 354px;
  border-radius: 20px;
  background-color: #333333;
  padding: 28px 33px 33px 33px;

  position: fixed;
  top: calc(50vh - 354px / 2);
  left: calc(50vw - 790px / 2);

  > div {
    display: flex;
    justify-content: space-between;

    p {
      color: #fff;
      font-size: 36px;
      font-weight: bold;
      font-family: "Oswald", sans-serif;
    }
  }
  iframe {
    width: 50px;
    height: 50px;
  }
`;
