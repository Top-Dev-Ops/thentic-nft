import { useState } from 'react'
import { ApiKeyInput, Select } from './'
import { useThenticContext } from '../hooks/context'

export default function ShowNfts() {

  const { apiKey, setApiKey, chains, chain, setChain, nfts, error } = useThenticContext()
  const [showNfts, setShowNfts] = useState(false)

  return (
    <>
      <div className="bg-stack-3 p-4 my-4 rounded">
        <div className="block text-md font-medium text-current mb-6">
          SHOW NFTS
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

        {error && <div className="mb-4 text-md text-red-500 font-semibold flex flex-row gap-4 items-center">
          <img src="/error.png" alt="" className="flex-shrink-0 h-6 w-6" /> {error}
        </div>}

        <div>
          <button
            type="submit"
            className="inline-flex justify-center py-2 px-8 border border-transparent shadow-sm text-sm font-medium rounded-md text-primary bg-primary hover:opacity-90"
            onClick={() => setShowNfts(true)}
          >
            Submit
          </button>
        </div>
      </div>

      {showNfts && (
        <div className="bg-stack-3 p-4 my-4 rounded">
          <div className="block text-md font-medium text-current mb-6">
            YOUR NFTS
          </div>

          {nfts.length > 0 ? nfts.map(nft => (
            <div key={nft.request_id} className="my-4">
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
          )) : (
            <div className="text-sm font-light text-primary">
              No NFTs created yet.
            </div>
          )}
        </div>
      )}
    </>
  )
}
