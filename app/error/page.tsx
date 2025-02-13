"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"

const Error = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const errMsg = searchParams.get("error")
  return (
    <section className="mt-5 max-w-screen-2xl mx-auto">
      <div className="p-5 flex flex-col align-center justify-center mt-50 max-w-2xl mx-auto bg-white rounded">
        <div>
          <p className={"text-hu-black"}>Il y a eu une erreur avec l&apos;authentification</p>
          <p className="text-hu-black font-bold">Erreur: </p>
          <span className="text-hu-black">{errMsg}</span>
        </div>
        <Button
          onClick={() => router.back()}
          className="mx-auto w-auto mt-2"
          variant="destructive"
        >
                Réessayer
        </Button>
      </div>

    </section>
  )
}

export default Error