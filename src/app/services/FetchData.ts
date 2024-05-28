import { API_BASE_URL_CLIENT } from "@/config";
import { ResultAPIType } from "@/types";

export class FetchData {
  ac: AbortController;
  constructor(newAC: AbortController) {
    this.ac = newAC;

  }

  async getData(filter: string = 'planets', page: number = 1, customAC: AbortController | null = null) {
    const data: ResultAPIType = await fetch(
      `${API_BASE_URL_CLIENT}/${filter}${page ? `?page=${page}` : ''
      }`,
      {
        cache: 'no-store',
        signal: customAC?.signal || this.ac.signal
      }
    ).then(res => res.json())
      .catch(e => console.log(e));

    return data;
  }

} 