import Image from 'next/image'
import Link from 'next/link'
import Button from './components/Button';

export default function Home() {
  return (
    <>
      <div className='flex justify-center mt-8'>
        <Link href="/">
          <Image
          src="/logo_horizontal.png"
          width={500}
          height={500}
          alt="Sentflix Logo"
          />
        </Link>
      </div>
      <div className='flex space-x-4 justify-center mt-8'>
        <Button href="/Trending">Trending movies</Button>
        <Button href="/Search">Search movies</Button>
        <Button href="/Random">Random movie</Button>
        <Button href="/Movies">Browse movies</Button>
      </div>
    </>
  )
}
