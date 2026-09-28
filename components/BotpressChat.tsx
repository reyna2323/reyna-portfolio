"use client";

import Script from "next/script";
import { useState } from "react";

/* The Botpress chat assistant. Both scripts wait until the page has finished
   loading (lazyOnload) so the chat never slows down the first paint, and the
   bot's own config script only runs once Botpress's webchat is ready. */
export function BotpressChat() {
  const [webchatReady, setWebchatReady] = useState(false);
  return (
    <>
      <Script src="https://cdn.botpress.cloud/webchat/v3.7/inject.js" strategy="lazyOnload" onLoad={() => setWebchatReady(true)} />
      {webchatReady && (
        <Script src="https://files.bpcontent.cloud/2026/09/28/09/20260928091922-Q1QSYY15.js" strategy="afterInteractive" />
      )}
    </>
  );
}
