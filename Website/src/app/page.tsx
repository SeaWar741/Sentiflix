import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <>
      <div class='flex justify-center mt-8'>
        <Link href="/">
          <Image
          src="/logo_horizontal.png"
          width={500}
          height={500}
          alt="Sentflix Logo"
          />
        </Link>
      </div>
      <div class='ml-16 font-bold'>
       Genre 1
      </div>
      <div class='flex items-center justify-center'>
        <div class="py-8 w-full flex items-center justify-center">Movie 01</div>
        <div class="py-8 w-full flex items-center justify-center">Movie 02</div>
        <div class="py-8 w-full flex items-center justify-center">Movie 03</div>
        <div class="py-8 w-full flex items-center justify-center">Movie 04</div>
        <div class="py-8 w-full flex items-center justify-center">Movie 05</div>
      </div>
    </>
  )
}
