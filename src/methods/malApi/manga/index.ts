import { MalAcount } from "..";
import { MalRequest } from "../request";
import { apiUrl } from "../api";

import { MangaFields, MangaDetailsFields } from "./fields";
import { MangaItem, UpdateMangaParams, MangaListStatusBase } from "./types";
import { WorkBase, Paging, RankingItem } from "../common";
import { queryEncode } from "../util";
import { AxiosRequestConfig } from "axios";

export * from "./fields";
export * from "./types";

export class MalManga {
  private acount: MalAcount;

  constructor(acount: MalAcount) {
    this.acount = acount;
  }

  search<T>(
    q: string,
    fields?: MangaFields<T>,
    /**
     * The maximum value is 100.
     */
    limit: number = 100,
    offset: number = 0
  ): MalRequest<Paging<MangaItem<WorkBase & T>>> {
    const config: AxiosRequestConfig = {
      url: [apiUrl, "manga"].join("/"),
      headers: {
        Authorization: `Bearer ${this.acount.malToken["access_token"]}`,
      },
      params: {
        q,
      },
    };

    if (fields) config.params.fields = fields.toString();
    if (limit != 100) config.params.limit = limit;
    if (offset != 0) config.params.offset = offset;

    return new MalRequest<any>(config);
  }

  details<T>(id: number, fields?: MangaDetailsFields<WorkBase & T>) {
    const config: AxiosRequestConfig = {
      url: [apiUrl, "manga", id.toString()].join("/"),
      headers: {
        Authorization: `Bearer ${this.acount.malToken["access_token"]}`,
      },
      params: {},
    };

    if (fields) config.params.fields = fields.toString();

    return new MalRequest<any>(config);
  }

  /**
   * | value | |
   * | ---- | ---- |
   * | all | Top Anime Series |
   * | airing | Top Airing Anime |
   * | upcoming | Top Upcoming Anime |
   * | tv | Top Anime TV Series |
   * | ova | Top Anime OVA Series |
   * | movie | Top Anime Movies |
   * | special | Top Anime Specials |
   * | bypopularity | Top Anime by Popularity |
   * | favorite | Top Favorited Anime |
   */
  ranking<T>(
    rankingType:
      | "all"
      | "airing"
      | "upcoming"
      | "tv"
      | "ova"
      | "movie"
      | "special"
      | "bypopularity"
      | "favorite",
    fields?: MangaFields<T>,
    limit: number = 100,
    offset: number = 0
  ): MalRequest<Paging<RankingItem & MangaItem<WorkBase & T>>> {
    const config: AxiosRequestConfig = {
      url: [apiUrl, "manga", "ranking"].join("/"),
      headers: {
        Authorization: `Bearer ${this.acount.malToken["access_token"]}`,
      },
      params: {
        ranking_type: rankingType,
      },
    };

    if (fields) config.params.fields = fields.toString();
    if (limit != 100) config.params.limit = limit;
    if (offset != 0) config.params.offset = offset;

    return new MalRequest<any>(config);
  }

  updateMyManga(
    id: number,
    params?: UpdateMangaParams
  ): MalRequest<MangaListStatusBase> {
    const config: AxiosRequestConfig = {
      method: "PATCH",
      url: [apiUrl, "manga", id.toString(), "my_list_status"].join("/"),
      headers: {
        Authorization: `Bearer ${this.acount.malToken["access_token"]}`,
        "content-type": "application/x-www-form-urlencoded",
      },
      params: {},
      data: queryEncode(params),
    };

    return new MalRequest<any>(config);
  }

  deleteMyManga(id: number): MalRequest<any[]> {
    const config: AxiosRequestConfig = {
      method: "DELETE",
      url: [apiUrl, "manga", id.toString(), "my_list_status"].join("/"),
      headers: {
        Authorization: `Bearer ${this.acount.malToken["access_token"]}`,
      },
    };

    return new MalRequest<any[]>(config);
  }
}
