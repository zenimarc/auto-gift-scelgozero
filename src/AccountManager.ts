import { GiftsManager } from "./GiftsManager";
import { zeroLogin } from "./login";
import schedule from "node-schedule";

export const AccountManager = ({
  username,
  password,
}: {
  username: string;
  password: string;
}) => {
  let retrial = 0;

  const doAccountGiftHandling = async () => {
    const authToken = await zeroLogin({ username, password });
    const giftManager = GiftsManager(authToken.id);
    const nextDate = await giftManager.workingRoutine();
    return nextDate;
  };
  const start = async () => {
    try {
      console.log("INIZIO HANDLING DI", username);
      const nextDate = await doAccountGiftHandling();
      console.log("COMPLETATI GIFT DI", username);
      console.log(`RESCHEDULE DI ${username} PER ${nextDate.toLocaleString()}`);
      retrial = 0; // in case of success reset the retrial counter
      //schedule start function at nextDate
      schedule.scheduleJob(nextDate, start);
    } catch (e) {
      //console.log(e);
      retrial && console.log("è già fallito", retrial, "volte");
      retrial += 1;
      if (retrial > 10) {
        console.error("troppi retrial", username, "non verrà più effettuato");
      }

      //schedule start function in the next 10 minutes
      const nextRetrialDate = new Date(new Date().getTime() + 1000 * 60 * 10); //10 minutes after now date
      console.log(
        `Errore di gift handling su ${username} \n RESCHEDULE DI PER LE ${nextRetrialDate.toLocaleString()}`
      );
      schedule.scheduleJob(nextRetrialDate, start);
    }
  };
  return { start };
};
