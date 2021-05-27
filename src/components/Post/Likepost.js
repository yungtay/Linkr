import axios from "axios";
import { useContext, useState } from "react";
import { Heart, HeartOutline } from "react-ionicons";
import UserContext from "../../context/UserContext";

export default function Likepost({ posts, likes, setLikes }) {
  const { accountInformation } = useContext(UserContext);
  const [toggle, setToggle] = useState(
    posts.likes.map((item) => item.userId).includes(accountInformation.user.id)
  );

  function toggleHeart() {
    setToggle(!toggle);
    const config = {
      headers: { Authorization: `Bearer ${accountInformation.token}` },
    };
    if (toggle === false) {
      setLikes(likes + 1);
      const request = axios.post(
        `https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/posts/${posts.id}/like`,
        [],
        config
      );
      request.then();
      request.catch(() => {
        alert("Erro ao curtir");
        setToggle(!toggle);
        setLikes(likes - 1);
      });
    } else {
      setLikes(likes - 1);
      const request = axios.post(
        `https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/posts/${posts.id}/dislike`,
        [],
        config
      );
      request.then();
      request.catch(() => {
        alert("Erro ao descurtir");
        setToggle(!toggle);
        setLikes(likes + 1);
      });
    }
  }

  return (
    <>
      {toggle ? (
        <Heart
          onClick={toggleHeart}
          color={"#dc1818"}
          height="18px"
          width="20px"
        />
      ) : (
        <HeartOutline
          onClick={toggleHeart}
          color={"#ffffff"}
          height="18px"
          width="20px"
        />
      )}
    </>
  );
}
