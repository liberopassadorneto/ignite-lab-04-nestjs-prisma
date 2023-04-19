import { Notification } from '@/applications/entities/notification';
import { Notification as PrismaNotification } from '@prisma/client';
import { Content } from '@/applications/entities/content';

export class PrismaNotificationMapper {
  static toPrisma(notification: Notification) {
    return {
      id: notification.id,
      recipientId: notification.recipientId,
      content: notification.content.value,
      category: notification.category,
      readAt: notification.readAt,
      canceledAt: notification.canceledAt,
      createdAt: notification.createdAt,
    };
  }

  static toDomain(prismaNotification: PrismaNotification): Notification {
    return new Notification(
      {
        category: prismaNotification.category,
        content: new Content(prismaNotification.content),
        recipientId: prismaNotification.recipientId,
        readAt: prismaNotification.readAt,
        canceledAt: prismaNotification.canceledAt,
        createdAt: prismaNotification.createdAt,
      },
      // id que vem do banco de dados
      prismaNotification.id,
    );
  }
}
