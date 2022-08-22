import { useState, createContext, useContext, useEffect } from 'react'

const baseUrl = "https://thentic.tech/api"

export const ThenticContext = createContext();

export const useThenticContext = () => useContext(ThenticContext);

export const ThenticContextProvider = ({ children }) => {
  const [chains, setChains] = useState([])
  const [chain, setChain] = useState(null)
  const [apiKey, setApiKey] = useState('')
  const [nfts, setNfts] = useState([])
  const [contracts, setContracts] = useState([])
  const [invoices, setInvoices] = useState([])
  const [wallets, setWallets] = useState([])
  const [newWallet, setNewWallet] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    ;(async () => {
      const chainsData = await fetch('/chaininfo.json')
      const data = await chainsData.json()
      setChains(data)
      setChain(data.find(dat => dat.id === 97))
    })()
  }, [])

  useEffect(() => {
    setNewWallet(null)
    if (apiKey.length === 32) {
      getWallets()
      getContracts()
      getNfts()
      getInvoices()
      setError(null)
    } else if (apiKey === '') {
      setNfts([])
      setContracts([])
      setInvoices([])
      setWallets([])
      setError(null)
    } else {
      setError('WRONG API KEY')
    }
  }, [apiKey, chain?.id])

  const createNftContract = async (name, short_name) => {
    if (name === '') {
      setError('NFT name must not be empty')
      return
    }
    if (short_name === '') {
      setError('NFT short name must not be empty')
      return
    }
    const newApiKey = apiKey === '' ? await getNewApiKey() : apiKey
    const response = await fetch(`${baseUrl}/nfts/contract`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ key: newApiKey, chain_id: chain.id, name, short_name })
    })
    const data = await response.json()
    if (apiKey === '') setApiKey(newApiKey)
    else setContracts([...contracts, {
      ...data,
      name,
      short_name
    }])
    setError(null)
  }

  const mintNft = async (contract, nft_id, nft_data, to) => {
    if (contract === '') {
      setError('NFT contract address must not be empty')
      return
    }
    if (nft_data === '') {
      setError('Encrypted data must not be empty')
      return
    }
    if (to === '') {
      setError('Owner address must not be empty')
      return
    }
    const newApiKey = apiKey === '' ? await getNewApiKey() : apiKey
    await fetch(`${baseUrl}/nfts/mint`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        key: newApiKey,
        chain_id: chain.id,
        contract, nft_id, nft_data, to
      })
    })
    if (apiKey === '') setApiKey(newApiKey)
    else await getNfts()
    setError(null)
  }

  const transferNft = async (contract, nft_id, from, to) => {
    if (contract === '') {
      setError('NFT contract address must not be empty')
      return
    }
    if (from === '') {
      setError('NFT owner address must not be empty')
      return
    }
    if (to === '') {
      setError('NFT receiver must not be empty')
      return
    }
    const newApiKey = apiKey === '' ? await getNewApiKey() : apiKey
    await fetch(`${baseUrl}/nfts/transfer`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        key: newApiKey,
        chain_id: chain.id,
        contract, nft_id, from, to
      })
    })
    if (apiKey === '') setApiKey(newApiKey)
    else await getNfts()
    setError(null)
  }

  const createInvoice = async (amount, to) => {
    if (amount === 0) {
      setError('Invoice amount must be greater than 0')
      return
    }
    if (to === '') {
      setError('Receiver address must not be empty')
      return
    }
    const newApiKey = apiKey === '' ? await getNewApiKey() : apiKey
    await fetch(`${baseUrl}/invoices/new`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        key: newApiKey,
        chain_id: chain.id,
        amount, to
      })
    })
    if (apiKey === '') setApiKey(newApiKey)
    else await getInvoices()
    setError(null)
  }

  const cancelInvoice = async (request_id) => {
    if (request_id === '') {
      setError('Request Id must not be empty')
      return
    }
    const newApiKey = apiKey === '' ? await getNewApiKey() : apiKey
    await fetch(`${baseUrl}/invoices/cancel`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        key: newApiKey,
        chain_id: parseInt(chain.id),
        request_id
      })
    })
    if (apiKey === '') setApiKey(newApiKey)
    else await getInvoices()
    setError(null)
  }

  const createWallet = async () => {
    const newApiKey = apiKey === '' ? await getNewApiKey() : apiKey
    const response = await fetch(`${baseUrl}/wallets/new`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ key: newApiKey })
    })
    const data = await response.json()
    setNewWallet(data)
    if (apiKey === '') setApiKey(newApiKey)
    else await getWallets()
    setError(null)
  }

  const getWallets = async () => {
    const response = await fetch(`${baseUrl}/wallets/all?key=${apiKey}`)
    const data = await response.json()
    setWallets(data.wallets)
  }

  const getContracts = async () => {
    const response = await fetch(`${baseUrl}/contracts?key=${apiKey}&chain_id=${chain.id}`)
    const data = await response.json()
    setContracts(data.contracts)
  }

  const getNfts = async () => {
    const response = await fetch(`${baseUrl}/nfts?key=${apiKey}&chain_id=${chain.id}`)
    const data = await response.json()
    setNfts(data.nfts)
  }

  const getInvoices = async () => {
    const response = await fetch(`${baseUrl}/invoices/all?key=${apiKey}&chain_id=${chain.id}`)
    const data = await response.json()
    setInvoices(data.invoices)
  }

  const getNewApiKey = async () => {
    const response = await fetch(`${baseUrl}/key`)
    const data = await response.text()
    return data
  }

  return (
    <ThenticContext.Provider value={{
      chains,
      chain,
      setChain,
      apiKey,
      setApiKey,
      contracts,
      createNftContract,
      nfts,
      mintNft,
      transferNft,
      invoices,
      createInvoice,
      cancelInvoice,
      wallets,
      createWallet,
      newWallet,
      setNewWallet,
      error,
      setError,
    }}>
      {children}
    </ThenticContext.Provider>
  );
};