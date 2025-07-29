"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ClientSideSuspense } from "@liveblocks/react";
import { InboxNotification, InboxNotificationList } from "@liveblocks/react-ui";
import { useInboxNotifications } from "@liveblocks/react/suspense";
import { BellIcon } from "lucide-react";

export const Inbox = () => {
  return (
    <ClientSideSuspense fallback={null}>
      <InboxMenu />
    </ClientSideSuspense>
  );
};

const InboxMenu = () => {
  const { inboxNotifications } = useInboxNotifications();

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant={"ghost"} className="relative" size={"icon"}>
            <BellIcon className="size-5"></BellIcon>
            {inboxNotifications.length > 0 && (
              <span className="absolute -right-1 -top-1 flex size-4 items-center justify-center rounded-full bg-sky-500 text-xs text-white">
                {inboxNotifications.length}
              </span>
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-auto">
          {inboxNotifications.length > 0 ? (
            <InboxNotificationList>
              {inboxNotifications.map((inboxNotification) => {
                return (
                  <InboxNotification
                    key={inboxNotification.id}
                    inboxNotification={inboxNotification}
                  ></InboxNotification>
                );
              })}
            </InboxNotificationList>
          ) : (
            <div className="w-[400px] p-2 text-center text-sm text-muted-foreground">
              No notifications
            </div>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
