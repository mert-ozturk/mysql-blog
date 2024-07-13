import CollectionPage from "@/components/CollectionPage"
import DocumentPage from "./document/page"
import Deneme from "./deneme/page"



const Home = () => {
  return (
 
      <div className="flex flex-col items-center gap-10 py-8 px-5" >

  <div className="flex flex-wrap items-center justify-center gap-8"></div>
<header className="max-w-2xl">
  <h1 className="text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100">Things I’ve made trying to put my dent in the universe.</h1>
  <p className="mt-6 text-base text-zinc-600 dark:text-zinc-400">I’ve worked on tons of little projects over the years but these are the ones that I’m most proud of. Many of them are open-source, so if you see something that piques your interest, check out the code and contribute if you have ideas for how it can be improved.</p></header>
<Deneme />
       </div>
  )
}

export default Home