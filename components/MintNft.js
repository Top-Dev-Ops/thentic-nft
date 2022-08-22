import { useState } from 'react'
import { ApiKeyInput, Select } from './'
import { useThenticContext } from '../hooks/context'

export default function MintNft() {

  const [contract, setContract] = useState('')
  const [nft_id, setNftId] = useState(0)
  const [nft_data, setNftData] = useState('')
  const [to, setTo] = useState('')

  const { apiKey, setApiKey, chains, chain, setChain, nfts, mintNft, error } = useThenticContext()

  const nft = nfts.find(data => data.id === nft_id)

  return (
    <>
      <div className="bg-stack-3 p-4 my-4 rounded">
        <div className="block text-md font-medium text-current mb-6">
          MINT NFT
        </div>

        <div className="mb-4">
          <ApiKeyInput apiKey={apiKey} setApiKey={setApiKey} />
        </div>

        <div className="mb-4">
          <Select
            label="EVM chain id (skip for 97 - Binance testnet):"
            options={chains}
            value={chain}
            onChange={setChain}
            variant="sm"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="contract" className="block text-sm font-light text-primary">
            NFT contract address (0x... *):
          </label>
          <div className="mt-1">
            <input
              type="text"
              name="contract"
              id="contract"
              className="block w-full sm:text-sm rounded-md bg-stack-4 border-stack-3 focus-visible:border-primary focus-visible:ring-0 text-primary"
              value={contract}
              onChange={e => setContract(e.target.value)}
            />
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="nft_id" className="block text-sm font-light text-primary">
            NFT On-chain Id (*):
          </label>
          <div className="mt-1">
            <input
              type="text"
              name="nft_id"
              id="nft_id"
              className="block w-full sm:text-sm rounded-md bg-stack-4 border-stack-3 focus-visible:border-primary focus-visible:ring-0 text-primary"
              value={nft_id}
              onChange={e => setNftId(e.target.value)}
            />
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="nft_data" className="block text-sm font-light text-primary">
            Encrypted data (*):
          </label>
          <div className="mt-1">
            <input
              type="text"
              name="nft_data"
              id="nft_data"
              className="block w-full sm:text-sm rounded-md bg-stack-4 border-stack-3 focus-visible:border-primary focus-visible:ring-0 text-primary"
              value={nft_data}
              onChange={e => setNftData(e.target.value)}
            />
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="to" className="block text-sm font-light text-primary">
            Owner address (0x... *):
          </label>
          <div className="mt-1">
            <input
              type="text"
              name="to"
              id="to"
              className="block w-full sm:text-sm rounded-md bg-stack-4 border-stack-3 focus-visible:border-primary focus-visible:ring-0 text-primary"
              value={to}
              onChange={e => setTo(e.target.value)}
            />
          </div>
        </div>

        {error && <div className="mb-4 text-md text-red-500 font-semibold flex flex-row gap-4 items-center">
          <img src="/error.png" alt="" className="flex-shrink-0 h-6 w-6" /> {error}
        </div>}

        <div>
          <button
            type="submit"
            className="inline-flex justify-center py-2 px-8 border border-transparent shadow-sm text-sm font-medium rounded-md text-primary bg-primary hover:opacity-90"
            onClick={() => mintNft(contract, nft_id, nft_data, to)}
          >
            Submit
          </button>
        </div>
      </div>

      {nft && (
        <div className="bg-stack-3 p-4 my-4 rounded">
          <div className="block text-md font-medium text-current mb-6">
            NEW NFT
          </div>

          <div className="my-4">
            <div className="text-sm font-light">{nft.name} ({nft.short_name})</div>
            <div className="text-sm font-light text-primary">
              <span className="text-xs font-light text-disabled mt-4">NFT Id: </span>
              <span className="text-sm font-light text-primary">{nft.id}</span>
            </div>
            <div className="text-sm font-light text-primary">
              <span className="text-xs font-light text-disabled mt-4">Status: </span>
              <span className="text-sm font-light text-primary">{nft.status}</span>
            </div>
            <div className="text-sm font-light text-primary">
              <span className="text-xs font-light text-disabled mt-4">Request Id: </span>
              <span className="text-sm font-light text-primary">{nft.request_id}</span>
            </div>
            <div className="text-sm font-light text-primary">
              <span className="text-xs font-light text-disabled mt-4">Transaction Url: </span>
              <span className="text-sm font-light text-primary">{nft.transaction_url}</span>
            </div>
            <div className="text-sm font-light text-primary">
              <span className="text-xs font-light text-disabled mt-4">Transaction Pixel: </span>
              <span className="text-sm font-light text-primary">{nft.transaction_pixel}</span>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
