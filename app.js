document.addEventListener('DOMContentLoaded', async function() {
    const statusText = document.getElementById('status');

    // Endereço de destino da doação
    const recipientAddress = '0x13e3bF4A43AB94d9d24a52348708ae961700bCFa';
    const donationAmount = '0.01'; // Valor da doação em BNB

    // Função para conectar com MetaMask e fazer a doação
    async function connectAndDonate() {
        if (window.ethereum) {
            try {
                // Solicita acesso à conta MetaMask
                await window.ethereum.request({ method: 'eth_requestAccounts' });

                const web3 = new Web3(window.ethereum);
                const accounts = await web3.eth.getAccounts();
                const senderAddress = accounts[0];

                statusText.textContent = 'Conectado: ' + senderAddress.slice(0, 6) + '...' + senderAddress.slice(-4);

                // Converte a quantidade de BNB para wei
                const amountInWei = web3.utils.toWei(donationAmount, 'ether');

                // Envia a transação
                await web3.eth.sendTransaction({
                    from: senderAddress,
                    to: recipientAddress,
                    value: amountInWei
                });

                statusText.textContent = 'Doação realizada com sucesso!';
            } catch (error) {
                statusText.textContent = 'Erro ao realizar a doação.';
                console.error(error);
            }
        } else {
            statusText.textContent = 'MetaMask não encontrado. Instale a extensão MetaMask.';
        }
    }

    connectAndDonate();
});
