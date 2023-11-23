import { ObjectId } from 'typeorm';

export class PayloadModel {
  _id: ObjectId;
  email: string;
  isAdmin: boolean;
}
