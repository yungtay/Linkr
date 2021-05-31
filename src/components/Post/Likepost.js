import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Heart, HeartOutline, LogoFacebook } from "react-ionicons";
import UserContext from "../../context/UserContext";
import ReactTooltip from "react-tooltip";

export default function Likepost({ posts, likes, setLikes }) {
  const { accountInformation } = useContext(UserContext);
  const [toggle, setToggle] = useState(
    posts.likes
      .map((item) => item.userId || item.id)
      .includes(accountInformation.user.id)
  );
  const [array, setArray] = useState([]);

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
      request.then((response) => {
        setArray(response.data.post.likes.map((item) => item.username));
        createArray();
      });
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
      request.then((response) => {
        setArray(response.data.post.likes.map((item) => item.username));
        createArray();
      });
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

  useEffect(createArray, []);

  if (array.length > posts.likes.length) {
    createArray();
  }
  function createArray() {
    let likesArray = array;
    if (posts.likes.length !== 0) {
      likesArray = posts.likes.map(
        (item) => item.username || item["user.username"]
      );
      if (likesArray.indexOf(`${accountInformation.user.username}`) !== -1) {
        likesArray = changePosition(
          likesArray,
          likesArray.indexOf(`${accountInformation.user.username}`),
          0
        );
        likesArray[0] = "Você";
      }
      setArray(likesArray);
    }
    console.log(array);
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
            ? `${array[0]}, ${array[1]} e outras ${
                posts.likes.length - 2
              } pessoas`
            : array
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
