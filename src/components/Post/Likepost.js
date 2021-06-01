import axios from "axios";
import { useContext, useEffect, useState } from "react";
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
        createArray(response.data.post.likes.map((item) => item.username));
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
        createArray(response.data.post.likes.map((item) => item.username));
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

  useEffect(() => {
    createArray(posts.likes.map((item) => item["user.username"]));
  }, []);

  function createArray(array) {
    if (array === undefined) {
      return;
    }
    let likesArray = array;
    if (array.length !== 0) {
      if (likesArray.indexOf(`${accountInformation.user.username}`) !== -1) {
        likesArray = changePosition(
          likesArray,
          likesArray.indexOf(`${accountInformation.user.username}`),
          0
        );
        likesArray[0] = "Você";
      }
    }
    setArray(likesArray);
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
            ? `${array[0]}, ${array[1]} e outras ${array.length - 2} ${
                array.length === 1 ? "pesssoa" : "pessoas"
              }`
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
