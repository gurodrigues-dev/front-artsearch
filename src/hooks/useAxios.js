import axios from "axios";
import { useState } from "react";

const createAxiosInstance = () => {
  const instance = axios.create({
    baseURL: "http://127.0.0.1",
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });

  return instance;
};

const formatNumbers = (number, type) => {

  let formatedNumber = 0;

  if(type === "follows") {
    formatedNumber = number.toLocaleString("pt-BR");
  } else {
    const minuts= Math.floor(number / 60000); 
    const seconds = ((number % 60000) / 1000).toFixed(0);

    formatedNumber = `${minuts}:${seconds.padStart(2, '0')}`;
  }

  return formatedNumber;
} 

export const useAxios = () => {
  const [axiosInstance] = useState(createAxiosInstance);

  // random artist
  const get = async (url) => {
    try {
      const response = await axiosInstance.get(url);

      return response.data.name;

    } catch (error) {
      throw error
    }
  }

  // checkmusic e albumTracks
  const post = async (url, formData) => {
    try {
      const response = await axiosInstance.post(url, formData);

      if(url === "/checkmusic") {
        response.data.follows = formatNumbers(parseInt(response.data.follows), "follows")
      } else {
        response.data.tracks.forEach(track => {
          track.duration = formatNumbers(parseInt(track.duration, "duration"))
        })
      }

      return response.data;

    } catch (error) {
      throw error
    }
  }

  return { get, post };
};