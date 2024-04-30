import MainLayout from '@/components/layouts/MainLayout'
import Link from 'next/link'

const fourzeroFour = () => {
  return (
    <MainLayout>
        <div className='flex items-center justify-center h-[62vh] flex-col gap-5'>
            <h2 className='text-center text-4xl'>404 -<span className='font-bold'> Page Not Found</span></h2>
            <Link href="/" passHref>
                <p className='text-2xl text-accent'> Go to homepage</p>
            </Link>
        </div>
    </MainLayout>
  )
}

export default fourzeroFour