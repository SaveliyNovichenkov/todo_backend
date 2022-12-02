import { BaseEntity } from '../utils/base';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { TodoEntity } from 'src/todo/todo.entity';

@Entity('Subtask')
export class SubtaskEntity extends BaseEntity {
  @Column({ type: 'text' })
  name: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ default: 'queue' })
  status: 'queue' | 'development' | 'done';

  @ManyToOne(() => TodoEntity, (todo) => todo.subtasks)
  @JoinColumn({ name: 'todo_id' })
  todo: TodoEntity;
}
