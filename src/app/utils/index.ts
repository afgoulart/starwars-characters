
export const handleResponse = (json: any, pattern: string, strReplace?: string) => {
  const strJson = JSON.stringify(json);
  return JSON.parse(strJson.replace(new RegExp(pattern, 'g'), strReplace || ''));
}
