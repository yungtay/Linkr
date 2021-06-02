import Modal from "react-modal";
import styled, { css } from "styled-components";
import { Close } from "react-ionicons";
import GoogleMapReact from "google-map-react";

export default function ModalMaps({ openMaps, setOpenMaps, posts }) {
  console.log(posts.geolocation.latitude);
  console.log(posts.geolocation.longitude);
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
            <p>{posts.user.username}'s location</p>
            <Close
              className="close-icon"
              onClick={() => setOpenMaps(false)}
              color="#fff"
              height="31px"
              width="31px"
            />
          </div>
          <Map>
            <GoogleMapReact></GoogleMapReact>
          </Map>
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
    margin-bottom: 22px;

    p {
      color: #fff;
      font-size: 36px;
      font-weight: bold;
      font-family: "Oswald", sans-serif;
    }

    .close-icon {
      cursor: pointer;
    }
  }
`;

const Map = styled.div`
  width: 340px;
  height: 100px;
  background-color: green;
`;
