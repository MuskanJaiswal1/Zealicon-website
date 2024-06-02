import * as React from "react";
import "./Events.css";
import NorthEastIcon from "@mui/icons-material/NorthEast";
import { useUserState } from "../../context/UserState";
// const bull = (
//   <Box
//     component="span"
//     sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
//   >
//     •
//   </Box>
// );

export default function ZealCard() {
  const { setModalState, handleOpen, modalState, zealId } = useUserState();
  const tokenp = localStorage.getItem("token");
  const handlegetZeal = () => {
    setModalState(5);
    handleOpen();
  };
  return (
    <>
      {tokenp && !zealId && (
        <div className="ml-10 container w-4/5  mt-10 px-5 flex justify-around items-center text-white border-2 border-white rounded-xl border-solid">
          <div className=" data zealcard text-left  pt-5 flex flex-col justify-start">
            <div className="flex flex-row text-left font-extrabold pb-2.5">
              Uh oh! Seems like you don't have a Zeal Tag :(
            </div>
            <div className="font-light pb-2.5 flex flex-col justify-start w-[80%]">
              Get your Zeal Tag now and enjoy exclusive benefits of Zealicon
              2023.Don't Wait, Click get now to purchase and enjoy the real
              benefits of zealicon
            </div>
          </div>
          <div>
            <button
              type="Submit"
              className="w-40 h-10 mt-2.5 mb-2.5 text-center text-white rounded-lg border-2 border-solid border-black bg-landingPink"
              onClick={handlegetZeal}
            >
              Get Now <NorthEastIcon />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
