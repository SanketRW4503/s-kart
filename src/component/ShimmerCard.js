


// Shimmer Component
export default function ShimmerCard() {
  return (

    <div className="flex flex-wrap justify-evenly">
      {
        Array(20).fill('').map((e, index) => {
          return <section className='w-[300px]  m-[10px] ' key={index}>
            <div className=' bg-slate h-[200px] animate-pulse '></div>
           
      
          </section>
        })
      }
    </div>

  )
}
