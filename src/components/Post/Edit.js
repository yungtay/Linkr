import styled from "styled-components";
import axios from 'axios'

export default function Edit({message, setMessage, accountInformation, posts, inputRef, isLoading, setIsLoading, setEditSucess, setEdit}) {
  function pressKey(e) {
    if (e.key === "Escape") {
      setEdit(false);
      setMessage({ text: posts.text });
    }
    if (e.key === "Enter") {
      setIsLoading(true);
      e.preventDefault();
      const request = axios({
        method: "put",
        url: `https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/posts/${posts.id}`,
        data: message,
        headers: { Authorization: `Bearer ${accountInformation.token}` },
      });
      request.then(() => {
        setIsLoading(false);
        setEdit(false);
        setEditSucess(true);
      });
      request.catch(() => {
        alert("Não foi possível salvar as alterações ;(");
        setIsLoading(false);
        setEditSucess(false);
      });
    }
  }

  return (
    <Text
      value={message.text}
      onChange={(e) => setMessage({ ...message, text: e.target.value })}
      isLoading={isLoading}
      onKeyDown={(e) => pressKey(e)}
      ref={inputRef}
    />
  );
}

const Text = styled.textarea`
  width: 100%;
  border-radius: 7px;

  padding: 9px;

  color: #4c4c4c;
  font-size: 14px;
  height: 44px;

  opacity: ${(prop) => (prop.isLoading ? 0.35 : 1)};
  background: ${(prop) => (prop.isLoading ? "#F2F2F2" : "white")};
  pointer-events: ${(prop) => (prop.isLoading ? "none" : "initial")};

  overflow: hidden;
  resize: none;
`;
