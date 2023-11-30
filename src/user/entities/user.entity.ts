import { Column, Entity, ObjectIdColumn, ObjectId } from 'typeorm';
import { Profile } from './profile.entity';
import * as bcrypt from 'bcrypt';
import { Expose } from 'class-transformer';

@Entity()
export class User {
  @Expose()
  @ObjectIdColumn()
  _id: ObjectId;

  @Expose()
  @Column({
    unique: true,
    nullable: false,
    type: 'varchar',
  })
  email: string;

  @Column({
    nullable: false,
		type: 'varchar',
		length: '255'
  })
  password: string;

  @Expose()
  @Column(() => Profile)
  profile: Profile;

  @Expose()
  @Column({
    default: false,
  })
  isAdmin: boolean;

  @Expose()
  @Column({
    type: 'date'
  })
  createdAt: Date;

  async validatePassword(password: string) {
    return await bcrypt.compare(password, this.password);
  }
}
