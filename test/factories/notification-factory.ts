import { Content } from "@app/entities/content";
import { Notification, NotificationProps } from "@app/entities/notification";

type Override = Partial<NotificationProps>;

export function makeNotification(override: Override = {}): Notification {
  return new Notification({
    content: new Content("this is the content"),
    category: "social",
    recipientId: "recipient-2",
    ...override,
  });
}
