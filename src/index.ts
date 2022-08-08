import accounts from "./accounts.json";
import { zeroLogin } from "./login";
import { startScheduler } from "./scheduler";

(async () => {
  await startScheduler();
})();
