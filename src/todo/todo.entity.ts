import { BaseEntity } from '../utils/base';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { SubtaskEntity } from '../subtask/subtask.entity';
import { CommentEntity } from '../comment/comment.entity';
import { ProjectEntity } from '../project/project.entity';

@Entity('Todo')
export class TodoEntity extends BaseEntity {
  @Column({ type: 'text' })
  title: string;

  @Column({ type: 'text' })
  name: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ default: 'queue' })
  status: 'queue' | 'development' | 'done';

  @Column({ default: 'medium' })
  priority: 'low' | 'medium' | 'maximum';

  @Column({ name: 'date_completed' })
  dateCompleted: number;

  @Column({ default: '', name: 'file_path' })
  filePath: string;

  @Column({ default: 0 })
  numeric: number;

  @ManyToOne(() => ProjectEntity, (project) => project.todos)
  @JoinColumn({ name: 'project_id' })
  project: ProjectEntity;

  @OneToMany(() => CommentEntity, (comment) => comment.todo)
  comments: CommentEntity[];

  @OneToMany(() => SubtaskEntity, (subtask) => subtask.todo)
  subtasks: SubtaskEntity[];
}

/*
@Entity('Todo')
export class TodoEntity extends BaseEntity {
  @Column()
  title: string;

  @Column()
  name: string;

  @Column({ default: '' })
  description: string;

  @Column({ default: 'queue' })
  status: 'queue' | 'development' | 'done';

  @Column({ default: 'medium' })
  priority: 'low' | 'medium' | 'maximum';

  @Column({ name: 'date_completed' })
  dateCompleted: number;

  @Column({ default: '' })
  files: string;

  @PrimaryGeneratedColumn()
  number: number;

  @ManyToOne(() => ProjectEntity, (project) => project.todos)
  @JoinColumn({ name: 'project_id' })
  project: ProjectEntity;

  @OneToMany(() => SubtaskEntity, (subtask) => subtask.todo)
  @JoinColumn({ name: 'subtask_id' })
  subtasks: SubtaskEntity[];

  @OneToMany(() => CommentEntity, (comment) => comment.todo)
  @JoinColumn({ name: 'comment_id' })
  comments: CommentEntity[];
}
*/
