import { useState } from 'react'
import { ApiKeyInput, Select } from './'
import { useThenticContext } from '../hooks/context'

export default function CreateInvoice() {

  const [amount, setAmount] = useState(0)
  const [to, setTo] = useState('')

  const { apiKey, setApiKey, chains, chain, setChain, invoices, createInvoice, error } = useThenticContext()

  const invoice = invoices.find(data => data.invoice_to === to)

  return (
    <>
      <div className="bg-stack-3 p-4 my-4 rounded">
        <div className="block text-md font-medium text-current mb-6">
          CREATE INVOICE
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
          <label htmlFor="amount" className="block text-sm font-light text-primary">
            Invoice Amount (*):
          </label>
          <div className="mt-1">
            <input
              type="text"
              name="amount"
              id="amount"
              className="block w-full sm:text-sm rounded-md bg-stack-4 border-stack-3 focus-visible:border-primary focus-visible:ring-0 text-primary"
              value={amount}
              onChange={e => setAmount(e.target.value)}
            />
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="to" className="block text-sm font-light text-primary">
            Receiver address (0x... *):
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
            onClick={() => createInvoice(amount, to)}
          >
            Submit
          </button>
        </div>
      </div>

      {invoice && (
        <div className="bg-stack-3 p-4 my-4 rounded">
          <div className="block text-md font-medium text-current mb-6">
            NEW INVOICE
          </div>

          <div className="my-4">
            <div className="text-sm font-light">{`${invoice.amount} ${invoice.currency}`}</div>
            <div className="text-sm font-light text-primary">
              <span className="text-xs font-light text-disabled mt-4">Receiver: </span>
              <span className="text-sm font-light text-primary">{invoice.invoice_to}</span>
            </div>
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
            <div className="text-sm font-light text-primary">
              <span className="text-xs font-light text-disabled mt-4">Transaction Pixel: </span>
              <span className="text-sm font-light text-primary">{invoice.transaction_pixel}</span>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
