"use client"; 

import { useEffect } from "react";
import { setCookie } from "cookies-next";
import ChatRoom from "./chatroom/page";
import SecureLandTransactions from "./teaserone";
import Head from "next/head";

const CombinedPage = () => {
  useEffect(() => {

    setCookie("userRole", "lawyer", { maxAge: 60 * 60 * 24 * 7 });
    setCookie("userName", "Gatweri", { maxAge: 60 * 60 * 24 * 7 });
  }, []);

  return (
    <div>
      <Head>
        <link rel="icon" href="/images/shawazilogo.png" />
      </Head>
      <main>

        <SecureLandTransactions />

        <ChatRoom />
      </main>
    </div>
  );
};

export default CombinedPage;
