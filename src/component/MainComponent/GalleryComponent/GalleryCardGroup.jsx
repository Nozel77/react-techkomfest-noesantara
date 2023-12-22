import React, { useEffect, useState } from 'react';


const getPatternSize = (index) => {
    const patterns = [
        ['1', '1', '1'],
        ['1', '2'],
        ['2', '1'],
        ['3']
    ];

    const patternIndex = index % patterns.length;
    return patterns[patternIndex];
};

const GalleryCardGroup = ({ images, searchQuery }) => {
    const [imageSizes, setImageSizes] = useState([]);

    useEffect(() => {
        let sizes = [];
        images.forEach((_, index) => {
            const pattern = getPatternSize(index);
            sizes.push(...pattern);
        });
        setImageSizes(sizes);
        console.log(images)
    }, [images]);

    const filteredImages = searchQuery
        ? images.filter((image) => image.toLowerCase().includes(searchQuery.toLowerCase()))
        : images;

    return (
        <>
            <div className=" w-full grid grid-cols-3 gap-2 overflow-y-auto h-[40vh] lg:h-[70vh]">
                {filteredImages.map((image, index) => (
                    <div key={index} className={`col-span-${imageSizes[index]}`}>
                        <img
                            src={image}
                            alt={`Culture Image ${index}`}
                            className="w-full h-[89px] lg:h-[186px] rounded-lg object-cover"
                        />
                    </div>
                ))}
            </div>
        </>
    );
};

export default GalleryCardGroup;