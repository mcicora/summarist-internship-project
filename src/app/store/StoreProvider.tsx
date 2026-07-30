"use client";

import { Provider } from "react-redux";
import { useState } from "react";
import { makeStore } from "./store";

type StoreProviderProps = {
  children: React.ReactNode;
};

export default function StoreProvider({ children }: StoreProviderProps) {
  const [store] = useState(makeStore);

  return <Provider store={store}>{children}</Provider>;
}
