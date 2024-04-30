import Link from "next/link"

const Hero = () => {
  return (
    <section className="flex mt-10 mx-[13%] items-center justify-center gap-3">
        <div className="flex-1">
            <h2 className="text-primary font-bold text-5xl mb-5">Explora y tradea NFTs</h2>

            <p className="mb-4">Con Disrup3 marketplace podrás apoyar a tus creadores favoritos
                de la forma mas descentralizada y segura posible
            </p>

            <div>
                <Link href="/explore">
                    <button className="btn btn-accent mr-3 w-[100px]">Explore</button>
                </Link>                
                <button className="btn btn-secondary ml-3 w-[100px]">Create</button>
            </div>
        </div>

        <div className="flex-1  hidden md:block">
            {/** SHOW IMAGE OF MR CRYPTO */}
            <div className="card w-67 bg-base bg-opacity-10 shadow-xl">
                <img className="w-[100%]" src="https://i.seadn.io/gae/FdHndvSm1NaDNylgeezFF8ySxjN_p8Pmv28TcR4klfocPJk42eEvHclaX5-jURSqb1MAUgt-0v_YxI8ARAIzo5bufJI-52sdhP63?auto=format&w=1000" alt="mrcryptoBase" />

                <div className="card-body">
                    <h3 className="">Mr crypto</h3>
                    <p>Mr. Crypto #2502</p>
                </div>                
            </div>
        </div>
    </section>
  )
}

export default Hero

