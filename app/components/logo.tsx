import { LogoMark } from './icons'
import Link from 'next/link'

const Logo = () => {
    return (
        <Link href="/" className="flex items-center gap-2! no-underline">
            <LogoMark />
            <span className="text-base font-semibold tracking-wide text-white/90">
                tab<span className="text-accent">saver</span>
            </span>
        </Link>
    )
}

export default Logo