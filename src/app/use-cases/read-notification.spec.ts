import { Content } from "@app/entities/content";
import { Notification } from "@app/entities/notification";
import { InMemoryNotificationsRepository } from "@test/repositories/in-memory-notifications-service";
import { NotificationNotFound } from "./errors/notification-not-found";
import { ReadNotification } from "./read-notification";

describe("Read Notification", () => {
  it("should be able to read a notification", async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const readNotification = new ReadNotification(notificationsRepository);

    const notification = new Notification({
      content: new Content("this is the content"),
      category: "social",
      recipientId: "example-recipient-id",
    });

    await notificationsRepository.create(notification);

    await readNotification.execute({
      notificationId: notification.id,
    });

    expect(notificationsRepository.notifications[0].readAt).toEqual(
      expect.any(Date),
    );
  });

  it("should not be able to read a non existent notification", async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const readNotification = new ReadNotification(notificationsRepository);

    expect(() => {
      return readNotification.execute({
        notificationId: "fake-id",
      });
    }).rejects.toThrow(NotificationNotFound);
  });
});
