export interface unlockGiftResp {
  application: Application;
  response: Response;
}
interface Application {
  name: string;
  version: string;
}
interface Response {
  code: number;
  body: Body;
}
interface Body {
  id: number;
  testimonialId: number;
  giftstatusId: number;
  type: string;
  title: string;
  unlockAt: number;
  activeAt: number;
  content?: ContentEntity[] | null;
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
