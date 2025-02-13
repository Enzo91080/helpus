"use client"

import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'

const Unauthorized = () => {
  const router = useRouter()
   
  return (
    <section className="min-h-screen mx-auto flex flex-col align-center justify-center mt-5 max-w-screen-2xl gap-3">
      <div className="mt-5 p-5 flex flex-col
      align-center justify-center max-w-2xl mx-auto shadow-lg bg-white rounded">
        <p className="text-red-500 font-semibold">Vous n&apos;avez pas l&apos;autorisation d&apos;accéder à cette ressource.</p>
        <Button
          onClick={() => router.push("/")}
          className="mx-auto max-w-fit mt-2 bg-orange-800 hover:bg-orange-500 rounded px-4 py-2 text-white"
        >
            Retour
        </Button>
      </div>
    </section>
  )
}

export default Unauthorized