import {
  Entity,
  Column,
  BaseEntity,
  ManyToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./User";

@Entity("refreshtoken")
export class RefreshToken extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("text")
  token: string;

  @Column()
  userId: string;
  @ManyToOne(() => User, (user) => user.refreshTokens)
  @JoinColumn({ name: "userId" })
  user: User;

  @Column({ type: "timestamp" })
  expiration: Date;

  @Column()
  ipAddress: string;
}
