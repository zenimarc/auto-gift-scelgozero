import axios from "axios";
import { loginResp } from "./types/loginResp";
const loginApi = "https://io.scelgozero.it/api/auth/login";
export const zeroLogin = async ({
  username,
  password,
}: {
  username: string;
  password: string;
}) => {
  const resp: loginResp = (
    await axios.post(loginApi, {
      username,
      password,
    })
  ).data;
  return resp.response.body.token;
};
