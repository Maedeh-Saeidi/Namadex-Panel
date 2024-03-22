import React, { useEffect, useState } from "react";
import axios from "axios";
import Popup from "../components/Popup";
import SectionTable from "../components/SectionTable";

export default function SectionList() {
  const [sections, setSections] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [imageUrls, setImageUrls] = useState([]);
  const [images, setImages] = useState([]);
  const [openPopup, setOpenPopup] = useState(false);
  const [id, setId] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const sectionApi = "https://api.namadex.ir/api/v1/section";
        const getSections = await axios.get(sectionApi);
        const allSections = getSections.data.data;
        setSections(allSections);

        const imageUrls = [];
        for (const section of allSections) {
          const sectionId = section.id;
          const imageApi = `https://api.namadex.ir/api/v1/section/${sectionId}/image`;
          const imageResponse = await axios.get(imageApi);
          const imageUrl = imageResponse.config.url;
          imageUrls.push(imageUrl);
        }
        setImages(imageUrls);
        setIsLoading(true);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <SectionTable
        isLoading={isLoading}
        sections={sections}
        imageUrls={imageUrls}
        setOpenPopup={setOpenPopup}
        setId={setId}
      ></SectionTable>
      <Popup openPopup={openPopup} setOpenPopup={setOpenPopup} id={id}></Popup>
    </div>
  );
}
