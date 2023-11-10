import axios from "axios";
import { useState } from "react";

const createAxiosInstance = () => {
  const instance = axios.create({
    baseURL: "https://api.gurodriguesdev.xyz/",
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });

  return instance;
};

export const useAxios = () => {
  const [axiosInstance] = useState(createAxiosInstance);

  // random artist
  const get = async (url) => {
    try {
      const response = await axiosInstance.get(url);

      return response.data.name_artist;

    } catch (error) {
      throw error
    }
  }

  // checkmusic
  const post = async (url, formData) => {
    try {
      const response = await axiosInstance.post(url, formData);

      const data = {
        name: response.data.name_artist,
        follows: parseInt(response.data.follows).toLocaleString("pt-BR"),
        imageArtist: response.data.image_artist,
        lastAlbuns: [
          {
            name: response.data.name_last_album1,
            image: response.data.image_last_album1,
            id: response.data.id_last_album1
          },
          {
            name: response.data.name_last_album2,
            image: response.data.image_last_album2,
            id: response.data.id_last_album2
          },
          {
            name: response.data.name_last_album3,
            image: response.data.image_last_album3,
            id: response.data.id_last_album3
          }
        ],
        topTracks: [
          {
            name: response.data.name_top_track1,
            image: response.data.image_top_track1
          },
          {
            name: response.data.name_top_track2,
            image: response.data.image_top_track2
          },
          {
            name: response.data.name_top_track3,
            image: response.data.image_top_track3
          }
        ]
      };

      return data;

    } catch (error) {
      throw error
    }
  }

  return { get, post };
};