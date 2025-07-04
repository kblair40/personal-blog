import React from "react";

import type { Session } from "@/lib/types";
import { getSession } from "@/lib/session";
import SubscriptionList from "../components/subscription-list";

type Props = {};

const OneBlogSubscriptions = async (props: Props) => {
  const session = await getSession();

  if (!session) {
    return <div>You are not logged in</div>;
  }

  return (
    <div>
      <SubscriptionList userId={session.id} />
    </div>
  );
};

export default OneBlogSubscriptions;
