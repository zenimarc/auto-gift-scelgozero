import accounts from "./accounts.json";
import { LoginManager } from "./login";
import { startScheduler } from "./scheduler";

(async () => {
  await startScheduler();
})();
