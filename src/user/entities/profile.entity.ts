import { splitEnum } from 'src/util/split-enum';
import { Column } from 'typeorm';
import { gender } from '../enum/gender.enum';
import { Expose } from 'class-transformer';

export class Profile {
  @Expose()
  @Column({
    nullable: false,
  })
  fullName: string;

  @Expose()
  @Column({
    nullable: true,
    type: 'date'
  })
  birthday: Date;

  @Expose()
  @Column({
    nullable: true,
  })
  country: string;

  @Expose()
  @Column({
    nullable: true,
    enum: splitEnum(gender),
    type: 'enum'
  })
  gender: string;

  @Expose()
  @Column({
    nullable: true,
    length: 10
  })
  phoneNumber: string;

  constructor(
    fullName: string,
    birthday: Date,
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
