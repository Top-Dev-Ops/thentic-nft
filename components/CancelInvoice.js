import { useState } from 'react'
import { ApiKeyInput, Select } from './'
import { useThenticContext } from '../hooks/context'

export default function CancelInvoice() {

  const [request_id, setRequestId] = useState('')
  const [cancelClicked, setCancelClicked] = useState(false)

  const { apiKey, setApiKey, chains, chain, setChain, invoices, cancelInvoice, error } = useThenticContext()

  const invoice = invoices.find(data => data.request_id === request_id)

  return (
    <>
      <div className="bg-stack-3 p-4 my-4 rounded">
        <div className="block text-md font-medium text-current mb-6">
          CANCEL INVOICE
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
          <label htmlFor="request_id" className="block text-sm font-light text-primary">
            Request Id (*):
          </label>
          <div className="mt-1">
            <input
              type="text"
              name="request_id"
              id="request_id"
              className="block w-full sm:text-sm rounded-md bg-stack-4 border-stack-3 focus-visible:border-primary focus-visible:ring-0 text-primary"
              value={request_id}
              onChange={e => setRequestId(e.target.value)}
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
            onClick={() => {
              setCancelClicked(true)
              cancelInvoice(request_id)
            }}
          >
            Submit
          </button>
        </div>
      </div>

      {!invoice && cancelClicked && (
        <div className="bg-stack-3 p-4 my-4 rounded">
          <div className="block text-md font-medium text-current mb-6">
            CANCEL INVOICE
          </div>

          <div className="text-sm font-light text-primary">Request cancelled</div>
        </div>
      )}
    </>
  )
}
