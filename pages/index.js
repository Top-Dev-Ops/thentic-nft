import { useState } from 'react'

import {
  CreateInvoice,
  CancelInvoice,
  ShowInvoices,
  CreateNftContract,
  ShowNftContracts,
  CreateWallet,
  ShowWallets,
  MintNft,
  ShowNfts,
  TransferNft,
  Select,
} from '../components'

import { useThenticContext } from '../hooks/context'

const options = [
  {
    id: 0,
    name: 'Select',
    avatar: '/select.png',
  },
  {
    id: 1,
    name: 'Show NFT contracts',
    avatar: '/show_contracts.png',
  },
  {
    id: 2,
    name: 'Show NFTs',
    avatar: '/show_nfts.png',
  },
  {
    id: 3,
    name: 'Create NFT contract',
    avatar: '/create_contract.png',
  },
  {
    id: 4,
    name: 'Mint NFT',
    avatar: '/mint_nft.png',
  },
  {
    id: 5,
    name: 'Transfer NFT',
    avatar: '/transfer_nft.png',
  },
  {
    id: 6,
    name: 'Show invoices',
    avatar: '/show_invoices.png',
  },
  {
    id: 7,
    name: 'Create invoice',
    avatar: '/create_invoice.png',
  },
  {
    id: 8,
    name: 'Cancel invoice',
    avatar: '/cancel_invoice.png',
  },
  {
    id: 9,
    name: 'Show wallets',
    avatar: '/show_wallets.png',
  },
  {
    id: 10,
    name: 'Create new wallet',
    avatar: '/create_wallet.png',
  },
]

export default function Home() {
  const [option, setOption] = useState(options[0])

  const { setNewWallet, setError } = useThenticContext()

  return (
    <div className="bg-stack-2">
      <Select
        label="Select API method: "
        options={options}
        value={option}
        onChange={data => {
          setError(null)
          setNewWallet(null)
          setOption(data)
        }}
        variant="md"
      />

      {option.id === 1 && <ShowNftContracts />}
      {option.id === 2 && <ShowNfts />}
      {option.id === 3 && <CreateNftContract />}
      {option.id === 4 && <MintNft />}
      {option.id === 5 && <TransferNft />}
      {option.id === 6 && <ShowInvoices />}
      {option.id === 7 && <CreateInvoice />}
      {option.id === 8 && <CancelInvoice />}
      {option.id === 9 && <ShowWallets />}
      {option.id === 10 && <CreateWallet />}
    </div>
  )
}
