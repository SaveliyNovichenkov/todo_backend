import { BaseEntity } from '../utils/base';
import { Column, Entity, OneToMany } from 'typeorm';
import { ProjectEntity } from '../project/project.entity';
import { CommentEntity } from '../comment/comment.entity';

@Entity('User')
export class UserEntity extends BaseEntity {
  @Column({ unique: true })
  email: string;

  @Column({ select: false })
  password: string;

  @Column({ default: '' })
  name: string;

  @Column({ default: '', name: 'avatar_path' })
  avatarPath: string;

  @OneToMany(() => ProjectEntity, (project) => project.user)
  projects: ProjectEntity[];

  @OneToMany(() => CommentEntity, (comment) => comment.user)
  comments: CommentEntity[];
}
