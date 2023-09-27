'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'


{/**wallet connection imports */ }
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import {
  WalletModalProvider,
  WalletMultiButton
} from '@solana/wallet-adapter-react-ui';
import "@solana/wallet-adapter-react-ui/styles.css"

const Navbar = () => {

  //wallet data
  const { publicKey, wallet, disconnect, select, signAllTransactions, } = useWallet();
  const owner = publicKey?.toBase58() || '';

  const [darkMode, setdarkMode] = useState(false);

  useEffect(() => {
    const handleConnect = async () => {
      if (wallet && wallet.readyState === 'NotDetected') {
        disconnect();
        select(null);
      }
    };

    const connectButton = document.getElementById('connect-button');

    if (connectButton) {
      connectButton.addEventListener('click', handleConnect);
    }

    return () => {
      if (connectButton) {
        connectButton.removeEventListener('click', handleConnect);
      }
    };
  }, [wallet]);


  const changeTheme = useCallback(() => {
    // On page load or when changing themes, best to add inline in `head` to avoid FOUC
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark')
      setdarkMode(false)
    } else {
      document.documentElement.classList.remove('dark')
      setdarkMode(true)
    }
  }, [])

  useEffect(() => {
    changeTheme()
  }, [changeTheme])

  return (
    <div className='relative max-w-6xl mx-auto'>
      <div className='w-[95%] mx-auto flex justify-between items-center py-2'>
        <div className='flex items-center justify-center gap-2'>
          <Link
            className='transition-all hover:scale-110'
            href={'/'}>
            <Image className='rounded-full'
              height={35}
              width={35}
              alt='logo'
              src={'/assets/logo.jpg'}
            ></Image>
          </Link>
          <div className='hover:scale-110 cursor-pointer rounded-full hover:bg-gray-500 hover:bg-opacity-20 transition-all grid place-items-center place-content-center overflow-hidden '>
            {!darkMode ? (
              <Image
                onClick={() => {
                  setdarkMode(prev => (true))
                  localStorage.setItem('theme', 'light')
                  changeTheme()
                }}
                className=''
                height={40}
                width={40}
                alt='light/dark'
                src={'/icons/light-mode.png'}
              ></Image>
            ) : (
              <Image
                onClick={() => {
                  setdarkMode(prev => (false))
                  localStorage.setItem('theme', 'dark')
                  changeTheme()
                }}

                className=''
                height={40}
                width={40}
                alt='light/dark'
                src={'/icons/dark-mode.png'}
              ></Image>
            )}

          </div>
        </div>
        <WalletModalProvider>
          <div id="connect-button">
            <WalletMultiButton className='connect-button' />
          </div>
        </WalletModalProvider>
      </div>
    </div>
  )
}

export default Navbar