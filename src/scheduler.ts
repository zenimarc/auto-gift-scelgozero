import { AccountManager } from "./AccountManager";
import accounts from "./accounts.json";
import { GiftsManager } from "./GiftsManager";

import { zeroLogin } from "./login";

export const startScheduler = async () => {
  for (const account of accounts) {
    const { username, password } = account;
    await AccountManager({ username, password }).start();
  }
};
