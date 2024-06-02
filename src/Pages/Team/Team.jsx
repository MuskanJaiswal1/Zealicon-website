import React from "react";
import teamData from "./data.jsx";
import teamDataTech from "./techteamdata.jsx";
import teamDataMan from "./dataman.jsx";
import { useEffect, useState } from "react";
import "./Team.css";

import Header from "../../components/Header/Header.jsx";
import Footer from "../../components/Footer/footer.jsx";
import ModalWrap from "../../components/ModalWrap/ModalWrap.jsx";


function Team({ isModalOpen, setIsModalOpen }) {
  const [team, setTeam] = useState([]);
  const [techTeam, setTechTeam] = useState([]);
  const [manTeam, setManTeam] = useState([]);
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    setTeam(teamData);
    setTechTeam(teamDataTech);
    setManTeam(teamDataMan);
  }, []);

  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const updateWindowSize = () => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };

  useEffect(() => {
    window.addEventListener("resize", updateWindowSize);
    return () => window.removeEventListener("resize", updateWindowSize);
  }, []);

  return (
    <>
      {isModalOpen && <ModalWrap setIsModalOpen={setIsModalOpen} />}
      <Header setIsModalOpen={setIsModalOpen} windowSize={windowSize} />

      <div className="rotate linear infinite flex justify-center bg-center bg-no-repeat bg-cover bg-backYellow justify-items-center topteam">
        <div className="team pt-36 px-4"></div>
      </div>
      <div className="frames flex flex-row">
        <div className="hidden md:block frame">
          <img
            className="leftframe"
            src="/assets/images/leftframe.png"
            alt=""
          />
        </div>
        <div className="hidden md:block frame">
          <img
            className="rightframe"
            src="/assets/images/rightframe.jpg"
            alt=""
          />
        </div>
      </div>

      {/* <div className=" topteam py-32 flex justify-center bg-center bg-no-repeat bg-cover bg-backYellow h-full justify-items-center land">
        <div className=" px-3 h-full flex justify-center justify-items-center items-center">
          <img className="" src="/assets/images/Teampage.png" alt="" />
        </div>
      </div> */}

      <div className="main">
        <div className="pt-6 ">
        <p className=" eventhead text-center text-4xl text-[#7EF2F6] font-[rabu-kliwon] pb-8">Management Team Committee</p>
          <div>
            <div className="cards11 pt-16  flex flex-wrap justify-center w-33%">
              {manTeam.map((Member) => (
                <div className="w-33% px-10 pb-20 mb-32 pp">
                  <img
                    className="object-cover"
                    src={Member.photo}
                    alt={Member.name}
                  />
                  <h3 className="bg-brighterYellow w-full text-center">
                    {Member.name}
                  </h3>
                  <h3 className="bg-brighterYellow  w-full text-center">
                    {Member.designation}
                  </h3>
                </div>
              ))}
            </div>
            {/* //prashant sir principal sir images */}
          </div>
        </div>
        <div class="px-10 grid grid-cols-1 md:grid-cols-3 justify-center md:justify-around gap-y-7">
          <div>
            <p className=" text-[#7EF2F6] font-[rabu-kliwon] px-8 pt-6 text-s md:text-left md:text-l lg:text-3xl text-center">
              {" "}
              Technical Committee
            </p>
            <div className=" text-white text-center md:text-left px-8 text-xs md:text-md lg:text-xl">
              Dr. K.S. Sujata(Chairman)
              <br />
              Dr. Dheeraj Pandey(Convener)
              <br />
              Dr. Suvandan Saraswat(Member)
              <br />
              Mr. Rahul Kumar Gupta(Member)
              <br />
            </div>
          </div>
          <div>
            <p className=" text-[#7EF2F6] text-center font-[rabu-kliwon] md:text-left px-8 pt-6 text-s md:text-l lg:text-3xl">
              {" "}
              Cultural and Literary Committee
            </p>
            <div className=" text-white text-center  md:text-left px-8 text-xs md:text-md lg:text-xl">
              Dr. Roli Verma(Chairperson)
              <br />
              Dr. Ashima Srivastava(Convener)
              <br />
              Dr. Nishi Sharma(Member)
              <br />
              Dr. Kirti Srivastava(Member)
              <br />
            </div>
          </div>
          <div>
            <p className="text-[#7EF2F6] text-center font-[rabu-kliwon] md:text-left px-8 pt-6 text-s md:text-l lg:text-3xl">
              {" "}
              Finance Committee
            </p>
            <div className=" text-white text-center md:text-left  px-8 text-xs md:text-md lg:text-xl">
              Dr. Manoj Kumar N S(Chairperson)
              <br />
              Dr. R S Jagdish(Convener)
              <br />
              Dr. S.S. Shirur(Member) <br />
              Dr. Prashant Chauhan(Member) <br />
            </div>
          </div>
          <div>
            <p className=" text-[#7EF2F6] font-[rabu-kliwon] px-8 pt-6 text-s md:text-l  text-center md:text-left  lg:text-3xl">
              {" "}
              Discipline Committee
            </p>
            <div className=" text-white  md:text-left px-8 text-xs md:text-md lg:text-xl text-center ">
              Dr. Arun Kumar G.(Chairperson)
              <br />
              Dr. Harikesh Singh(Convener)
              <br />
              Dr. Chhaya Grover(Member)
              <br />
              Dr. Sanjiba Kr. Bisoyi(Member)
              <br />
              Dr. Navneet Kumar Pandey(Member)
              <br />
            </div>
          </div>
          <div>
            <p className=" text-[#7EF2F6] font-[rabu-kliwon] text-center md:text-left px-8 pt-6 text-s md:text-l lg:text-3xl">
              {" "}
              Publicity/Media/ Banner
            </p>
            <div className=" text-white  md:text-left px-8 text-xs md:text-md lg:text-xl text-center ">
              Dr. Yogendra Singh (Chairperson)
              <br />
              Mr. A N Veerendra Kumar (Convener)
              <br />
              Mr. Naveen J.(Member)
              <br />
              Mr. Girish B.E(Member)
              <br />
            </div>
          </div>
          <div>
            <p className=" text-[#7EF2F6] font-[rabu-kliwon] md:text-left px-8 pt-6 text-s md:text-l lg:text-3xl text-center ">
              {" "}
              Sponsorship Committee
            </p>
            <div className=" text-white md:text-left px-8 text-xs md:text-md lg:text-xl text-center ">
              Dr. Prashant Chauhan (Chairperson)
              <br />
              Mr. Nitin Kumar Chauhan(Convener)
              <br />
              Mr. Nirmal Agarwal(Member)
              <br />
            </div>
          </div>
          <div>
            <p className=" text-[#7EF2F6] font-[rabu-kliwon] px-8 md:text-left pt-6 text-center text-s md:text-l lg:text-3xl">
              {" "}
              Inauguration Committee
            </p>
            <div className=" text-white text-center  md:text-left px-8 text-xs md:text-md lg:text-xl">
              Dr. Pranava Manjari (Chairperson)
              <br />
              Dr. Ranu Pandey (Convener)
              <br />
              Ms. Sangeeta Singh(Member)
              <br />
              Ms. Divya Chandra(Member)
              <br />
            </div>
          </div>
          <div>
            <p className=" text-[#7EF2F6] font-[rabu-kliwon] px-8 pt-6 md:text-left text-center text-s md:text-l lg:text-3xl ">
              {" "}
              Registration Committee
            </p>
            <div className=" text-white md:text-left text-center px-8 text-xs md:text-md lg:text-xl">
              Dr. Bhupender Parashar (Chairperson)
              <br />
              Dr. Nikunj Agarwal (Convener)
              <br />
              Mr. Rajesh Kumar(Member)
              <br />
            </div>
          </div>
          <div>
            <p className=" text-[#7EF2F6] font-[rabu-kliwon] md:text-left text-center px-8 pt-6 text-s md:text-l lg:text-3xl ">
              {" "}
              Stationary Committee
            </p>
            <div className=" text-white    md:text-left text-center px-8 text-xs md:text-md lg:text-xl">
              Dr. S.S Shirur(Chairperson)
              <br />
              Dr. Deependra Sharma (Convener)
              <br />
              Mr. Udit Mittal(Member)
              <br />
              Dr. Priyanka Singh(Member)
              <br />
            </div>
          </div>
        </div>
        <p className=" eventhead text-center text-4xl md:text-5xl pt-24 text-[#7EF2F6] font-[rabu-kliwon] pb-32">
          Core Team Committee
        </p>
        <div className=" ">
          <div className="cards11 pt-4 flex flex-wrap justify-center w-full">
            <div className="w-33% px-10 pb-20 mb-32 imgsec">
              <img src="https://res.cloudinary.com/dik7zcdyq/image/upload/v1715781923/22_bsqx2t.png" alt="manas" />
              {/* <h3 className="bg-brighterYellow w-full text-center">
                  Manas Goel
                </h3>
                <h3 className="bg-brighterYellow  w-full text-center">
                  Fest Secretary
                </h3> */}
            </div>
            <div className="w-45% px-10 pb-20 mb-32 imgsec">
              <img src="https://res.cloudinary.com/dik7zcdyq/image/upload/v1715781901/4_dczykd.png" alt="anant" />
              {/* <h3 className="bg-brighterYellow w-full text-center">
                  Anant Mishra
                </h3>
                <h3 className="bg-brighterYellow  w-full text-center">
                  Fest Co-Secretary
                </h3> */}
            </div>
          </div>
          
          <div className="cards11  flex flex-wrap justify-center w-full">
            {team.map((Member) => (
              <div className="w-45% px-10 pb-15 mb-16 md:mb-32 pp">
                <img
                  className="object-cover ppo"
                  src={Member.photo}
                  alt={Member.name}
                />
                {/* <h3 className="bg-brighterYellow w-full text-center">
                  {Member.name}
                </h3> */}
                {/* <h3 className="bg-brighterYellow  w-full text-center">
                  {Member.designation}
                </h3> */}
              </div>
            ))}
          </div>
        </div>

        <p className=" eventhead text-center text-4xl md:text-5xl  text-[#7EF2F6] font-[rabu-kliwon] pb-32">
          Tech Team
        </p>
        <div className="cards11 pt-4 flex flex-wrap justify-center w-full">
            <div className="w-33% px-10 mb-16">
              <img src="https://res.cloudinary.com/dmivhxpam/image/upload/v1715781939/assets/images/TechTeam/anant_wdq07q.jpg" alt="anant" className="pp" />
              <h3 className="bg-brighterYellow w-full text-center">
                  Anant Mishra
                </h3>
                <h3 className="bg-brighterYellow  w-full text-center">
                  Developer
                </h3>
            </div>
            <div className="w-45% px-10 mb-16">
              <img src="https://res.cloudinary.com/dmivhxpam/image/upload/v1715781939/assets/images/TechTeam/ayush_c9vhyu.jpg" alt="ayush" className="pp" />
              <h3 className="bg-brighterYellow w-full text-center">
                  Ayush Pandey
                </h3>
                <h3 className="bg-brighterYellow  w-full text-center">
                 Developer
                </h3>
            </div>
            <div className="w-45% px-10 ">
              <img src="https://res.cloudinary.com/dmivhxpam/image/upload/v1715781945/assets/images/TechTeam/prakhar_q4x9hb.jpg" alt="prakhar" className="pp" />
              <h3 className="bg-brighterYellow w-full text-center">
                  Prakhar Sharma
                </h3>
                <h3 className="bg-brighterYellow  w-full text-center">
                 Developer
                </h3>
            </div>
          </div>
        <div className=" pb-36">
          <div className="cards11 pt-6 flex flex-wrap justify-center w-full">
            {techTeam.map((Member) => (
              <div className="w-33% px-10 pb-20 mb-40 pp">
                <img
                  className="object-cover "
                  src={Member.photo}
                  alt={Member.name}
                />
                <h3 className="bg-brighterYellow w-full text-center">
                  {Member.name}
                </h3>
                <h3 className="bg-brighterYellow  w-full text-center">
                  {Member.designation}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Team;
