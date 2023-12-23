import React, { useEffect } from "react";
import ClothDetailCardGroup from "./ClothDetailCardGroup.jsx";
import AOS from "aos";
import "aos/dist/aos.css";

const ClothDetailTraditional = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
    });
  }, []);
  return (
    <>
      <div className="h-screen w-screen relative mt-32">
        <div className="flex flex-wrap items-center gap-7 lg:flex-row-reverse lg:gap-0 ">
          <ClothDetailCardGroup />
          <div className="flex flex-col w-full mx-auto px-12 gap-4 lg:w-[671px] lg:px-0">
            <p
              data-aos="fade-right"
              className="font-milonga text-[36px] text-primary w-full  lg:text-[80px] lg:w-[671px] "
            >
              What is traditional clothes?
            </p>
            <p
              data-aos="fade-right"
              className="  font-urbanist text-xl text-justify leading-[33px] tracking-wide w-full  lg:text-[32px] lg:w-[651px] lg:leading-[55px]  "
            >
              Baju adat Indonesia mencerminkan kekayaan budaya dengan ciri khas
              dan makna. Terbuat dari kain tradisional seperti batik, tenun, dan
              sutra, dihiasi motif flora, fauna, dan geometris. Sebagai simbol
              identitas budaya, menarik perhatian dunia internasional.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ClothDetailTraditional;
