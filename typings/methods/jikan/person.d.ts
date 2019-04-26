declare type request = '' | 'pictures';
/**
 * ### A single person object with all its details
 * @param id Id on MyAnimeList.
 * @param request Request types: 'pictures'.
 */
export default function (id: number, request?: request): Promise<{}>;
export {};