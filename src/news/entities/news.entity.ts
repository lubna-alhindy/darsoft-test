import { Column, Entity, ObjectId, ObjectIdColumn } from 'typeorm';

@Entity()
export class News {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column({
    nullable: false,
  })
  title: string;

  @Column({
    nullable: false,
  })
  description: string;
}
