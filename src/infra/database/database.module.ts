import { NotificationsRepository } from '@/applications/repositories/notifications-repository';
import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { PrismaNotificationsRepository } from './prisma/repositories/prisma-notifications.repository';

@Module({
  providers: [
    PrismaService,
    {
      // contrato: NotificationsRepository
      provide: NotificationsRepository,
      // implementação: PrismaNotificationsRepository
      // podemos trocar a implementação sem quebrar o código e os casos de uso
      useClass: PrismaNotificationsRepository,
    },
  ],
  // quais providers serão compartilhados com os outros módulos que importarem o DatabaseModule
  exports: [NotificationsRepository],
})
export class DatabaseModule {}
