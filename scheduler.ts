import { AccountManager } from "./AccountManager";
import accounts from "./accounts.json";
import { GiftsManager } from "./GiftsManager";

import { zeroLogin } from "./login";

(async () => {
  for (const account of accounts) {
    const { username, password } = account;
    try {
      const nextDate = await AccountManager({ username, password }).doJob();
    } catch (e) {
      console.log(e);
    }
  }
})();
