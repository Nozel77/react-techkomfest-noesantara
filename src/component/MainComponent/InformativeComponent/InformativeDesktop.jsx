import {useNavigate} from "react-router-dom";
import React, {useEffect, useState} from "react";
import axios from "axios";
import Slider from "react-slick";
import Navbar from "../../../global_component/Navbar.jsx";
import {bgGallery2, bgGallery4, bgGallery5, bgGallery6} from "../../../utils/images.js";

export default function InformativeDesktop({searchQuery, handleSearchChange, settings, previous, next, currentSlide, sliderRef,}) {
    const navigate = useNavigate();
    const [backgroundImages, setBackgroundImages] = useState([bgGallery5, bgGallery2, bgGallery6, bgGallery4]);
    const [isLoading, setLoading] = useState(false);
    const [cardList, setCardList] = useState([{}]);
    const [currentBackgroundIndex, setCurrentBackgroundIndex] = useState(0);
    const [fade, setFade] = useState(false);
    const isCurrentSlide = (index) => index === currentSlide;


    const fetchData = async () => {
        try {
            setLoading(true);
            const response = await axios.get('https://zell-techkomfest.000webhostapp.com/api/informative');
            const data = response.data.data;

            const filteredData = data.filter((item) => item.province.toLowerCase().includes(searchQuery.toLowerCase()),);

            setCardList(filteredData);
            console.log("Filtered Data" + cardList)

        } catch (error) {

            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        fetchData();

        const interval = setInterval(() => {
            setFade(true);

            setTimeout(() => {
                setCurrentBackgroundIndex((prevIndex) => (prevIndex === backgroundImages.length - 1 ? 0 : prevIndex + 1));
                setFade(false);
            }, 500);
        }, 3000);

        return () => {
            clearInterval(interval);
        };
    }, [searchQuery, backgroundImages]);

    const handleSeeMore = () => {
        const selectedCardId = cardList[currentSlide].id;
        const selectedCardImage = cardList[currentSlide].image;

        navigate("/detail", {state: {selectedCardId, selectedCardImage}});
    };

    return (
        <>
            {isLoading || cardList.length === 0 ? <div className="h-screen w-screen relative">
                <div className="absolute w-full h-full bg-black opacity-95"></div>
                <img
                    className={`w-full h-full object-cover absolute transition-opacity duration-500 ease-in-out ${fade ? 'opacity-0' : 'opacity-100'}`}
                    src={backgroundImages[currentBackgroundIndex]}
                    alt="Background Informative Page"
                />
                <div className="h-full w-full absolute object-cover bg-black bg-opacity-50"></div>

                <div className="absolute flex h-screen items-center justify-center px-16">
                    <div className="w-1/2 pe-8">
                        <div className="flex flex-col">
                            <div
                                className="border border-white border-opacity-70 mt-[55px] h-[39px] rounded-[20px] flex  lg:h-[48px] lg:rounded-3xl lg:flex items-center gap-1 lg:gap-5 lg:text-sm lg:mb-5">
                                <ion-icon
                                    name="search-outline"
                                    style={{
                                        fontSize: "24px", margin: "0 10px", marginLeft: "20px", color: "white",
                                    }}
                                ></ion-icon>
                                <input
                                    type="text"
                                    placeholder="What do you want to learn today?"
                                    value={searchQuery}
                                    onChange={handleSearchChange}
                                    className="bg-transparent font-urbanist text-white w-full text-[10px] lg:text-base lg:h-[48px] rounded-3xl focus:outline-none"
                                />
                            </div>

                            <h1 className="font-milonga text-[80px] text-white mb-4">
                                {isLoading ? "Loading..." : cardList.length === 0 ? "Not Found" : null}
                            </h1>
                            <p className="font-urbanist font-normal text-base text-white pe-16 mb-11">
                                {isLoading ? "Waiting for the data load." : cardList.length === 0 ? "The province you seek is not found." : null}
                            </p>
                            <button
                                onClick={handleSeeMore}
                                className="w-36 h-11 border-[1px] border-white rounded-full text-white font-urbanist"
                            >
                                See More
                            </button>
                        </div>
                    </div>

                    <div className="w-1/2 mt-32">
                        <div className="flex justify-between w-full mb-5">
                            <div className="flex w-3/4"></div>
                            <div className="flex justify-end gap-4  my-4 lg:my-0">
                                <div
                                    onClick={previous}
                                    className="bg-white h-10 w-10 rounded-full flex justify-center items-center"
                                >
                                    <svg
                                        className="w-3 lg:w-4 rotate-180"
                                        viewBox="0 0 26 37"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M3.91932 -5.12479e-05L26 18.101L3.91932 36.2021L8.34617e-07 32.9892L18.1614 18.101L8.34617e-07 3.21289L3.91932 -5.12479e-05Z"
                                            fill="#646464"
                                        />
                                    </svg>
                                </div>
                                <div
                                    onClick={next}
                                    className="bg-white h-10 w-10 rounded-full flex justify-center items-center"
                                >
                                    <svg
                                        className="w-3 lg:w-4"
                                        viewBox="0 0 26 37"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M3.91932 -5.12479e-05L26 18.101L3.91932 36.2021L8.34617e-07 32.9892L18.1614 18.101L8.34617e-07 3.21289L3.91932 -5.12479e-05Z"
                                            fill="#646464"
                                        />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        <div className="w-[50vw] ">

                        </div>
                    </div>
                </div>
                <Navbar/>
            </div> : <div className="h-screen w-screen relative">
                <img
                    className="h-full w-full absolute object-cover"
                    src={cardList[currentSlide].image}
                    alt="Background Informative Page"
                />
                <div className="h-full w-full absolute object-cover bg-black bg-opacity-50"></div>

                <div className="absolute flex h-screen items-center justify-center px-16">
                    <div className="w-1/2 pe-8">
                        <div className="flex flex-col">
                            <div
                                className="border border-white border-opacity-70 mt-[55px] h-[39px] rounded-[20px] flex  lg:h-[48px] lg:rounded-3xl lg:flex items-center gap-1 lg:gap-5 lg:text-sm lg:mb-5">
                                <ion-icon
                                    name="search-outline"
                                    style={{
                                        fontSize: "24px", margin: "0 10px", marginLeft: "20px", color: "white",
                                    }}
                                ></ion-icon>
                                <input
                                    type="text"
                                    placeholder="What do you want to learn today?"
                                    value={searchQuery}
                                    onChange={handleSearchChange}
                                    className="bg-transparent font-urbanist text-white w-full text-[10px] lg:text-base lg:h-[48px] rounded-3xl focus:outline-none"
                                />
                            </div>

                            <h1 className="font-milonga text-[80px] text-white mb-4">
                                {cardList[currentSlide].province}
                            </h1>
                            <p className="font-urbanist font-normal text-base text-white pe-16 mb-11">
                                {cardList[currentSlide].description}
                            </p>
                            <button
                                onClick={handleSeeMore}
                                className="w-36 h-11 border-[1px] border-white rounded-full text-white font-urbanist"
                            >
                                See More
                            </button>
                        </div>
                    </div>

                    <div className="w-1/2 mt-32">
                        <div className="flex justify-between w-full mb-5">
                            <div className="flex w-3/4"></div>
                            <div className="flex justify-end gap-4  my-4 lg:my-0">
                                <div
                                    onClick={previous}
                                    className="bg-white h-10 w-10 rounded-full flex justify-center items-center"
                                >
                                    <svg
                                        className="w-3 lg:w-4 rotate-180"
                                        viewBox="0 0 26 37"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M3.91932 -5.12479e-05L26 18.101L3.91932 36.2021L8.34617e-07 32.9892L18.1614 18.101L8.34617e-07 3.21289L3.91932 -5.12479e-05Z"
                                            fill="#646464"
                                        />
                                    </svg>
                                </div>
                                <div
                                    onClick={next}
                                    className="bg-white h-10 w-10 rounded-full flex justify-center items-center"
                                >
                                    <svg
                                        className="w-3 lg:w-4"
                                        viewBox="0 0 26 37"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M3.91932 -5.12479e-05L26 18.101L3.91932 36.2021L8.34617e-07 32.9892L18.1614 18.101L8.34617e-07 3.21289L3.91932 -5.12479e-05Z"
                                            fill="#646464"
                                        />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        <div className="w-[50vw] ">
                            <Slider ref={sliderRef} {...settings}>
                                {cardList.map((card, index) => (<img
                                    className={`w-1/2 ${isCurrentSlide() ? "h-[205px]" : "h-[505px]"} rounded-3xl object-cover pe-5`}
                                    src={card.image}
                                    alt={`Informative Slide ${index}`}
                                />))}
                            </Slider>
                        </div>
                    </div>
                </div>
                <Navbar/>
            </div>}
        </>
    );
}