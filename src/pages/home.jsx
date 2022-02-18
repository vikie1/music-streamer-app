import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Modal } from "../components/modal";
import { MusicUpload } from "../components/music-upload";
import { Signup } from "../components/signup";
import { useLoginCreds } from "../components/commonFunctions/getLoginCreds";

export const HomePage = (props) => {
  const [openModal, setModalOpen] = useState(false);
  // const [credentials, setCredentials] = useState()
  const { isAuthenticated, name } = useLoginCreds({});
  return (
    <div className="text-white">
      {/* Create a div for background image */}
      <main className="w-screen h-screen bg-[url('../public/images/background.jpg')]  bg-cover flex flex-col justify-center items-center">
        <h1 className="px-2 text-center font-cabin text-5xl font-extrabold">
          Quench your thirst for music with us
        </h1>
        {name && <div className="font-dosis">You are currently logged in as {name}</div>}
        <p className="font-nunito text-xl px-[20%] text-center">
          We have a great collection of music and you are invited to add more
        </p>
        <div className="my-3">
          <Link
            to="/playlist"
            className="bg-blue-600 p-2 mx-1 rounded-sm transition-colors hover:bg-blue-700"
          >
            Start Streaming
          </Link>
          {isAuthenticated && (
            <span
              onClick={(e) => setModalOpen(!openModal)}
              className="cursor-pointer bg-blue-600 p-2 mx-1 rounded-sm transition-colors hover:bg-blue-700"
            >
              Upload Music
            </span>
          )}
          {!isAuthenticated && (
            <span
              onClick={(e) => setModalOpen(!openModal)}
              className="cursor-pointer bg-blue-600 p-2 mx-1 rounded-sm transition-colors hover:bg-blue-700"
            >
              Login
            </span>
          )}
        </div>
        {isAuthenticated && openModal && (
          <Modal>
            <MusicUpload />
            <span
              onClick={(e) => setModalOpen(!openModal)}
              className="cursor-pointer bg-blue-600 p-2 mx-1 rounded-sm transition-colors hover:bg-blue-700"
            >
              close
            </span>
          </Modal>
        )}
        {!isAuthenticated && openModal && (
          <Modal>
            <Signup login />
            <span
              onClick={(e) => setModalOpen(!openModal)}
              className="cursor-pointer bg-blue-600 p-2 mx-1 rounded-sm transition-colors hover:bg-blue-700"
            >
              close
            </span>
          </Modal>
        )}
      </main>
    </div>
  );
};
