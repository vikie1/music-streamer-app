import React, { useRef, useState } from "react";
import { protectedVars } from "../protectedVars";

export const MusicUpload = (props) => {
  const [name, setName] = useState(null);
  const [artist, setArtist] = useState(null);
  const [file, setFile] = useState(null);
  const [musicUrl, setMusicUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    const cloudinaryUploadAPI = protectedVars('cloudinary')
    const preset = protectedVars('preset')
    const formData = new FormData();
    formData.append("file", e.target.files[0]);
    formData.append("folder", "music");
    formData.append("upload_preset", preset);
    setIsLoading(true);
    setFile(e.target.files[0].name);
    fetch(cloudinaryUploadAPI, {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        if (response.ok) {
          return response.text();
        }
        throw Error("There was a problem with the upload request");
      })
      .then((data) => {
        const result = JSON.parse(data);
        setIsLoading(false);
        setMusicUrl(result.secure_url);
      })
      .catch((error) => {
        if (error.name === "AbortError") {
          console.log("aborted");
        } else {
          setError(error.message);
        }
      });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const musicDetails = { name, artist, musicUrl };
    setIsLoading(true);
    fetch("https://pbvictor.herokuapp.com/api/music/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(musicDetails),
    })
      .then((response) => {
        if (response.ok) {
          setError(null);
          return response.json();
        }
        throw Error("There was a problem saving the data");
      })
      .then(() => {
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        setError(error.message);
      });
  };

  //file input area
  const handleDrop = (e) => {
    e.preventDefault();
  };
  const handleDragOver = (e) => {
    e.preventDefault();
  };
  const handleDragEnter = (e) => {
    e.preventDefault();
  };
  const handleDragLeave = (e) => {
    e.preventDefault();
  };
  return (
    <div className="">
      <form className="flex flex-col space-y-1 justify-center items-center" onSubmit={(e) => handleSubmit(e)}>
        <input
        className="bg-transparent outline outline-1 outline-gray-700 rounded-sm"
          type="text"
          value={name}
          placeholder="Music name"
          onChange={(e) => setName(e.target.value)}
        />
        <input
        className="bg-transparent outline outline-1 outline-gray-700 rounded-sm"
          type="text"
          value={artist}
          placeholder="Artist name"
          onChange={(e) => setArtist(e.target.value)}
        />
        <label
          className="border-2 p-2"
          htmlFor="fileInput"
          onDrop={(e) => handleDrop(e)}
          onDragOver={(e) => handleDragOver(e)}
          onDragEnter={(e) => handleDragEnter(e)}
          onDragLeave={(e) => handleDragLeave(e)}
          onChange={handleFileChange}
        >
          {file ? file : "Click to upload file"}
        </label>
        <input
          onChange={(e) => handleFileChange(e)}
          className="cursor-pointer opacity-0 z-10"
          type="file"
          accept="audio/*"
          placeholder="Upload music file"
          id="fileInput"
        />
        {isLoading ? <div>Uploading File</div> : null}
        {error ? <div>{error}</div> : null}
        {musicUrl && <button>Submit</button>}
      </form>
    </div>
  );
};
