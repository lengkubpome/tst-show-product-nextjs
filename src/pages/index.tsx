import Image from 'next/image'
import { Noto_Sans_Thai } from 'next/font/google'
import React, { useState, useEffect } from 'react';
import { ArrowPathIcon, CloudArrowUpIcon, ArrowUpIcon, ArrowTrendingDownIcon, FingerPrintIcon, LockClosedIcon } from '@heroicons/react/24/outline'

const notoSansThai = Noto_Sans_Thai({ subsets: ['latin'] })

interface ProductCurrentPrice {
  productPriceChange: {
    id: string;
    changeDate: string;
    remark: string;
  },
  productCategories: [
    {
      id: string;
      name: string;
      status: string;
      productList: [
        {
          id: string;
          name: string;
          description: string;
          price: number;
          unit: string;
          status: "Active" | "Inactive" | string;
          changedPrice: number;
          previousPrice: number;
          promotionList?: [
            {
              order: number;
              description: string;
              addonPrice: number;
              startDate: string;
              EndDate: string;
              status: string;
            }
          ]
        }
      ]
    }
  ]
}

const productDataAPI = "https://script.google.com/macros/s/AKfycbwiEL2ia3zp0R_jahDP5BW8612oQ4K2UcDoiLNOoZXlOMiOSBSJ2WqCVoo1Kz16GiRt/exec"
export default function Home() {

  const [productData, setProductData] = useState<ProductCurrentPrice>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(productDataAPI);
      const jsonData = await response.json();
      setProductData(jsonData)
      setIsLoading(false);
    };
    fetchData();
  }, [])

  console.log(typeof productData?.productPriceChange.changeDate)


  const [date, setDate] = useState(new Date());
  useEffect(() => {
    const interval = setInterval(() => {
      setDate(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <main
      className={`flex flex-col items-center justify-between py-24 ${notoSansThai.className}`}
    >
      {isLoading ? (
        <div>กำลังโหลดข้อมูล...</div>
      ) : (
        <div className="z-10 max-w-5xl w-full items-center justify-between font-semibold text-sm lg:flex">

          <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
            ราคารับซื้อ เริ่ม&nbsp;
            <time suppressHydrationWarning >{new Date(productData!.productPriceChange.changeDate).toLocaleDateString('th-TH')}</time>
          </p>

          <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
            <a
              className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
              href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template-tw&utm_campaign=create-next-app"
              target="_blank"
              rel="noopener noreferrer"
            >
              By{' '}
              <Image
                src="/vercel.svg"
                alt="Vercel Logo"
                className="dark:invert"
                width={100}
                height={24}
                priority
              />
            </a>
          </div>
        </div>
      )}

      <div className="bg-white sm:py-20">
        {productData?.productCategories.filter((category) => category.status == "Active").map((category) => (
          <div key={category.id} className="mx-auto max-w-7xl px-6 lg:px-8 pb-20">
            <div className="mx-auto max-w-2xl lg:text-center">
              <h2 className="text-2xl font-semibold leading-7 text-indigo-600">{category.name}</h2>

            </div>
            <div className="mx-auto mt-8 max-w-2xl sm:mt-10 lg:mt-14 lg:max-w-4xl">
              <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
                {category.productList.map((product) => (
                  <div key={product.name} className="relative pl-16">
                    <dt className="text-base font-semibold leading-7 text-gray-900">
                      {(product.changedPrice - product.previousPrice) > 0 &&
                        <div className="absolute left-0 top-0 flex h-14 w-14 items-center justify-center rounded-lg text-white bg-green-500">
                          {/* <ArrowUpIcon className="h-6 w-6 text-white" aria-hidden="true" /> */}
                          <p> +{(product.changedPrice - product.previousPrice).toFixed(2)}</p>
                        </div>}
                      {(product.changedPrice - product.previousPrice) < 0 &&
                        <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-red-500">
                          <ArrowUpIcon className="h-6 w-6 text-white" aria-hidden="true" />
                        </div>}
                      {product.name}
                    </dt>
                    <dd className="mt-2 text-base leading-7 text-gray-600">{product.description}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        ))}



      </div>

    </main>
  )
}
