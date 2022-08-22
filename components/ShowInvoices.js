import { useState } from 'react'
import { ApiKeyInput, Select } from './'
import { useThenticContext } from '../hooks/context'

export default function ShowInvoices() {

  const { apiKey, setApiKey, chains, chain, setChain, invoices, error } = useThenticContext()
  const [showInvoices, setShowInvoices] = useState(false)

  return (
    <>
      <div className="bg-stack-3 p-4 my-4 rounded">
        <div className="block text-md font-medium text-current mb-6">
          SHOW INVOICES
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
            onClick={() => setShowInvoices(true)}
          >
            Submit
          </button>
        </div>
      </div>

      {showInvoices && (
        <div className="bg-stack-3 p-4 my-4 rounded">
          <div className="block text-md font-medium text-current mb-6">
            YOUR INVOICES
          </div>

          {invoices.map(invoice => (
            <div key={invoice.request_id} className="my-4">
              <div className="text-sm font-light">{`${invoice.amount} ${invoice.currency}`}</div>
              <div className="text-sm font-light text-primary">
                <span className="text-xs font-light text-disabled mt-4">Status: </span>
                <span className="text-sm font-light text-primary">{invoice.status}</span>
              </div>
              <div className="text-sm font-light text-primary">
                <span className="text-xs font-light text-disabled mt-4">Request Id: </span>
                <span className="text-sm font-light text-primary">{invoice.request_id}</span>
              </div>
              <div className="text-sm font-light text-primary">
                <span className="text-xs font-light text-disabled mt-4">Transaction Url: </span>
                <span className="text-sm font-light text-primary">{invoice.transaction_url}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  )
}
