import { Content } from "@app/entities/content";
import { Notification } from "@app/entities/notification";
import { InMemoryNotificationsRepository } from "@test/repositories/in-memory-notifications-service";
import { NotificationNotFound } from "./errors/notification-not-found";
import { UnreadNotification } from "./unread-notification";
import { makeNotification } from "@test/factories/notification-factory";

describe("Cancel Notification", () => {
  it("should be able to unread a notification", async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const unreadNotification = new UnreadNotification(notificationsRepository);

    const notification = makeNotification({ readAt: new Date() });

    await notificationsRepository.create(notification);

    await unreadNotification.execute({
      notificationId: notification.id,
    });

    expect(notificationsRepository.notifications[0].readAt).toBeNull();
  });

  it("should not be able to unread a non existent notification", async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const unreadNotification = new UnreadNotification(notificationsRepository);

    expect(() => {
      return unreadNotification.execute({
        notificationId: "fake-id",
      });
    }).rejects.toThrow(NotificationNotFound);
  });
});
