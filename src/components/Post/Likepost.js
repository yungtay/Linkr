import axios from "axios";
import { useContext, useState } from "react";
import { Heart, HeartOutline } from "react-ionicons";
import UserContext from "../../context/UserContext";
import ReactTooltip from "react-tooltip";

export default function Likepost({ posts, likes, setLikes }) {
  const { accountInformation } = useContext(UserContext);
  const [toggle, setToggle] = useState(
    posts.likes
      .map((item) => item.userId || item.id)
      .includes(accountInformation.user.id)
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
      request.then("");
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
      request.then("");
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
      <p
        data-tip={
          posts.likes.length > 2
            ? `${
                posts.likes[0]["user.username"] === undefined
                  ? posts.likes[0].username
                  : posts.likes[0]["user.username"]
              }, ${
                posts.likes[1]["user.username"] === undefined
                  ? posts.likes[1].username
                  : posts.likes[1]["user.username"]
              } e outras ${posts.likes.length - 2} pessoas`
            : posts.likes.map(
                (item) => " " + (item["user.username"] || item.username)
              )
        }
      >
        {likes === 1 ? `${likes} like` : `${likes} likes`}
      </p>
      <ReactTooltip
        className="tool-tip-custom"
        place="bottom"
        type="light"
        effect="solid"
      />
    </>
  );
}
