// "use client";
// import { useEffect } from "react";
// import { setCookie } from "cookies-next";
// import ChatRoom from "./chatroom/page";
// // import ChatRoom from "@/components/chatroom/ChatRoom";

// const ChatRoomPage = () => {
//   useEffect(() => {
//     setCookie("userRole", "lawyer", { maxAge: 60 * 60 * 24 * 7 });
//     setCookie("userName", "Gatweri", { maxAge: 60 * 60 * 24 * 7 }); // Set username cookie
//   }, []);

//   return <ChatRoom />;
// };

// export default ChatRoomPage;
import Head from "next/head";
import SecureLandTransactions from "./teasers/teaserone/page";



export default function Home() {
  return (
    <div>
      <Head>
        <link rel="icon" href="/images/shawazilogo.png" />
      </Head>
      <main>
        
        
        <SecureLandTransactions />
        
        <></>

        
      </main>
 
    </div>
  );
}


