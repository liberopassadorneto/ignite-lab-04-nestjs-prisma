import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateNotificationDto } from '../dtos/create-notification.dto';
import { SendNotification } from '@/applications/use-cases/send-notification';
import { NotificationViewModel } from '../view-models/notification.view-model';
import { CancelNotification } from '@/applications/use-cases/cancel-notification';
import { UnreadNotification } from '@/applications/use-cases/unread-notification';
import { ReadNotification } from '@/applications/use-cases/read-notification';
import { CountRecipientNotifications } from '@/applications/use-cases/count-recipient-notifications';
import { GetRecipientNotifications } from '@/applications/use-cases/get-recipient-notifications';

@Controller('notifications')
export class NotificationsController {
  constructor(
    private readonly sendNotification: SendNotification,
    private readonly cancelNotification: CancelNotification,
    private readonly readNotification: ReadNotification,
    private readonly unreadNotification: UnreadNotification,
    private readonly countRecipientNotifications: CountRecipientNotifications,
    private readonly getRecipientNotifications: GetRecipientNotifications,
  ) {}

  @Patch(':id/cancel')
  async cancel(@Param('id') id: string) {
    await this.cancelNotification.execute({
      notificationId: id,
    });
  }

  @Patch(':id/read')
  async read(@Param('id') id: string) {
    await this.readNotification.execute({
      notificationId: id,
    });
  }

  @Patch(':id/unread')
  async unread(@Param('id') id: string) {
    await this.unreadNotification.execute({
      notificationId: id,
    });
  }

  @Get('count/from/:recipientId')
  async countFromRecipient(
    @Param('recipientId') recipientId: string,
  ): Promise<{ count: number }> {
    const { count } = await this.countRecipientNotifications.execute({
      recipientId,
    });

    return {
      count,
    };
  }

  @Get('from/:recipientId')
  async getFromRecipient(@Param('recipientId') recipientId: string) {
    const { notifications } = await this.getRecipientNotifications.execute({
      recipientId,
    });

    return {
      notifications: notifications.map(NotificationViewModel.toHttp),
    };
  }

  @Post()
  async create(@Body() createNotificationDto: CreateNotificationDto) {
    const { recipientId, content, category } = createNotificationDto;

    const { notification } = await this.sendNotification.execute({
      recipientId,
      category,
      content,
    });

    return {
      notification: NotificationViewModel.toHttp(notification),
    };
  }
}
