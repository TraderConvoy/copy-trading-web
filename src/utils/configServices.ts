import config from 'constant/config';
import system from 'constant/localstore';

const _responseConfig = async (response: Response) => {
  if (response.status === system.RESPONSE_STATUS.SUCESS) return await response.json();
  throw response;
};
const fakeToken1 =
  'd8e52612c0015c818fc76b007797e342bad3a6959f4241f11642c4249be7dae31d023112e0f605f23b0b950a032408222581f6044a38bf1979160b555b103ac36234c99981bb2eae67ae3f267a6358066210ef1637ad83880d83f6b16e67365363efde7485ac837496f59d08686f777212da67fc85dbc1901d5df34cd6675a52';
const fakeToken2 =
  '2a01a2e8ef5aadb4931759ace6a938690824f783d335fb2187f628156e5b614d7cea5bb6a878ff8e7319435d684838adf9239a2f6ad387790b16fc743a92409afa6e5fcff4b7c11224b0884788dba10036a6ac45226e2868344c894603460d257a06dcd2205f61340c21bbdb0f2980c9f4fd402515ec91835772e569e883c503';
const postService = async (url: string, body: object, isAuthorization = true, isFormData = false) => {
  try {
    const headers: any = isFormData
      ? { 'Content-Type': 'multipart/form-data' }
      : { Accept: 'application/json', 'Content-Type': 'application/json' };
    headers.language = localStorage.getItem(system.LANG) || 'vi';
    // if (isAuthorization) headers.Authorization = 'Bearer ' + localStorage.getItem(system.TOKEN);
    if (isAuthorization) headers.Authorization = 'Bearer ' + fakeToken2;
    const requestInit: any = { method: 'POST', headers };
    if (body)
      if (isFormData) requestInit.body = body;
      else requestInit.body = JSON.stringify(body);
    const response = await fetch(`${config.HOST_API}/${url}`, requestInit);
    return await _responseConfig(response);
  } catch (error) {
    throw error;
  }
};

const getService = async (url: string, params?: { [key: string]: any }, isAuthorization = true) => {
  try {
    const headers: any = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      language: localStorage.getItem(system.LANG) || 'vi',
    };
    if (isAuthorization) headers.Authorization = localStorage.getItem(system.TOKEN);
    const requestInit = { method: 'GET', headers };
    let queryString = '';
    if (params)
      queryString = `?${Object.keys(params)
        .map((key) => `${key}=${params[key] || ''}`)
        .join('&')}`;
    const response = await fetch(`${config.HOST_API}/${url}${queryString}`, requestInit);
    return await _responseConfig(response);
  } catch (error) {
    throw error;
  }
};

export default { postService, getService };
