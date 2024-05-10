import Image from 'next/image'
import { Noto_Sans_Thai } from 'next/font/google'
import React, { useState, useEffect } from 'react';
import { ArrowPathIcon, CloudArrowUpIcon, ArrowUpIcon, ArrowTrendingDownIcon, FingerPrintIcon, LockClosedIcon } from '@heroicons/react/24/outline'

const notoSansThai = Noto_Sans_Thai({ subsets: ['latin'] })

const categories = [
  {
    id: "PC001",
    name: "กระดาษ"
  },
  {
    id: "PC002",
    name: "โลหะ"
  },
  {
    id: "PC003",
    name: "เศษแก้ว"
  },
  {
    id: "PC004",
    name: "ขวด"
  },
  {
    id: "PC005",
    name: "พลาสติก"
  },
  {
    id: "PC006",
    name: "ยาง"
  },
  {
    id: "PC007",
    name: "อลูมิเนียม"
  }
]

const products = [
  {

    id: "P0101",
    categoryId: "PC001",
    name: "กล่อง",
    description: "กระดาษกล่องสีน้ำตาล",
    price: 6,
    unit: "กก.",
    status: "Active"
  },
  {
    id: "P0111",
    name: "จับจั๊ว",
    categoryId: "PC001",
    description: "เศษกระดาษทุกชนิด",
    price: 3.8,
    unit: "กก.",
    status: "Active"
  },
  {
    id: "P0112",
    categoryId: "PC001",
    name: "รังไข่/แกนกระดาษเล็ก",
    description: "กระดาษรังไข่",
    price: 3,
    unit: "กก.",
    status: "Active"
  },
  {
    id: "P0121",
    name: "ขาวดำ A",
    categoryId: "PC001",
    description: "กระดาษ A4 กระดาษเอกสารย่อยแล้ว กระดาษต่อเนื่องขาว สมุดฉีกปกออก หนังสือเนื้อปอนด์ฉีกปก",
    price: 6,
    unit: "กก.",
    status: "Active"
  },
  {
    id: "P0122",
    name: "ขาวดำ B ",
    categoryId: "PC001",
    description: "สมุดฉีกติดสันกาว กระดาษมีสีวาดเขียน กระดาษฝอย",
    price: 4.6,
    unit: "กก.",
    status: "Active"
  },
  {
    id: "P0201",
    categoryId: "PC002",
    name: "เหล็กหนา สั้น 80 ซม.",
    description: "เศษเหล็กหนา ยาวไม่เกิน 80 ซม. และหนาตั้งแต่ 30 มล.",
    price: 13.2,
    unit: "กก.",
    status: "Active"
  },
  {
    id: "P0202",
    categoryId: "PC002",
    name: "เหล็กหล่อแข็ง (ผสมเหล็กหนา)",
    description: "เศษเหล็กหล่อแข็ง, เครื่องยนต์ผ่า",
    price: 12.5,
    unit: "กก.",
    status: "Active"
  },
  {
    id: "P0211",
    categoryId: "PC002",
    name: "เหล็กรวม",
    description: "เศษเหล็กทั่วไป",
    price: 12.2,
    unit: "กก.",
    status: "Active"
  },
  {
    id: "P0221",
    categoryId: "PC002",
    name: "กระป๋องกาแฟ",
    description: "กระป๋องกาแฟ, ปลากระป๋อง, ถังปีบถอดกระจก",
    price: 8,
    unit: "กก.",
    status: "Active"
  },
  {
    id: "P0222",
    categoryId: "PC002",
    name: "สังกะสีแผ่น",
    description: "แผ่นสังกะสี ปีบ",
    price: 7,
    unit: "กก.",
    status: "Active"
  },
  {
    id: "P0301",
    categoryId: "PC003",
    name: "เศษแก้วสีขาว",
    description: "เศษแก้วสีขาว",
    price: 3,
    unit: "กก.",
    status: "Inactive"
  },
  {
    id: "P0302",
    categoryId: "PC003",
    name: "เศษแก้วสีชา/แดง",
    description: "เศษแก้วจากขวดเบียร์สีชา",
    price: 2.2,
    unit: "กก.",
    status: "Inactive"
  },
  {
    id: "P0303",
    categoryId: "PC003",
    name: "เศษแก้วสีเขียว",
    description: "เศษแก้วสีเขียว",
    price: 2.4,
    unit: "กก.",
    status: "Inactive"
  },
  {
    id: "P0401",
    categoryId: "PC004",
    name: "ขวดสิงห์/ยูเบียร์/ลีโอ 8/มายด์ (ใหญ่)",
    description: "ลังเบียร์ยี่ห้อสิงห์ ขวดใหญ่ จำนวน 12 ขวด/ลัง ภายในสะอาด, ปากขวดไม่บิ่นหรือแตก",
    price: 13,
    unit: "ลัง",
    status: "Active"
  },
  {
    id: "P0402",
    categoryId: "PC004",
    name: "ขวดลีโอใหญ่ 620 ml",
    description: "เบียร์ยี่ห้อลีโอ บรรจุขวดเบียร์ใหญ่ จำนวน 12 ขวด/ลัง ภายในสะอาด, ปากขวดไม่บิ่นหรือแตก",
    price: 14,
    unit: "ลัง",
    status: "Active"
  },
  {
    id: "P0403",
    categoryId: "PC004",
    name: "ขวดช้างใหญ่ 620 ml",
    description: "เบียร์ยี่ห้อช้าง ขวดใหญ่ จำนวน 12 ขวด/ลัง ภายในสะอาด, ปากขวดไม่บิ่นหรือแตก",
    price: 16,
    unit: "ลัง",
    status: "Active"
  },
  {
    id: "P0404",
    categoryId: "PC004",
    name: "ขวดเหล้าใหญ่ (รวงข้าว) 620 ml",
    description: "เหล้าขาว ยี่ห้อรวงข้าว ขวดใหญ่ จำนวน 12 ขวด/ลัง ภายในสะอาด, ไม่มีจุกฝา, ปากขวดไม่บิ่นหรือแตก",
    price: 14,
    unit: "ลัง",
    status: "Active"
  },
  {
    id: "P0405",
    categoryId: "PC004",
    name: "ขวดเหล้าเล็ก (รวงข้าว) 330ml",
    description: "เหล้าขาวยี่ห้อรวงข้าว  ขวดเล็ก จำนวน 24 ขวด/ลัง ภายในสะอาด, ไม่มีจุกฝา, ปากขวดไม่บิ่นหรือแตก",
    price: 23,
    unit: "ลัง",
    status: "Active"
  },
  {
    id: "P0406",
    categoryId: "PC004",
    name: "ขวดเหล้าใหญ่ (เก่า) 620 ml",
    description: "เหล้าพญานาค/พญาเสือ",
    price: 13,
    unit: "ลัง",
    status: "Active"
  },
  {
    id: "P0501",
    categoryId: "PC005",
    name: "ขวด PET",
    description: "ขวดพลาสติกน้ำดื่ม PET มีสลาก",
    price: 17,
    unit: "กก.",
    status: "Active"
  },
  {
    id: "P0502",
    categoryId: "PC005",
    name: "ขวด PET แกะสลาก",
    description: "ขวดพลาสติกน้ำดื่ม (PET) แกะสลาก",
    price: 17,
    unit: "กก.",
    status: "Active"
  },
  {
    id: "P0503",
    categoryId: "PC005",
    name: "ขวด PET สีต่างๆ",
    description: "ขวดน้ำดื่มพลาสติกสีอื่นๆ (PET)",
    price: 2,
    unit: "กก.",
    status: "Inactive"
  },
  {
    id: "P0601",
    categoryId: "PC006",
    name: "ยางรถยนต์ ผ่าแก้ม",
    description: "ยางล้อรถเล็ก, ล้อใหญ่ ผ่าแก้ม สะอาด",
    price: 1.3,
    unit: "กก.",
    status: "Inactive"
  },
  {
    id: "P0602",
    categoryId: "PC006",
    name: "ยางรถยนต์, รถ 6-10 ล้อ",
    description: "ยางล้อขอบ 15 - 19 นิ้ว",
    price: 1,
    unit: "กก.",
    status: "Inactive"
  },
  {
    id: "P0701",
    categoryId: "PC007",
    name: "โลกระป๋อง",
    description: "อลูมิเนียมกระป๋อง เช่น กระป๋องน้ำอัดลม",
    price: 0,
    unit: "กก.",
    status: "Inactive"
  }
]

export default function Home() {

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
      <div className="z-10 max-w-5xl w-full items-center justify-between font-semibold text-sm lg:flex">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          ราคารับซื้อ เริ่ม&nbsp;
          {/* <code className="font-mono font-bold">{date.toLocaleDateString()}</code> */}
          <time suppressHydrationWarning >{date.toLocaleDateString()}</time>
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
      {categories.map(() => (

      ))}
      <div className="bg-white sm:py-32">

        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-2xl font-semibold leading-7 text-indigo-600">ประเภทกล่อง</h2>
            {/* <h2 className="text-base font-semibold leading-7 text-indigo-600">Deploy faster</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Everything you need to deploy your app
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Quis tellus eget adipiscing convallis sit sit eget aliquet quis. Suspendisse eget egestas a elementum
              pulvinar et feugiat blandit at. In mi viverra elit nunc.
            </p> */}
          </div>
          <div className="mx-auto mt-8 max-w-2xl sm:mt-10 lg:mt-14 lg:max-w-4xl">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
              {products.filter(product => product.categoryId == "PC001").map((product) => (
                <div key={product.name} className="relative pl-16">
                  <dt className="text-base font-semibold leading-7 text-gray-900">
                    {product.status == 'Active' &&
                      <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-green-500">
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


      </div>

    </main>
  )
}
