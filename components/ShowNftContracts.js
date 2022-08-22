import { useState } from 'react'
import { ApiKeyInput, Select } from './'
import { useThenticContext } from '../hooks/context'

export default function ShowNftContracts() {

  const { apiKey, setApiKey, chains, chain, setChain, contracts, error } = useThenticContext()
  const [showContracts, setShowContracts] = useState(false)

  return (
    <>
      <div className="bg-stack-3 p-4 my-4 rounded">
        <div className="block text-md font-medium text-current mb-6">
          SHOW NFT CONTRACTS
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
            onClick={() => setShowContracts(true)}
          >
            Submit
          </button>
        </div>
      </div>

      {showContracts && (
        <div className="bg-stack-3 p-4 my-4 rounded">
          <div className="block text-md font-medium text-current mb-6">
            YOUR CONTRACTS
          </div>

          {contracts.map(contract => (
            <div key={contract.request_id} className="my-4">
              <div className="text-sm font-light">{contract.name} ({contract.short_name})</div>
              <div className="text-sm font-light text-primary">
                <span className="text-xs font-light text-disabled mt-4">Status: </span>
                <span className="text-sm font-light text-primary">{contract.status}</span>
              </div>
              <div className="text-sm font-light text-primary">
                <span className="text-xs font-light text-disabled mt-4">Request Id: </span>
                <span className="text-sm font-light text-primary">{contract.request_id}</span>
              </div>
              <div className="text-sm font-light text-primary">
                <span className="text-xs font-light text-disabled mt-4">Transaction Url: </span>
                <span className="text-sm font-light text-primary">{contract.transaction_url}</span>
              </div>
              <div className="text-sm font-light text-primary">
                <span className="text-xs font-light text-disabled mt-4">Transaction Pixel: </span>
                <span className="text-sm font-light text-primary">{contract.transaction_pixel}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  )
}
