import axios from 'axios'

export default function FollowOrUnfollow(follow, setFollow, idFollow, accountInformation, setLoadingFollow, setRefreshWhoYouFollow) {
  const config = {
    headers: { Authorization: `Bearer ${accountInformation.token}` },
  };
  setLoadingFollow(true)
  if(follow){
    const request = axios.post(
      `https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/users/${idFollow}/unfollow`, {} ,
      config
    );
    request.then(() => sucess());
    request.catch(() => fail());
  } else {
    const request = axios.post(
      `https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/users/${idFollow}/follow`,
      {},
      config
    );
    request.then(() => sucess());
    request.catch(() => fail());
  }

  function sucess(){
    setFollow(!follow);
    setLoadingFollow(false);
    setRefreshWhoYouFollow(true)         
  }

  function fail(){
    alert("Não foi possível executar a operação");
    setLoadingFollow(false);
    setRefreshWhoYouFollow(true)      
  }
  
  
}