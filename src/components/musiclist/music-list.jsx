import React, { useRef, useState } from "react";
import likeSvg from "./like.svg";
import dislikeSvg from "./dislike.svg";
import { useLoginCreds } from "../commonFunctions/getLoginCreds";
import { Modal } from "../modal";
import { Signup } from "../signup";
import { useLikes } from "../../customHooks/useLikes";

export const MusicList = (props) => {
  const [likedId, setLikedId] = useState(null);
  const playing = useRef(null);
  const [openModal, setModalOpen] = useState(false);
  const [currentPlaying, setCurrentPlaying] = useState({
    id: 0,
    name: "",
    likes: 0,
    dislikes: 0,
    artist: "",
    musicUrl: "",
  });
  const allMusic = props.allMusic;
  const handleAudioPlaying = (id) => {
    if (playing.current) {
      playing.current.pause();
    }
    setCurrentPlaying({
      id: 0,
      name: "",
      likes: 0,
      dislikes: 0,
      artist: "",
      musicUrl: "",
    });
    var selected = allMusic.find((music) => music.id === id);
    setCurrentPlaying(selected);
    if (playing.current) {
      playing.current.load();
      playing.current.play();
    }
  };
  const { isAuthenticated} = useLoginCreds({});
  const likes = useLikes(likedId);
  const handleLike = (id, like) => {
    if (!isAuthenticated) {
      setModalOpen(true);
      return;
    }
    if (likes && arrayFilter(likes, "" + id)) {
      return;
    }
    fetch("https://pbvictor.herokuapp.com/api/music/" + id + "/like", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(like),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("An error occurred when processing the request");
      })
      .then((result) => {
        const newLikes = JSON.parse(localStorage.getItem("likes"));
        if (newLikes) {
          newLikes.push(JSON.stringify(result.id));
          localStorage.setItem("likes", JSON.stringify(newLikes));
        } else {
          let firstLike = [];
          firstLike.push(JSON.stringify(result.id));
          localStorage.setItem("likes", JSON.stringify(firstLike));
        }
        setLikedId(result.id);
      })
      .catch((error) => {
        console.error(error.message);
      });
  };
  const arrayFilter = (array, key) => {
    // let newArray = array;
    if (!array || !key) {
      return ;
    }
    const filteredArray = array.filter((item) => item === key);
    if (filteredArray.length > 0) {
      return filteredArray;
    }
    return null;
  }
  console.log(arrayFilter(likes, ""+currentPlaying.id))
  return (
    <div className="grid grid-cols-3">
      {currentPlaying.id !== 0 && (
        <div className="justify-self-center overflow-hidden col-start-1 col-end-3 w-10/12 h-96 flex justify-end flex-col bg-[url('./components/musiclist/music-art.webp')] bg-cover bg-no-repeat bg-center top-0 sticky">
          <div className="flex justify-between">
            <span
              onClick={() => {
                if (!likes) {
                  handleLike(currentPlaying.id, true);
                  return;
                } else if (
                  !arrayFilter(likes, ""+currentPlaying.id)
                ) {
                  handleLike(currentPlaying.id, true);
                }
              }}
              className={
                (likes && arrayFilter(likes, ""+currentPlaying.id)
                  ? "bg-blue-600"
                  : "bg-blue-100") +
                " hover:bg-gray-500 rounded-full p-2 shadow-sm"
              }
            >
              <img
                src={likeSvg}
                alt=""
                srcset=""
                className="h-6 w-6 cursor-pointer"
              />
              <div>{currentPlaying.likes}</div>
            </span>
            <span
              onClick={() => {
                if (!likes) {
                  handleLike(currentPlaying.id, false);
                  return;
                } else if (!arrayFilter(likes, ""+currentPlaying.id)) {
                  handleLike(currentPlaying.id, false);
                }
              }}
              className={
                (likes && arrayFilter(likes, ""+currentPlaying.id)
                  ? "bg-blue-600"
                  : "bg-blue-100") +
                " hover:bg-gray-500 rounded-full p-2 shadow-sm"
              }
            >
              <img
                src={dislikeSvg}
                alt=""
                srcset=""
                className="h-6 w-6 cursor-pointer"
              />
              <div>{currentPlaying.dislikes}</div>
            </span>
          </div>
          <audio
            className=""
            id={currentPlaying.id}
            controls
            ref={playing}
            onPlay={(e) => handleAudioPlaying(this.id)}
          >
            <source className="" src={currentPlaying.musicUrl} />
          </audio>
          <div>
            {currentPlaying.name} - {currentPlaying.artist}
          </div>
        </div>
      )}
      <div className="space-y-1">
        {allMusic.sort((a,b) => a.likes < b.likes).map((item, index) => (
          <div
            key={index}
            className="flex justify-between items-center bg-white px-5 py-2 rounded-xl w-96"
          >
            <div className="px-3 font-dosis whitespace-nowrap w-52 overflow-clip">
              {item.name} - {item.artist}
            </div>
            {/* <div className="flex text-sm"> */}
            <span
              onClick={() => {
                if (!likes) {
                  handleLike(item.id, true);
                  return;
                } else if (!arrayFilter(likes, ""+item.id)) {
                  handleLike(item.id, true);
                }
              }}
            >
              <img
                src={likeSvg}
                alt=""
                srcset=""
                className="h-4 w-4 cursor-pointer"
              />
              <div
              className={(likes && arrayFilter(likes, ""+item.id)
                ? "text-green-400"
                : "")}>{item.likes}</div>
            </span>
            <span
              onClick={() => {
                if (!likes) {
                  handleLike(item.id, false);
                  return;
                } else if (!arrayFilter(likes, ""+item.id)) {
                  handleLike(item.id, false);
                }
              }}
            >
              <img
                src={dislikeSvg}
                alt=""
                srcset=""
                className="h-4 w-4 cursor-pointer"
              />
              <div
              className={(likes && arrayFilter(likes, ""+item.id)
                ? "text-red-800"
                : "")}>{item.dislikes}</div>
            </span>
            {/* </div> */}
            <button
              onClick={(e) => handleAudioPlaying(item.id)}
              className="bg-red-100 rounded-lg px-2 py-px shadow-sm"
            >
              play
            </button>
          </div>
        ))}
      </div>
      {!isAuthenticated && openModal && (
        <Modal>
          <Signup login />
          <span
            onClick={(e) => setModalOpen(!openModal)}
            className="cursor-pointer text-blue-600 underline"
          >
            close
          </span>
        </Modal>
      )}
    </div>
  );
};
