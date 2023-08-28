import { Magic } from 'magic-sdk';

let magicInstance;

async function getMagicInstance() {
  if (!magicInstance) {
    magicInstance = new Magic("pk_live_29A4E8BE33FBE1AA", {
        network: {
            rpcUrl: "https://eth-sepolia.g.alchemy.com/v2/-tMMu3AHudsbSzy1OJNFuhoiFCgHLKwE", 
            chainId: 11155111,
        },
    });
  }

  return magicInstance;
}
export {getMagicInstance}
