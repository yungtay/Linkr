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

  function changePosition(arr, from, to) {
    arr.splice(to, 0, arr.splice(from, 1)[0]);
    return arr;
  }

  console.log(
    posts.likes
      .map((item) => item["user.username"])
      .indexOf(`${accountInformation.user.username}`)
  );
  let result;
  returnToolTip();
  function returnToolTip() {
    if (toggle) {
      if (posts.likes.length > 2) {
        if (posts.likes.username === undefined) {
          const index = posts.likes
            .map((item) => item.username)
            .indexOf(`${accountInformation.user.username}`);
          const arr = changePosition(
            posts.likes.map((item) => item.username),
            index,
            0
          );
          result = `Você, ${arr[1]} e outras ${arr.length - 2} pessoas`;
        } else {
          const index = posts.likes
            .map((item) => item["user.username"])
            .indexOf(`${accountInformation.user.username}`);
          const arr = changePosition(
            posts.likes.map((item) => item["user.username"]),
            index,
            0
          );
          arr[0] = "Você";
          result = `${arr[0]}, ${arr[1]} e outras ${arr.length - 2} pessoas`;
        }
      } else if (posts.likes.length === 2) {
        if (posts.likes.username === undefined) {
          const index = posts.likes
            .map((item) => item.username)
            .indexOf(`${accountInformation.user.username}`);
          const arr = changePosition(
            posts.likes.map((item) => item.username),
            index,
            0
          );
          arr[0] = "Você";
          result = `${arr[0]} e ${arr[1]}`;
        } else {
          const index = posts.likes
            .map((item) => item["user.username"])
            .indexOf(`${accountInformation.user.username}`);
          const arr = changePosition(
            posts.likes.map((item) => item["user.username"]),
            index,
            0
          );
          arr[0] = "Você";
          result = `${arr[0]} e ${arr[1]}`;
        }
      } else if (posts.likes.length === 1) {
        result = "Você";
      }
    } else {
      result =
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
            );
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
      <p data-tip={result}>
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
