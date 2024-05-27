import { API_BASE_URL } from "../../config";

export const handleResponse = (json: any, pattern: string, strReplace?: string) => {
  const strJson = JSON.stringify(json);
  return JSON.parse(strJson.replace(new RegExp(pattern, 'g'), strReplace || ''));
}


const prefix = 'swPrefix';

export async function request(url: string) {
  const cache = window.localStorage;
  const cached = cache.getItem(`${prefix}.${url}`);
  if (cached) {
    return JSON.parse(cached);
  }

  const headers = {
    "headers": {
      "accept": "application/json"
    }
  };
  const result = await fetch(url, headers).then(res => handleResponse(res.json(), API_BASE_URL.replace('/', '\\/'), '\\/'));

  cache.setItem(`${prefix}.${url}`, JSON.stringify(result));

  return result;
}


export const getPicture = (id: string, width: number, height: number) => {
  return `https://picsum.photos/${width}/${height}?random=${id}`;
};