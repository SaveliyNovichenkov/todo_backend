import { BaseEntity } from '../utils/base';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { TodoEntity } from '../todo/todo.entity';
import { UserEntity } from 'src/user/user.entity';

@Entity('Project')
export class ProjectEntity extends BaseEntity {
  @Column()
  name: string;

  @Column()
  description: string;

  @ManyToOne(() => UserEntity, (user) => user.projects)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @OneToMany(() => TodoEntity, (todo) => todo.project)
  todos: TodoEntity[];
}
