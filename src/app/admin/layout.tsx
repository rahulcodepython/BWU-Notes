"use client"
import React from 'react'
import { usePathname, useRouter } from 'next/navigation';

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
    const value = process.env.NEXT_PUBLIC_SECREAT_TOKEN_KEY!;

    const [loading, setLoading] = React.useState(true)

    const router = useRouter();
    const pathname = usePathname();

    React.useEffect(() => {
        const token = localStorage.getItem("token")

        if (token === value) {
            if (pathname === '/admin/login') {
                router.push('/admin')
                return
            }
        } else {
            if (pathname !== '/admin/login') {
                router.push('/admin/login')
                return
            }
        }

        setLoading(false)
    }, [router, pathname, value])

    return (
        loading ? <main className='flex flex-col flex-1 w-full h-full justify-center items-center'>
            Loading ...
        </main> : <main className='flex flex-col flex-1 w-full h-full'>
            {children}
        </main>
    )
}

export default AdminLayout