import Image from 'next/image';

export default function ImageGrid(){

    return(
        <>
            <section className="w-[90%] flex flex-col mx-auto gap-2 mt-12 mb-12">
                <div className="w-full flex flex-row items-center gap-2">
                    <div className="w-2/4 h-40 bg-gray-300 rounded-3xl p-8 flex items-center justify-center">
                        <Image className='mx-auto' src={"/Images/astro-logo.png"} alt='Astro Logo' width={300} height={120}></Image>
                    </div>
                    <div className="w-1/4 h-40 bg-gray-300 rounded-3xl p-8 flex items-center justify-center">
                        <Image className='mx-auto' src={"/Images/react-logo.png"} alt='React Logo' width={120} height={120}></Image>
                    </div>
                    <div className="w-1/4 h-40 bg-gray-300 rounded-3xl p-8 flex items-center justify-center">
                        <Image className='mx-auto' src={"/Images/nextjs-logo.png"} alt='NextJS Logo' width={120} height={120}></Image>
                    </div>
                </div>
                <div className="w-full flex flex-row items-center gap-2">
                    <div className="w-2/4 h-40 bg-gray-300 rounded-3xl p-8 flex items-center justify-center">
                        <Image className='mx-auto' src={"/Images/wp.png"} alt='WordPress Logo' width={300} height={120}></Image>
                    </div>
                    <div className="w-1/4 h-40 bg-gray-300 rounded-3xl p-8 flex items-center justify-center">
                        <Image className='mx-auto' src={"/Images/ts.png"} alt='TypeScript Logo' width={120} height={120}></Image>
                    </div>
                    <div className="w-1/4 h-40 bg-gray-300 rounded-3xl p-8 flex items-center justify-center">
                        <Image className='mx-auto' src={"/Images/js.png"} alt='JavaScript Logo' width={120} height={120}></Image>
                    </div>
                </div>
                <div className="w-full flex flex-row items-center gap-2">
                    <div className="w-2/4 h-40 bg-gray-300 rounded-3xl p-8 flex items-center justify-center">
                        <Image className='mx-auto' src={"/Images/tailwind.png"} alt='Tailwind Logo' width={300} height={120}></Image>
                    </div>
                    <div className="w-1/4 h-40 bg-gray-300 rounded-3xl p-8 flex items-center justify-center">
                        <Image className='mx-auto' src={"/Images/html.png"} alt='HTML Logo' width={120} height={120}></Image>
                    </div>
                    <div className="w-1/4 h-40 bg-gray-300 rounded-3xl p-8 flex items-center justify-center">
                        <Image className='mx-auto' src={"/Images/css.png"} alt='CSS Logo' width={120} height={120}></Image>
                    </div>
                </div>
            </section>      
        </>
    );
}