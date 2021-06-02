import Modal from "react-modal";
import styled from "styled-components";
import { Close } from "react-ionicons";

export default function DialogLink({ posts, setOpenDialog, openDialog }) {
  console.log(posts);
  function closeMaps() {
    setOpenDialog(false);
  }

  Modal.setAppElement(".root");
  return (
    <>
      <Modal
        className="content"
        isOpen={openDialog}
        onRequestClose={closeMaps}
        contentLabel="Link modal"
      >
        <ContainerModal>
          <div>
            <button onClick={() => window.open(`${posts.link}`, "_blank")}>
              Open in new tab
            </button>
            <Close
              className="close-icon"
              onClick={() => setOpenDialog(false)}
              color="#fff"
              height="31px"
              width="31px"
            />
          </div>
          <iframe src={posts.link}></iframe>
        </ContainerModal>
      </Modal>
    </>
  );
}

const ContainerModal = styled.div`
  width: 966px;
  height: 904px;
  border-radius: 20px;
  background-color: #333333;
  padding: 28px 33px 33px 33px;
  position: fixed;
  top: calc(50vh - 904px / 2);
  left: calc(50vw - 966px / 2);

  > div {
    display: flex;
    justify-content: space-between;
    margin-bottom: 22px;

    button {
      width: 138px;
      height: 31px;
      border-radius: 5px;
      background-color: #1877f2;
      color: #fff;
      border: none;
      font-size: 14px;
      cursor: pointer;
    }

    .close-icon {
      cursor: pointer;
    }
  }
  iframe {
    width: 100%;
    height: calc(100% - 66px);
  }
`;
