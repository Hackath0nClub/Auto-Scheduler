import React, { ReactNode } from "react";
import { createClient, Provider } from "urql";

const client = createClient({
  url: "http://localhost:4000/",
});

export const UrqlProvider = ({ children }: { children: ReactNode }) => {
  return <Provider value={client}>{children}</Provider>;
};
