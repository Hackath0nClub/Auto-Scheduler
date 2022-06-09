import React, { ReactNode } from "react";
import { createClient, Provider } from "urql";

// const client = createClient({
//   url: "http://localhost:4000/",
// });

const client = createClient({
  url: "https://graphql.fauna.com/graphql",
  fetchOptions: () => {
    return {
      headers: { authorization: process.env.NEXT_PUBLIC_FAUNA_AUTH },
    };
  },
});

export const UrqlProvider = ({ children }: { children: ReactNode }) => {
  return <Provider value={client}>{children}</Provider>;
};
