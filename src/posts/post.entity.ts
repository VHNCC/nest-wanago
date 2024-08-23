import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export default class PostEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public content: string;

  @Column()
  public title: string;
}
