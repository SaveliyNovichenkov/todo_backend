import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getTypeOrmConfig } from './config/typeorm.config';
import { ProjectModule } from './project/project.module';
import { TodoModule } from './todo/todo.module';
import { CommentModule } from './comment/comment.module';
import { SubtaskModule } from './subtask/subtask.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { MediaModule } from './media/media.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { MulterModule } from '@nestjs/platform-express/multer';
import { join } from 'path';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads', 'pdf'),
    }),
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getTypeOrmConfig,
    }),
    MulterModule.register({
      dest: './undefined/uploads/pdf',
    }),
    MediaModule,
    UserModule,
    ProjectModule,
    TodoModule,
    CommentModule,
    SubtaskModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
