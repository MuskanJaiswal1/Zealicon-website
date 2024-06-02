import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchZealId } from "../../actions/zeal";
import styles from "./Home.module.css";
// import Swiper core and required modules
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/footer";
import Ghosts from "../../components/Ghosts/Ghosts";

import ModalWrap from "../../components/ModalWrap/ModalWrap";

import Button from "../../components/Button/Button";
import { ImageGallery } from "react-image-grid-gallery";
import { SIGNUP_STARTED } from "../../actions/actionType/actionType";

const Home = ({ isModalOpen, setIsModalOpen }) => {
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
    window.addEventListener("resize", updateWindowSize, false);
  }, []);

  const dispatch = useDispatch();
  const { zealId, isAuthenticated } = useSelector((state) => state.allReducers);

  return (
    <>
      {isModalOpen && <ModalWrap setIsModalOpen={setIsModalOpen} />}

      <Ghosts />

      {/* Header Section ------------------------------------------------------------ */}

      <Header setIsModalOpen={setIsModalOpen} windowSize={windowSize} />

      <main>
        {/* Hero Section ------------------------------------------------------------ */}

        <div className={styles.heroSection}>
          <p className={styles.eventDate}>
            <time dateTime="2024-05-20 20:00">20th May</time>
            {" - "}
            <time dateTime="2024-05-26 20:00">22nd May</time>
          </p>
          <div className={`${styles.btnBox}`}>
            <a
              href="https://play.google.com/store/apps/details?id=com.zealicon_2024"
              target="blank"
            >
              <Button type={"small"} text={"Download App"} action={() => {}} />
            </a>
            {zealId ? (
              <Button
                type={"small"}
                text={"Your Zeal ID"}
                action={() => setIsModalOpen(true)}
              />
            ) : isAuthenticated ? (
              <Button
                type={"small"}
                text={"Pay Now"}
                action={() => {
                  return setIsModalOpen(true);
                }}
              />
            ) : (
              <Button
                type={"small"}
                text={"Register Here"}
                action={() => {
                  dispatch({ type: SIGNUP_STARTED, payload: { step: 2 } });
                  return setIsModalOpen(true);
                }}
              />
            )}
          </div>
        </div>

        {/* Info Section ------------------------------------------------------------ */}

        <div className={styles.sectionsCont} id="about">
          <div className={styles.infoSection}>
            <p className={styles.eventDesc}>
              Zealicon is the annual techno-cultural festival of JSSATE, Noida.
              Dedicated to the celebration of creativity and science, it is a
              stimulating event brimming with youthful dynamism. It transforms
              the campus into a veritable kaleidoscope of people. Involving
              multifarious exciting events from technical scratch to cultural
              zeal. A platform for all the creative minds to express their ideas
              in the form of events including band performances, discussions,
              film screenings that are spread over four days. Apart from the
              exuberant cultural events, Zealicon is also known for its mind
              boggling technical events that creates an ambience for the
              technocrats. Zealicon 2024 will cover the aspects of hysterical
              face of literature along with popular arts, science and
              technology. This edition of Zealicon promises all the trademarks
              of the earlier versions. A plethora of events where academicians
              will vouch out their intellect and artists will showcase the best
              of art. Projecting the fictitious gesture onto the real world,
              Zealicon will act as a connecting link between the fantasy and
              reality. Creating an aura of avidity and togetherness, We hope
              that Zealicon 2024 will turn out to be a memorable experience for
              you !
            </p>

            <div className={styles.imageCollage}>
              <div className={styles.blurBackground}></div>
              <ImageGallery
                imagesInfoArray={collageImages}
                columnWidth={windowSize.width < 900 ? 100 : 200}
                gapSize={10}
              />
            </div>
          </div>

          {/* Sponsors Section ------------------------------------------------------------ */}

          <section className={styles.sponsorsSection}>
            <h2>Our Sponsors</h2>
            <div className={styles.sponsorsPicsCont}>
              <Swiper
                modules={[Autoplay]}
                //   freeMode={true}
                loop={true}
                autoplay={{
                  delay: 1000,
                }}
                slidesPerView={"auto"}
                spaceBetween={50}
              >
                <SwiperSlide style={{ width: "auto" }}>
                  <img
                    className={styles.selectDisable}
                    src={`/images/sponsors/coding_ninja.png`}
                    alt={`Sponsor Logo`}
                  />
                </SwiperSlide>
                <SwiperSlide style={{ width: "auto" }}>
                  <img
                    className={styles.selectDisable}
                    src={`/images/sponsors/pepsi.jpg`}
                    alt={`Sponsor Logo`}
                  />
                </SwiperSlide>
                <SwiperSlide style={{ width: "auto" }}>
                  <img
                    className={styles.selectDisable}
                    src={`/images/sponsors/hell.png`}
                    alt={`Sponsor Logo`}
                  />
                </SwiperSlide>
                <SwiperSlide style={{ width: "auto" }}>
                  <img
                    className={styles.selectDisable}
                    src={`/images/sponsors/beverage.jpg`}
                    alt={`Sponsor Logo`}
                  />
                </SwiperSlide>
                <SwiperSlide style={{ width: "auto" }}>
                  <img
                    className={styles.selectDisable}
                    src={`/images/sponsors/monster.png`}
                    alt={`Sponsor Logo`}
                  />
                </SwiperSlide>
                <SwiperSlide style={{ width: "auto" }}>
                  <img
                    className={styles.selectDisable}
                    src={`/images/sponsors/quantum_ev.jpg`}
                    alt={`Sponsor Logo`}
                  />
                </SwiperSlide>
              </Swiper>
            </div>
          </section>

          {/* Offers Section ------------------------------------------------------------ */}

          <section className={styles.offersSection}>
            <h2>Offers</h2>
            <div className={styles.offersCont}>
              <img
                className={styles.comingSoon}
                src="./images/coming-soon.gif"
                alt="coming soon"
              ></img>
            </div>
            <img
              className={styles.bottomGhost1}
              aria-hidden
              src="./images/ghosts/ghost3.svg"
            ></img>
            <img
              className={styles.bottomGhost2}
              aria-hidden
              src="./images/ghosts/ghost4.svg"
            ></img>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
};

const collageImages = [
  {
    src: "./images/collage/1.jpg",
    alt: "zealicon 2023",
  },
  {
    src: "./images/collage/2.jpg",
    alt: "zealicon 2023",
  },
  {
    src: "./images/collage/3.jpg",
    alt: "zealicon 2023",
  },
  {
    src: "./images/collage/4.jpg",
    alt: "zealicon 2023",
  },
  {
    src: "./images/collage/5.jpg",
    alt: "zealicon 2023",
  },
  {
    src: "./images/collage/6.jpg",
    alt: "zealicon 2023",
  },
  {
    src: "./images/collage/7.jpg",
    alt: "zealicon 2023",
  },
  {
    src: "./images/collage/8.jpg",
    alt: "zealicon 2023",
  },
  {
    src: "./images/collage/9.jpg",
    alt: "zealicon 2023",
  },
  {
    src: "./images/collage/10.jpg",
    alt: "zealicon 2023",
  },
  {
    src: "./images/collage/11.jpg",
    alt: "zealicon 2023",
  },
  {
    src: "./images/collage/12.jpg",
    alt: "zealicon 2023",
  },
  {
    src: "./images/collage/13.jpg",
    alt: "zealicon 2023",
  },
  {
    src: "./images/collage/14.jpg",
    alt: "zealicon 2023",
  },
  {
    src: "./images/collage/15.jpg",
    alt: "zealicon 2023",
  },
  {
    src: "./images/collage/16.jpg",
    alt: "zealicon 2023",
  },
];

export default Home;
