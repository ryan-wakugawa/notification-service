import { makeNotification } from "@test/factories/notification-factory";
import { InMemoryNotificationsRepository } from "@test/repositories/in-memory-notifications-service";
import { CountRecipientNotifications } from "./count-recipient-notifications";
import { GetRecipientNotifications } from "./get-recipient-notifications";

describe("Count recipient notifications", () => {
  it("should be able to count recipient notifications", async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const getRecipientNotifications = new GetRecipientNotifications(
      notificationsRepository,
    );

    await notificationsRepository.create(
      makeNotification({ recipientId: "recipient-1" }),
    );
    await notificationsRepository.create(
      makeNotification({ recipientId: "recipient-1" }),
    );
    await notificationsRepository.create(
      makeNotification({ recipientId: "recipient-2" }),
    );

    const { notifications } = await getRecipientNotifications.execute({
      recipientId: "recipient-1",
    });

    expect(notifications).toHaveLength(2);
    expect(notifications).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ recipientId: "recipient-1" }),
        expect.objectContaining({ recipientId: "recipient-1" }),
      ]),
    );
  });
});
