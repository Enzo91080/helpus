import React from 'react'
import Link from 'next/link'

const Footer = () => {
  return (
    <footer className="static bottom-0 w-full bg-jb-primary bg-opacity-15 text-black">
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 py-6">
        {/* Section 1: Contact */}
        <div className="space-y-3">
          <h2 className="text-base font-semibold font-yusei">HelpUs</h2>
          <p className="text-sm">5 rue des Oliviers, Evry-Courcouronnes</p>
          <p className="text-sm">91080, France</p>
          <a href="tel:0630578950" className="text-blue-400 text-sm hover:underline">06 30 57 89 50</a>
        </div>

        {/* Section 2: Horaires */}
        <div className="space-y-3">
          <h2 className="text-base font-semibold font-yusei">Heures d&apos;ouverture</h2>
          <ul className="space-y-1 font-antic text-sm">
            <li><span className="font-semibold">Lun, Mer, Ven:</span> 10h - 19h</li>
            <li><span className="font-semibold">Jeu:</span> 10h - 14h</li>
            <li><span className="font-semibold">Sam:</span> 10h - 16h</li>
          </ul>
        </div>

        {/* Section 3: À propos */}
        {/* <div className="space-y-3">
          <h2 className="text-base font-semibold font-yusei">À propos</h2>
          <ul className="flex flex-col space-y-2 font-antic text-sm">
            <li>
              <Link
                href=""
                className="footer-link"
                target="_blank"
                >
                Charte de confidentialité
              </Link>
            </li>
            <li>
            <Link
                href=""
                className="footer-link"
                target="_blank"
                >
                Charte de confidentialité
              </Link>
            </li>
            <li>
            <Link
                href=""
                className="footer-link"
                target="_blank"
                >
                Charte de confidentialité
              </Link>
            </li>
          </ul>
        </div> */}
      </div>

      {/* Section Footer Bas */}
      <div className="py-3 border-t border-gray-300 text-center text-gray-500 text-xs">
        <p>&copy; 2024 HelpUs. Tous droits réservés.</p>
      </div>
    </footer>
  )
}

export default Footer
