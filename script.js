document.addEventListener("DOMContentLoaded", async () => {
    const walletBtn = document.getElementById("walletBtn");
    const twitterBtn = document.getElementById("twitterBtn");
    const iframe = document.getElementById("customIframe");

    console.log("Wallet Button:", walletBtn);
    console.log("Twitter Button:", twitterBtn);
    console.log("Iframe:", iframe);

    if (walletBtn) {
        walletBtn.addEventListener("click", async () => {
            if (walletBtn.textContent === "Disconnect Wallet") {
                try {
                    console.log("Disconnect Button Clicked");
                    await window.arweaveWallet.disconnect();
                    console.log("Disconnected from ArConnect Wallet");
                    alert("Cüzdan baðlantýsý kesildi!");
                    updateWalletButton(false);
                } catch (error) {
                    console.error("Failed to disconnect from ArConnect Wallet", error);
                    alert("Cüzdan baðlantýsý kesme iþlemi baþarýsýz oldu.");
                }
            } else {
                try {
                    console.log("Connect Button Clicked");
                    await window.arweaveWallet.connect(['ACCESS_ADDRESS', 'SIGN_TRANSACTION']);
                    console.log("Connected to ArConnect Wallet");
                    alert("Cüzdan baþarýyla baðlandý!");
                    updateWalletButton(true);
                } catch (error) {
                    console.error("Failed to connect to ArConnect Wallet", error);
                    alert("Cüzdan baðlama iþlemi baþarýsýz oldu.");
                }
            }
        });
    }

    if (twitterBtn) {
        twitterBtn.addEventListener("click", () => {
            console.log("Twitter Button Clicked");
            // Open link in a new window
            window.open("https://x.com/aothecomputer", "_blank");
        });
    }

    function updateWalletButton(isConnected) {
        if (isConnected) {
            walletBtn.textContent = "Disconnect Wallet";
            iframe.style.display = "block";
            iframe.src = "https://sh_ao.g8way.io/";
        } else {
            walletBtn.textContent = "Connect Wallet";
            iframe.style.display = "none";
            iframe.src = "";
        }
    }

    // Baþlangýç durumu: Cüzdan baðlantýsý yok
    updateWalletButton(false);

    iframe.onload = () => {
        const iframeDocument = iframe.contentDocument || iframe.contentWindow.document;
        const arconnectBtn = iframeDocument.getElementById("arconnectBtn");

        if (arconnectBtn) {
            arconnectBtn.remove();
        }
    };
});
