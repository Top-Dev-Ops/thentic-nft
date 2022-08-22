import { ApiKeyInput, Select } from './'
import { useThenticContext } from '../hooks/context'

export default function CreateWallet() {

  const { apiKey, setApiKey, chains, chain, setChain, newWallet, createWallet, error } = useThenticContext()

  return (
    <>
      <div className="bg-stack-3 p-4 my-4 rounded">
        <div className="block text-md font-medium text-current mb-6">
          CREATE WALLET
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
            onClick={createWallet}
          >
            Submit
          </button>
        </div>
      </div>

      {newWallet && (
        <div className="bg-stack-3 p-4 my-4 rounded">
          <div className="block text-md font-medium text-current mb-6">
            NEW WALLET
          </div>

          <div className="text-sm font-light">Wallet</div>
          <div className="text-sm font-light text-primary">{newWallet.wallet}</div>
          <div className="text-sm font-light mt-4">Private Key</div>
          <div className="text-sm font-light text-primary">{newWallet.private_key}</div>
        </div>
      )}
    </>
  )
}
