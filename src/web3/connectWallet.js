const connectWallet = async () => {
    try {
      if (window.ethereum) {
        console.log('Ethereum support is available')
        if (window.ethereum.isMetaMask) {
          console.log('MetaMask is active')
        } else {
          console.log('MetaMask is not available')
        }
      } else {
        console.log('Ethereum support is not found')
      }
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      localStorage.setItem("account", accounts[0]);
    } catch (error) {
      console.log("error: ", error);
    }
  };
export {connectWallet};