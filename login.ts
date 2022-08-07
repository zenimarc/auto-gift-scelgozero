import axios from "axios";
const loginApi = "https://io.scelgozero.it/api/auth/login";
export const zeroLogin = async ({
  username,
  password,
}: {
  username: string;
  password: string;
}) => {
  const resp = await axios.post(loginApi, {
    username,
    password,
  });
};
