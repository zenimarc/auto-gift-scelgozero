import { AccountManager } from "./AccountManager";
import accounts from "./accounts.json";
import { GiftsManager } from "./GiftsManager";

import { zeroLogin } from "./login";

(async () => {
  for (const account of accounts) {
    const { username, password } = account;
    AccountManager({ username, password }).start();
  }
})();
