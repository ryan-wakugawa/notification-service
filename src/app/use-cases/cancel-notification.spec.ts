import { Content } from "@app/entities/content";
import { Notification } from "@app/entities/notification";
import { InMemoryNotificationsRepository } from "@test/repositories/in-memory-notifications-service";
import { CancelNotification } from "./cancel-notificaton";
import { NotificationNotFound } from "./errors/notification-not-found";

describe("Cancel Notification", () => {
  it("should be able to cancel a notification", async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const cancelNotification = new CancelNotification(notificationsRepository);

    const notification = new Notification({
      content: new Content("this is the content"),
      category: "social",
      recipientId: "example-recipient-id",
    });

    await notificationsRepository.create(notification);

    await cancelNotification.execute({
      notificationId: notification.id,
    });

    expect(notificationsRepository.notifications[0].canceledAt).toEqual(
      expect.any(Date),
    );
  });

  it("should not be able to cancel a non existent notification", async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const cancelNotification = new CancelNotification(notificationsRepository);

    expect(() => {
      return cancelNotification.execute({
        notificationId: "fake-id",
      });
    }).rejects.toThrow(NotificationNotFound);
  });
});
