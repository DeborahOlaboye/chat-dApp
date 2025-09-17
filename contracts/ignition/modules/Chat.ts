// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const ChatModule = buildModule("ChatModule", (m) => {
  const registrationFee = "1000000000000000";
  const chat = m.contract("Chat", ["amb", registrationFee]);

  return { chat };
});

export default ChatModule;
