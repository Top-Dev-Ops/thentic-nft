import { useState } from 'react'
import { ApiKeyInput, Select } from './'
import { useThenticContext } from '../hooks/context'

export default function CreateNftContract() {
  const [name, setName] = useState('')
  const [short_name, setShortName] = useState('')

  const { apiKey, setApiKey, chains, chain, setChain, contracts, createNftContract, error } = useThenticContext()

  const contract = contracts.find(data => data.name === name && data.short_name === short_name)

  return (
    <>
      <div className="bg-stack-3 p-4 my-4 rounded">
        <div className="block text-md font-medium text-current mb-6">
          CREATE NFT CONTRACT
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
          <label htmlFor="name" className="block text-sm font-light text-primary">
            NFT name (*):
          </label>
          <div className="mt-1">
            <input
              type="text"
              name="name"
              id="name"
              className="block w-full sm:text-sm rounded-md bg-stack-4 border-stack-3 focus-visible:border-primary focus-visible:ring-0 text-primary"
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="short_name" className="block text-sm font-light text-primary">
            NFT symbol (*):
          </label>
          <div className="mt-1">
            <input
              type="text"
              name="short_name"
              id="short_name"
              className="block w-full sm:text-sm rounded-md bg-stack-4 border-stack-3 focus-visible:border-primary focus-visible:ring-0 text-primary"
              value={short_name}
              onChange={e => setShortName(e.target.value)}
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
            onClick={() => createNftContract(name, short_name)}
          >
            Submit
          </button>
        </div>
      </div>

      {contract && (
        <div className="bg-stack-3 p-4 my-4 rounded">
          <div className="block text-md font-medium text-current mb-6">
            NEW CONTRACT
          </div>

          <div className="my-4">
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
        </div>
      )}
    </>
  )
}
