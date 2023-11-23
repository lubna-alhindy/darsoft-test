import { Column, Entity, ObjectIdColumn, ObjectId } from 'typeorm';
import { Profile } from './profile.entity';
import * as bcrypt from 'bcrypt';

@Entity()
export class User {
  @ObjectIdColumn()
  _id: ObjectId;

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

  @Column(() => Profile)
  profile: Profile;

  @Column({
    default: false,
  })
  isAdmin: boolean;

  async validatePassword(password: string) {
    return await bcrypt.compare(password, this.password);
  }
}
