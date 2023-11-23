import { splitEnum } from 'src/util/split-enum';
import { Column } from 'typeorm';
import { gender } from '../enum/gender.enum';

export class Profile {
  @Column({
    nullable: false,
  })
  fullName: string;

  @Column({
    nullable: true,
  })
  birthday: string;

  @Column({
    nullable: true,
  })
  country: string;

  @Column({
    nullable: true,
    enum: splitEnum(gender),
    type: 'enum'
  })
  gender: string;

  @Column({
    nullable: true,
  })
  phoneNumber: string;

  constructor(
    fullName: string,
    birthday: string,
    country: string,
    gender: string,
    phoneNumber: string,
  ) {
    this.fullName = fullName;
    this.birthday = birthday;
    this.country = country;
    this.gender = gender;
    this.phoneNumber = phoneNumber;
  }
}
