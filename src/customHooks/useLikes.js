import { useEffect, useState } from "react";

export const useLikes = (likedId) => {
  const [likes, setLikes] = useState([]);
  useEffect(() => {
    const localLikes = JSON.parse(localStorage.getItem("likes"));
    if (localLikes) {
      setLikes(localLikes);
    }
  }, [likedId]);
  console.log(likes);
  return likes;
};
