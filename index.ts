import accounts from "./accounts.json";
import { zeroLogin } from "./login";

const username = accounts[0].username;
const password = accounts[0].password;

(async () => {
  const loginResp = await zeroLogin({ username, password });
  console.log(loginResp);
})();
