"use client";

import { useEffect } from "react";

export function VisitorTracker() {
  useEffect(() => {
    void fetch("/api/visitors", {
      method: "POST",
      credentials: "same-origin",
      keepalive: true,
    }).catch(() => {
      // Statistics must never interrupt the page experience.
    });
  }, []);

  return null;
}
