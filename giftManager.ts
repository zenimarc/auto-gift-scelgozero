import axios from "axios";
import {
  AvailableGiftsResp,
  AvailableGiftsBodyEntity,
  giftStatus,
} from "./types/types";

const giftManager = (authToken: string) => {
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
    for (const gift of availableGifts) {
      const { giftstatusId } = gift;
      if (giftstatusId === giftStatus.inactive) {
        await _unlockGift(gift);
      } else if (giftstatusId === giftStatus.active) {
        await _openGift(gift);
      }
    }
  };

  const _openGift = async (gift: AvailableGiftsBodyEntity) => {
    //needed when a gift is ready and you open it to get the points
    const data: patchData = { giftstatusId: giftStatus.open };
    await axios.patch(patchApiEndpoint + gift.id, data, { headers: headers });
  };

  const _unlockGift = async (gift: AvailableGiftsBodyEntity) => {
    //needed when a the gift is gray and you want to get a new gift with a new timer
    const data: patchData = { giftstatusId: giftStatus.locked };
    const resp = await axios.patch(patchApiEndpoint + gift.id, data, {
      headers: headers,
    });
  };
};
