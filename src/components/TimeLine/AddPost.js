import axios from "axios";
import { useState } from "react";
import styled from "styled-components";

export default function AddPost() {
    const [link, setLink] = useState("");
    const [text, setText] = useState("");
    const [submitting, setSubmitting] = useState(false);
    //const { user } = useContext(UserContext);
    const token = "111";

    function submitPublish(e) {
        e.preventDefault();
        setSubmitting(true);
        const config = { headers: { Authorization: `Bearer ${token}` } };
        const post = { link, text };

        const request = axios.post(
            "https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/posts",
            post,
            config
        );
        request.then(() => {
            setSubmitting(false);
            setLink("");
            setText("");
            //atualizar lista de posts;
            console.log("Submit done");
        });
        request.catch(() => {
            setSubmitting(false);
            alert("Houve um erro ao publicar seu link");
        });
    }
    return (
        <Structure>
            <img
                src="https://pbs.twimg.com/profile_images/1382815821148385287/evfQlSZ__400x400.jpg"
                alt="avatar do usuário"
            />
            <Inputs>
                <p>O que você tem para favoritar hoje?</p>
                <form onSubmit={submitPublish}>
                    <URL
                        type="Url"
                        placeholder="http://..."
                        onChange={(e) => setLink(e.target.value)}
                        value={link}
                        disabled={submitting}
                        required
                    ></URL>
                    <Coment
                        placeholder="Muito irado esse link falando de #javascript"
                        onChange={(e) => setText(e.target.value)}
                        disabled={submitting}
                        value={text}
                    ></Coment>
                    <PositionButton>
                        {submitting ? (
                            <Button type="submit" disabled>
                                Publishing ...
                            </Button>
                        ) : (
                            <Button type="submit">Publicar</Button>
                        )}
                    </PositionButton>
                </form>
            </Inputs>
        </Structure>
    );
}

const Structure = styled.div`
    width: 100%;
    height: 209px;

    margin-bottom: 29px;

    border-radius: 16px;
    padding: 16px 22px 16px 18px;
    background-color: white;
    display: flex;

    img {
        width: 50px;
        height: 50px;

        border-radius: 50%;
        margin-right: 18px;

        @media (max-width: 640px) {
            display: none;
        }
    }

    @media (max-width: 640px) {
        border-radius: 0px;
    }
`;

const Inputs = styled.div`
    width: 100%;
    p {
        font-size: 20px;
        margin-bottom: 15px;
        color: #707070;

        @media (max-width: 640px) {
            display: flex;
            justify-content: center;
        }
    }
`;

const URL = styled.input`
    width: 100%;
    height: 30px;

    margin-bottom: 5px;
    background-color: #efefef;
    border: none;
    border-radius: 5px;

    padding-left: 13px;

    ::placeholder {
        font-size: 15px;
        color: #949494;
    }
`;

const Coment = styled.input`
    width: 100%;
    height: 66px;

    margin-bottom: 5px;
    background-color: #efefef;
    border: none;
    border-radius: 5px;

    vertical-align: baseline;
    padding: 8px 13px;

    ::placeholder {
        font-size: 15px;
        color: #949494;
    }

    @media (max-width: 640px) {
        height: 47px;
    }
`;

const Button = styled.button`
    width: 112px;
    height: 31px;

    font-size: 14px;
    color: #fff;

    border-radius: 5px;
    border: none;
    background-color: #1877f2;
`;

const PositionButton = styled.div`
    display: flex;
    justify-content: flex-end;
`;
