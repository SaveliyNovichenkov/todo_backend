import { BaseEntity } from '../utils/base';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { TodoEntity } from '../todo/todo.entity';
import { UserEntity } from '../user/user.entity';

@Entity('Comment')
export class CommentEntity extends BaseEntity {
  @Column({ default: '' })
  message: string;

  @ManyToOne(() => CommentEntity, (comment) => comment.children)
  @JoinColumn({ name: 'parent_id' })
  parent?: CommentEntity;

  @OneToMany(() => CommentEntity, (comment) => comment.parent)
  children?: CommentEntity[];

  @ManyToOne(() => TodoEntity, (todo) => todo.comments)
  @JoinColumn({ name: 'todo_id' })
  todo: TodoEntity;

  @ManyToOne(() => UserEntity, (user) => user.comments)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;
}
