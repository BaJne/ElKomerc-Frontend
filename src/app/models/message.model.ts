export enum messagetype {
  err, warn, succes, info
}

export interface Message {
  key: string;
  text: string;
  type: messagetype;
}
