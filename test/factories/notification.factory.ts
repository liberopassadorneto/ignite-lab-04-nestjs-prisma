import {
  Notification,
  NotificationProps,
} from '@/applications/entities/notification';
import { Content } from '@/applications/entities/content';

type Override = Partial<NotificationProps>;

export function makeNotification(override: Override = {}) {
  return new Notification({
    category: 'social',
    content: new Content('You have a new follower'),
    recipientId: 'recipientId',
    ...override,
  });
}
