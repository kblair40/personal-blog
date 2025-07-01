import React from "react";

import type { Session } from "@/lib/types";
import { getSession } from "@/lib/session";

type Props = {};

const OneBlogSubscriptions = async (props: Props) => {
  const session = await getSession();

  if (!session) {
    return <div>You are not logged in</div>;
  }

  return <div>OneBlogSubscriptions</div>;
};

export default OneBlogSubscriptions;
