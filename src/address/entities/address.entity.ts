import { Column, Entity, ObjectId, ObjectIdColumn } from 'typeorm';

@Entity()
export class Address {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column({
    nullable: false,
  })
  name: string;

  @Column({
    nullable: false,
  })
  city: string;

  @Column({
    nullable: false,
  })
  street: string;

  @Column({
    nullable: true,
  })
  locationDetails: string;

  @Column({
    nullable: false
  })
  userId: string;
}
