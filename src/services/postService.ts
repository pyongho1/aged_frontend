// services
import * as tokenService from "./tokenService";

// types
import { Post } from "../types/models";

const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/api/posts`;

async function getAllPosts(): Promise<Post[]> {
  try {
    const res = await fetch(BASE_URL, {
      headers: { Authorization: `Bearer ${tokenService.getToken()}` },
    });
    return (await res.json()) as Post[];
  } catch (error) {
    throw error;
  }
}

export { getAllPosts };
