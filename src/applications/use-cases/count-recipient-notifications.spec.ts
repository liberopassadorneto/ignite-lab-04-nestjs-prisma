import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications.repository';
import { CountRecipientNotifications } from '@/applications/use-cases/count-recipient-notifications';
import { makeNotification } from '@test/factories/notification.factory';

describe('Count Recipient Notifications', () => {
  it('should be able to count recipient notifications', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const countRecipientNotifications = new CountRecipientNotifications(
      notificationsRepository,
    );

    await notificationsRepository.create(
      makeNotification({
        recipientId: 'recipient-01',
      }),
    );

    await notificationsRepository.create(
      makeNotification({
        recipientId: 'recipient-01',
      }),
    );

    await notificationsRepository.create(
      makeNotification({
        recipientId: 'recipient-02',
      }),
    );

    const { count } = await countRecipientNotifications.execute({
      recipientId: 'recipient-01',
    });

    const { count: countTwo } = await countRecipientNotifications.execute({
      recipientId: 'recipient-02',
    });

    expect(count).toBe(2);
    expect(countTwo).toBe(1);
  });
});
