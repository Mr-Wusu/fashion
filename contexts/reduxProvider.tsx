"use client";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "@/state/store";

export default function ReduxProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider store={store}>
      <PersistGate
        loading={
          // When loading, render a simple div or null.
          // Rendering 'null' is often sufficient to prevent hydration.
          // If you need a visible fallback (like a spinner), put it here.
          null
        }
        persistor={persistor}
      >
        {children}
      </PersistGate>
    </Provider>
  );
}
