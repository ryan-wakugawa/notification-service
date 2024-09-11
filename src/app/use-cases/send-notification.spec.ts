import { InMemoryNotificationsRepository } from "@test/repositories/in-memory-notifications-service";
import { SendNotification } from "./send-notification";

describe("Send Notification", () => {
  it("should be able to send a notification", async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const sendNotification = new SendNotification(notificationsRepository);

    const { notification } = await sendNotification.execute({
      content: "This is a recipient",
      category: "social",
      recipientId: "example-recipient-id",
    });

    expect(notificationsRepository.notifications).toHaveLength(1);
  });
});
