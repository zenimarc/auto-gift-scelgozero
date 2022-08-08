export interface genGiftResp {
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
  message?: string;
  explain?: string;
}
interface Body {
  id: number;
  testimonialId: number;
  giftstatusId: number;
  type: string;
  title: string;
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
