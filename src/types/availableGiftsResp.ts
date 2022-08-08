export interface AvailableGiftsResp {
  application: Application;
  response: Response;
}
interface Application {
  name: string;
  version: string;
}
interface Response {
  code: number;
  body: AvailableGiftsBodyEntity[];
}
export interface AvailableGiftsBodyEntity {
  id: number;
  testimonialId: number;
  giftstatusId: giftStatus;
  type: string;
  title: string;
  content?: ContentEntity[] | null;
  unlockAt?: number | null;
  activeAt?: number | null;
}
interface ContentEntity {
  id: number;
  giftId: number;
  campaignId: number;
  xpPoints?: null;
  dpPoints?: null;
  pgDetail?: null;
  explanation?: null[] | null;
}
export enum giftStatus {
  inactive = 1,
  locked = 2,
  active = 3,
  open = 4,
}
