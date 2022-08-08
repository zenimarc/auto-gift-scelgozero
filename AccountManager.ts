import { GiftsManager } from "./GiftsManager";
import { zeroLogin } from "./login";

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
  return { doJob };
};
