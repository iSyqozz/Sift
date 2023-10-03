import Image from 'next/image'
import Link from 'next/link'
import { getCollections } from '@utils/server'
import { ImageHover } from '@components'


const Collections = async () => {
  const collections = await getCollections();
  const top5 = collections.slice(0, 5);

  return (
    <div className='dark:text-white text-slate-700 text-sm mt-6  w-full mx-auto flex flex-wrap justify-evenly items-center max-sm:flex-col gap-2'>
      {
        top5.map((entry) => {
          return (
            <div key={entry.name} className='overflow-hidden shadow-lg hover:shadow-indigo-500 mt-4 h-[300px] aspect-[11/16] rounded-xl bg-slate-500 bg-opacity-[25%] opacity-100 relative flex flex-col items-center justify-start'>
              <div className='z-10 dark:bg-black dark:opacity-50 opacity-80 bg-white px-2 rounded-full text-lg absolute top-2 left-2 dark:text-white text-black font-bold'>{entry.description}</div>

              <div className="dark:text-white text-slate-700 relative overflow-hidden group transition-all duration-300 shadow-sm shadow-indigo-600 ">
                <ImageHover src={entry.image} alt={entry.name}></ImageHover>
              </div>

              <div className='bg-black bg-opacity-30 py-1 w-[100%] dark:text-white text-slate-700 text-sm flex items-center justify-center gap-2'>
                <div className='dark:text-white text-slate-700'>{entry.name}</div>
                <Link href={'https://magiceden.io/marketplace/'+entry.symbol}>
                  <Image className='cursor-pointer hover:scale-110 dark:invert-0 invert hover:invert-0 duration-75 mb-[3px]' width={20} height={20} alt='solana' src={'/icons/link.png'}></Image>
                </Link>
              </div>

              <div className='dark:text-white text-slate-700 w-full items-center flex justify-between gap-1'>
                <div className='ml-2 dark:text-white text-slate-700'>Floor</div>
                <div className='flex items-center justify-center gap-2 mr-2'>
                  <div className='dark:text-white text-slate-700'>{(entry.floorPrice / (10 ** 9)).toFixed(2)}</div>
                  <Image className='mt-[2px] ml-2' width={20} height={20} alt='solana' src={'/icons/Solana-Logo.png'}></Image>
                </div>
              </div>

              <div className='dark:text-white text-slate-700 w-full items-center flex justify-between'>
                <div className='ml-2 dark:text-white text-slate-700'>Volume</div>
                <div className='flex items-center justify-center gap-1 mr-2'>
                  <div className='dark:text-white text-slate-700'>{entry.volumeAll.toFixed(0)}</div>
                  <Image className='mt-[2px] ml-2' width={20} height={20} alt='solana' src={'/icons/Solana-Logo.png'}></Image>
                </div>
              </div>

            </div>
          )
        })

      }
    </div>
  )
}

export default Collections