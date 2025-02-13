"use client"
import { Heart, HeartHandshake, Users } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { nextauthOptions } from "@/lib/nextauth-options"
import Link from 'next/link';
import Image from "next/image";

export default function Home() {
  const { data: session } = useSession();

  const stats = {
    donors: 150,
    beneficiaries: 75,
    donations: 250
  };

  return (
    <>
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

      <div className="min-h-screen-1/2 rounded">

        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto text-center">

            <div className="flex justify-center mb-8">
              <HeartHandshake className="w-16 h-16 text-hu-tertiary animate-pulse" />
            </div>
          
            <h1 className="text-5xl font-bold text-gray-800 mb-4">
            Bienvenue sur <em className="text-hu-tertiary">Help us</em>
            </h1>
          
            <p className="text-hu-tertiary mb-12">
            Ensemble, créons un monde plus solidaire
            </p>
          
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white rounded-lg shadow-lg p-6 transform transition hover:-translate-y-2">
                <div className="flex justify-center mb-4">
                  <Users className="w-12 h-12 text-hu-tertiary" />
                </div>
                <h3 className="text-3xl font-bold text-gray-800 mb-2">
                  {stats.donors}
                </h3>
                <p className="text-gray-600">Donateurs actifs</p>
              </div>
            
              <div className="bg-white rounded-lg shadow-lg p-6 transform transition hover:-translate-y-2">
                <div className="flex justify-center mb-4">
                  <Heart className="w-12 h-12 text-pink-500" />
                </div>
                <h3 className="text-3xl font-bold text-gray-800 mb-2">
                  {stats.beneficiaries}
                </h3>
                <p className="text-gray-600">Bénéficiaires</p>
              </div>
            
              <div className="bg-white rounded-lg shadow-lg p-6 transform transition hover:-translate-y-2">
                <div className="flex justify-center mb-4">
                  <HeartHandshake className="w-12 h-12 text-purple-500" />
                </div>
                <h3 className="text-3xl font-bold text-gray-800 mb-2">
                  {stats.donations}
                </h3>
                <p className="text-gray-600">Donations réalisées</p>
              </div>
            </div>

            <div className="mt-12">
              <div className="flex gap-2 justify-center">
            
                {session ? (
                  <>
                    <div className="flex flex-col">
                      <p className="text-hu-tertiary my-3">Vous êtes admin ?</p>
                      <Link 
                        href="/dashboard"
                        className="z-10 inline-block px-6 py-3 bg-hu-tertiary text-white
                           rounded-lg hover:bg-hu-black transition-colors
                           text-lg font-medium shadow-sm hover:shadow-md"
                      >
                  Accéder au Tableau de Bord
                      </Link>
                    </div>
                  </>
                ) : (
                  <div>
                    <Link className={`z-10 inline-block px-6 py-3 bg-hu-secondary text-white 
                            rounded-lg hover:bg-hu-black transition-colors 
                            text-lg font-medium shadow-sm hover:shadow-md`} href="/signin">
                     Se Connecter
                    </Link>
                  </div>
                )}
                <div className="flex flex-col justify-end">
                  <Link 
                    href="/join"
                    className="z-10 inline-block px-6 py-3 bg-orange-500 text-white
                           rounded-lg hover:bg-orange-600 transition-colors 
                           text-lg font-medium shadow-sm hover:shadow-md"
                  >
                  Agir avec nous
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}