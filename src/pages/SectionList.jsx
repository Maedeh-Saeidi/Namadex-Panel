import React, { useEffect, useState } from "react";
import axios from "axios";
import Popup from "./Popup";
import SectionTable from "../components/SectionTable";
import PostsPopup from "./PostsPopup";

export default function SectionList() {
  const [sections, setSections] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState([]);
  const [openPopup, setOpenPopup] = useState(false);
  const [id, setId] = useState("");
  const [reRender, setReRender] = useState(false);
  const [dspPosts, setDspPosts] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const sectionApi = "https://api.namadex.ir/api/v1/section";
        const getSections = await axios.get(sectionApi);
        const allSections = getSections.data.data;
        allSections.sort((a, b) => a.id - b.id);
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
    if (reRender) {
      fetchData();
      setReRender(false);
    }
  }, [reRender]);
  return (
    <div>
      <SectionTable
        isLoading={isLoading}
        sections={sections}
        images={images}
        setOpenPopup={setOpenPopup}
        setDspPosts={setDspPosts}
        setId={setId}
      ></SectionTable>
      <Popup
        setReRender={setReRender}
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
        id={id}
      ></Popup>
      <PostsPopup
        setReRender={setReRender}
        sections={sections}
        isLoading={isLoading}
        dspPosts={dspPosts}
        setDspPosts={setDspPosts}
        id={id}
      ></PostsPopup>
    </div>
  );
}
