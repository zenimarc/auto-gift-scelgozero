import axios, { AxiosError } from "axios";
import schedule from "node-schedule";

import {
  AvailableGiftsResp,
  AvailableGiftsBodyEntity,
  giftStatus,
} from "./types/availableGiftsResp";
import { genGiftResp } from "./types/generateGiftResp";

export const GiftsManager = (authToken: string) => {
  const headers = {
    Cookie: "fileToken=" + authToken,
    authToken: authToken,
  };
  type patchData = {
    giftstatusId: giftStatus;
  };
  const patchApiEndpoint = "https://io.scelgozero.it/api/rest/v1/own/gift/";

  const getAvailableGifts = async () => {
    const resp = await axios.get(
      "https://io.scelgozero.it/api/rest/v1/own/gift?filter=available",
      { headers: headers }
    );
    const data = resp.data as AvailableGiftsResp;
    if (data.response.code !== 200) {
      throw new Error("Impossible to get available gifts");
    }
    const availableGifts = data.response.body;
    console.log("Available gifts:", availableGifts);
    return availableGifts;
  };

  // it returns true only if there are no more things to do
  // because there still be only a gift locked, need to wait countdown
  const handleAvailableGifts = async (
    availableGifts: AvailableGiftsBodyEntity[]
  ) => {
    if (availableGifts.length === 0) {
      //there's no available gift, requesting one
      await _createNewGift();
      return false;
    }
    for (const gift of availableGifts) {
      const { giftstatusId } = gift;
      if (giftstatusId === giftStatus.inactive) {
        await _unlockGift(gift);
        return false;
      } else if (giftstatusId === giftStatus.active) {
        await _openGift(gift);
        return false;
      } else if (giftstatusId === giftStatus.locked) {
        if (isActivable(gift)) {
          await _activateGift(gift);
          return false;
        } else {
          if (availableGifts.length > 1) {
            // there's still other gifts to process
            return false;
          }
          // the only gift remaining is locked
          // trying to generate a new one
          try {
            const resp = await _createNewGift();
            return false; // in case I can create a new gift return false to tell we're not done
          } catch (e) {
            // not able to generate a new gift, thus only one locked remaining -> finished
            if (!gift.activeAt) {
              throw new Error(
                "impossible to find activeAt time of the locked gift"
              );
            }
            return gift.activeAt;
          }
        }
        await _activateGift(gift);
        return false;
      }
    }
    // if I arrive here there's something wrong
    // because all the cases are covered
    throw new Error("Generic error in handling gifts");
  };

  const isActivable = (gift: AvailableGiftsBodyEntity) => {
    if (!gift.activeAt) {
      return false;
    }
    const currentDate = new Date();
    const activeAtDate = new Date(gift.activeAt);
    return currentDate > activeAtDate;
  };

  const _openGift = async (gift: AvailableGiftsBodyEntity) => {
    //needed when a gift is ready and you open it to get the points
    const data: patchData = { giftstatusId: giftStatus.open };
    const resp = await axios.patch(patchApiEndpoint + gift.id, data, {
      headers: headers,
    });
    console.log("aperto gift", gift.id);
  };

  const _unlockGift = async (gift: AvailableGiftsBodyEntity) => {
    //needed when a the gift is gray and you want to get a new gift with a new timer
    const data: patchData = { giftstatusId: giftStatus.locked };
    const resp = await axios.patch(patchApiEndpoint + gift.id, data, {
      headers: headers,
    });
    console.log("sbloccato new gift", gift.id);
  };

  const _activateGift = async (gift: AvailableGiftsBodyEntity) => {
    //used when a gift has finished its coutdown
    const data: patchData = { giftstatusId: giftStatus.active };
    const resp = await axios.patch(patchApiEndpoint + gift.id, data, {
      headers: headers,
    });
    console.log("gift attivato", gift.id);
    return resp;
  };

  const _createNewGift = async () => {
    //after having redeemed a gift, you need to create a new one which will still need to be activated
    const url = "https://io.scelgozero.it/api/rest/v1/own/gift";
    const resp: genGiftResp = await axios.post(url, "", { headers: headers });
    return resp;
  };

  // do the routing to open gifts and return the date when this function need to be called again
  const workingRoutine = async () => {
    const offsetAfterCountdownExpire = 1000 * 60 * 1; // in milliseconds (1 minute)
    let gifts = await getAvailableGifts();
    let finishedHandling = await handleAvailableGifts(gifts);
    while (finishedHandling === false) {
      gifts = await getAvailableGifts();
      finishedHandling = await handleAvailableGifts(gifts);
    }
    const nextRoutineDate = new Date(
      finishedHandling + offsetAfterCountdownExpire
    );
    return nextRoutineDate;
  };

  return { workingRoutine };
};
