import styled from "styled-components";
import { SearchOutline } from "react-ionicons";

export default function SearchBar() {
  return (
    <>
      <Form>
        <input placeholder="Search for people and friends" type="search" />
        <button>
          <SearchOutline color={"#c6c6c6"} height="25px" width="25px" />
        </button>
      </Form>
    </>
  );
}
const Form = styled.form`
  display: flex;
  button {
    background-color: #fff;
    border: none;
    height: 45px;
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    padding-right: 12px;
  }
  input {
    outline: none;
    border: none;
    height: 45px;
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;
    width: 563px;
    padding: 10px 15px;
    font-size: 19px;
    color: #515151;
    ::placeholder {
      font-size: 19px;
      color: #c6c6c6;
    }
  }
  @media (max-width: 640px) {
    position: fixed;
    top: 75px;
    width: 90%;
    left: 0;
    right: 0;
    margin: 0 auto;
    input {
      ::placeholder {
        color: #515151;
      }
    }
  }
`;
