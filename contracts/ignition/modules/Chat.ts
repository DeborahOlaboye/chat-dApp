// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const ChatModule = buildModule("ChatModule", (m) => {
  const chat = m.contract("Chat", ["amb", "1000"]);

  return { chat };
});

export default ChatModule;
