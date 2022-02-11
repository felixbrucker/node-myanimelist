export * as Types from "./types";
export { anime, animeSearch, Anime } from "./anime";

import axios from "axios";

export function queryJoin(params: { [key: string]: any }): string {
  const url_params = Object.entries(params)
    .filter(([_, value]) => value != null && value != undefined)
    .map(([key, value]) => `${key}=${value}`);

  if (url_params.length != 0) {
    return "?" + url_params.join("&");
  } else {
    return "";
  }
}

export async function jikanGet<D>(url: string): Promise<D> {
  const res = await axios.get(url);
  const data: D = res.data;
  return data;
}

export const jikanUrl = `https://api.jikan.moe/v4`;