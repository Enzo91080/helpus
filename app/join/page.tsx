import Image from "next/image";

const page = () => {
  return (
    <main className="flex flex-col align-center justify-center mx-auto min-h-screen bg-hu-primary p-6">

      <div className="absolute inset-0 z-0">
        <Image
          src="/hands.jpg"
          alt="Background Hands"
          layout="fill"
          objectFit="cover"
          objectPosition="center"
          className="opacity-10"
          priority
        />
      </div>
      <div className="mx-auto max-w-4xl bg-hu-tertiary shadow-sm rounded-2xl p-8">
        <h1 className="text-3xl font-bold text-white mb-4">Rejoindre l&apos;association:</h1>
        <p className="text-white mb-6">
            Pour rejoindre notre association, suivez les étapes ci-dessous :
        </p>
        <ol className="list-decimal text-white list-inside space-y-2">
          <li>Rendez-vous dans une antenne locale pour échanger avec nos adherents</li>
          <li>Envoyez les documents requis par email.</li>
          <li>Réglez la cotisation annuelle.</li>
          <li>Attendez la confirmation d&apos;adhésion par email.</li>
        </ol>
        <p className="text-hu-primary mt-4">
            Pour toute question, n&apos;hésitez pas à nous contacter: helpus@gmail.com
        </p>
      </div>
    </main>
  )
}

export default page