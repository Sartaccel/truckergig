import React, { useState, useEffect } from "react";
const Chatbot: React.FC = (props: any) => {


    return (
        <>

            <div className="df-messenger" dangerouslySetInnerHTML={{
                __html: `
      <df-messenger
      intent="WELCOME"
    //   chat-icon="https://www.pngkey.com/maxpic/u2q8e6q8q8w7q8t4/"
      chat-title="TruckerGIGAgent"
      agent-id="001fefc8-8d32-4b20-be7f-80a757deed7c"
      language-code="en"
    ></df-messenger>
` }} />

        </>
    );
}

export default Chatbot;