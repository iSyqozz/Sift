'use client'
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState, useCallback } from "react"
import { getCollections, getFloored, getNFTData, adjustDisplayName } from "@utils/server"
import { collectionEntry } from "@constants"
import { ImageHover } from "@components"


const amounts = [
  5,
  10,
  20,
  30,
  40,
  50,
]



const CollectionsPage = () => {

  const [collections, setCollections] = useState<collectionEntry[]>([]);
  const [searchFilter, setSearchFilter] = useState('');
  const [amountFilter, setAmountFilter] = useState(20);
  const [amountFilterDropDownVis, setAmountFilterDropDownVis] = useState(false);
  const [Loading, setLoading] = useState(true);
  const [floorItemsShown, setFloorItemsShown] = useState(collections.map(() => false));
  const [floorItemsLoading, setFloorItemsLoading] = useState(collections.map(() => false));

  const filteredItems = collections.slice(0, amountFilter).filter((item) => {
    return (searchFilter === '' || item.name.toLowerCase().startsWith(searchFilter.toLowerCase()))
  });


  const pageRefresh = useCallback(async () => {
    const freshCollections = await getCollections()
    setCollections(freshCollections);
    setLoading(false);
  }, [])

  const nftsFetch = useCallback(async (collection: collectionEntry) => {
    const floored = await getFloored(collection.symbol)
    const mints = floored.map((entry: any) => entry.tokenMint ?? '')
    const nfts = (await getNFTData(mints)).map(((entry, _) => {
      return { ...entry, price: floored[_].price }
    }))
    console.log(nfts)

    setFloorItemsLoading((prev) => {
      const newList = [...prev]
      newList[parseInt(collection.description) - 1] = false;
      return newList
    })
    setCollections((prev) => {
      const newList = [...prev];
      newList[parseInt(collection.description) - 1].nfts = nfts;
      return newList
    })
  }, [])


  useEffect(() => {
    pageRefresh();
    setLoading(true)
  }, [pageRefresh])

  return (
    <div className='relative max-w-6xl mx-auto mt-12'>
      <div className='hidden dark:flex blur-[110px] opacity-20 z-[-1] bg-gradient-to-bl from-purple-400 via-indigo-400 to-indigo-700 w-[30vw] aspect-auto h-[40vw] absolute left-0 top-0 rounded-full'></div>
      <div className='hidden dark:flex blur-[110px] opacity-20 z-[-1] bg-gradient-to-bl from-purple-400 via-indigo-400 to-indigo-700 w-[30vw] aspect-auto h-[40vw] absolute bottom-0 right-0 rounded-full'></div>

      <section className="px-8 py-12 mx-auto flex flex-col justify-center items-center gap-2">
        <h1 className="text-4xl sm:text-8xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-indigo-400 to-indigo-700">
          Collections
        </h1>
        <h2 className="block mb-4 text-xs md:text-sm text-indigo-400 font-medium">
          Overview
        </h2>
        <h3 className="text-base md:text-lg text-slate-700 my-4 md:my-6 max-w-[65%] text-center">
          First Hand overview on the most popular collections with direct Links to Floored NFTs with ease.
        </h3>

        <div className="w-full relative px-2 py-6 sm:py-8">
          <div className="flex flex-col items-end justify-start md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            {/* Search Input */}
            <div className="relative w-full sm:w-2/3">
              <input
                type="text"
                placeholder="Filter by name..."
                className="transition-all w-full px-4 py-2 rounded-md border border-slate-600 dark:bg-black bg-none bg-opacity-60 dark:text-white text-black focus:outline-none active:outline-none "
                value={searchFilter}
                onChange={(e) => {
                  setSearchFilter(e.target.value.substring(0, 30))
                }}
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className=" transition-all cursor-pointer h-5 w-5 absolute top-3 right-2"
                fill="black"
                viewBox="0 0 24 24"
                stroke="gray"
                onClick={() => {
                  setSearchFilter('');
                }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>


            <div className="flex justify-start items-center gap-2">
              <Image
                onClick={async () => {
                  setLoading(true);
                  pageRefresh();
                }}
                className={"cursor-pointer hover:scale-105 duration-75" + (Loading ? (' animate-spin') : (' animate-none'))}
                height={30} width={30} alt="refresh" src={'/icons/refresh.png'}></Image>

              {/* Type Filter Dropdown */}
              <div className="relative max-sm:ml-auto">
                <button
                  className=" transition-all flex items-center space-x-2 px-4 py-2 rounded-md border border-slate-600 dark:bg-black bg-none text-black bg-opacity-60 dark:text-white focus:outline-none active:outline-none"
                  onClick={() => setAmountFilterDropDownVis(!amountFilterDropDownVis)}
                >
                  <span className="dark:text-white text-black text-opacity-70">View Count: {amountFilter}</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="gray"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {/* Type Filter Dropdown Content */}
                {amountFilterDropDownVis && (
                  <div className=" overflow-hidden absolute z-20 right-0 mt-2 w-56 border border-slate-600 dark:bg-black bg-none bg-opacity-60 dark:text-white text-black focus:outline-none active:outline-none rounded-lg shadow-lg">

                    {amounts.map((type) => (
                      <button
                        key={type}
                        className={` transition-all block w-full text-left px-4 py-1 hover:bg-slate-900 hover:bg-opacity-40 hover:text-white text-secondary ${type === amountFilter ? 'bg-slate-900 bg-opacity-60 text-white' : ''
                          }`}
                        onClick={() => {
                          setAmountFilter(type);
                          setAmountFilterDropDownVis(false);
                        }}
                      >
                        Top {type} Collections.
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>



          </div>
        </div>

        {Loading ? (
          <div className="mt-16 w-full items-center flex justify-center">
            <Image className=" animate-spin"
              width={100}
              height={100}
              alt="loadin"
              src={'/icons/loading.png'}
            ></Image>
          </div>
        ) : (
          <div className='dark:text-white text-slate-700 text-sm mt-16  w-full mx-auto flex flex-wrap max-sm:items-center sm:justify-start items-start max-sm:flex-col gap-2'>
            {
              filteredItems.map((entry,) => {
                return (
                  <div key={entry.name} className=' shadow-lg hover:shadow-indigo-500 mt-4 h-[300x] w-[206px] rounded-xl bg-slate-500 bg-opacity-[25%] opacity-100 relative flex flex-col items-center justify-start'
                  >
                    <div className='z-10 dark:bg-black dark:opacity-50 opacity-80 bg-white px-1.5 rounded-full absolute top-2 left-2 dark:text-white text-black font-bold text-sm'>{entry.description}</div>

                    <div className=" dark:text-white text-slate-700 relative overflow-hidden group transition-all duration-300 shadow-sm shadow-indigo-600 ">
                      <ImageHover src={entry.image} alt={entry.name}></ImageHover>
                    </div>

                    <div className='bg-black bg-opacity-10 py-1 w-[100%] dark:text-white text-slate-700 text-sm flex items-center justify-center gap-2'>
                      <div className='dark:text-white text-slate-700 truncate'>{entry.name}</div>
                      <Link href={'/collections/' + entry.name}>
                        <Image className='cursor-pointer hover:scale-110 dark:invert-0 invert hover:invert-0 duration-75 mb-[3px]' width={20} height={20} alt='solana' src={'/icons/link.png'}></Image>
                      </Link>
                    </div>

                    <div className='dark:text-white text-slate-700 w-full items-center flex justify-between gap-1'>
                      <div className='ml-2 dark:text-white text-slate-700'>Floor</div>
                      <div className='flex items-center justify-end gap-1 mr-1'>
                        <div className='dark:text-white text-slate-700'>{(entry.floorPrice / (10 ** 9)).toFixed(2)}</div>
                        <Image className='mt-[2px] ml-2' width={20} height={20} alt='solana' src={'/icons/Solana-Logo.png'}></Image>
                      </div>
                    </div>

                    <div className='dark:text-white text-slate-700 w-full items-center flex justify-between'>
                      <div className='ml-2 dark:text-white text-slate-700'>Volume</div>
                      <div className='flex items-center justify-end gap-1 mr-1'>
                        <div className='dark:text-white text-slate-700'>{entry.volumeAll.toFixed(0)}</div>
                        <Image className='mt-[2px] ml-2' width={20} height={20} alt='solana' src={'/icons/Solana-Logo.png'}></Image>
                      </div>
                    </div>

                    <div
                      onClick={() => {
                        setFloorItemsShown((prev) => {
                          const newList = [...prev]
                          newList[parseInt(entry.description) - 1] = !newList[parseInt(entry.description) - 1];
                          return newList
                        })
                        setFloorItemsLoading((prev) => {
                          const newList = [...prev]
                          newList[parseInt(entry.description) - 1] = true;
                          return newList
                        })
                        nftsFetch(entry);
                      }}
                      className="group cursor-pointer text-center w-full flex items-center justify-center my-2">
                      {
                        floorItemsShown[parseInt(entry.description) - 1] ? (
                          <div className='bg-black bg-opacity-10 py-1 w-[100%] dark:text-white text-slate-700 text-sm flex items-center justify-center gap-2'>
                            <div className='dark:text-white text-slate-700'>Floored NFTs</div>
                            <Image className=" dark:group-hover:brightness-200 rotate-180" height={20} width={20} alt="arrow-down" src={'/icons/arrow-down.png'}></Image>
                          </div>
                        ) : (
                          <Image className=" dark:group-hover:brightness-200" height={20} width={20} alt="arrow-down" src={'/icons/arrow-down.png'}></Image>
                        )
                      }
                    </div>
                    {
                      floorItemsShown[parseInt(entry.description) - 1] && (
                        <>
                          {
                            !floorItemsLoading[parseInt(entry.description) - 1] && entry.nfts ? (
                              <>
                                {
                                  entry.nfts!.map((nft) => (

                                    <Link key={nft.name} target="_blank" className="w-full" href={`https://magiceden.io/item-details/${nft.mintAddress}`}>
                                      <div className='hover:bg-slate-700 group cursor-pointer dark:text-white text-slate-700 w-full items-center flex justify-between'>
                                        <div className=' group-hover:text-white ml-2 dark:text-white text-slate-700 truncate'>{adjustDisplayName(nft.name!, nft.tick!)}</div>
                                        <div className='flex items-center justify-end gap-1 mr-2'>
                                          <div className=' group-hover:text-white dark:text-white text-slate-700'>{nft.price!.toFixed(2)}</div>
                                          <Image className='mt-[2px] ml-2' width={20} height={20} alt='solana' src={'/icons/Solana-Logo.png'}></Image>
                                        </div>
                                      </div>
                                    </Link>

                                  ))
                                }
                              </>
                            ) : (
                              <Image className=" animate-spin m-2"
                                width={40}
                                height={40}
                                alt="loadin"
                                src={'/icons/loading.png'}
                              ></Image>
                            )
                          }

                        </>
                      )
                    }

                  </div>
                )
              })

            }
          </div>
        )}


      </section>
    </div>
  )
}

export default CollectionsPage