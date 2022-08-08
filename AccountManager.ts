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
  const doJob = async () => {
    const authToken = await zeroLogin({ username, password });
    const giftManager = GiftsManager(authToken.id);
    const nextDate = await giftManager.workingRoutine();
    return nextDate;
  };
  const start = async () => {
    try {
      const nextDate = await doJob();
      //schedule start function at nextDate
      schedule.scheduleJob(nextDate, start);
    } catch (e) {
      console.log(e);
      //schedule start function in the next 10 minutes
      schedule.scheduleJob(
        new Date(new Date().getTime() + 1000 * 60 * 10), //10 minutes after now date
        start
      );
    }
  };
  return { start };
};
