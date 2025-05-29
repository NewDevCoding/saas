"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { use } from 'react'
import { cn } from '@/lib/utils';

const NavItems = () => {

    const navItems = [{label: 'Home', href: '/'}, {label: 'Companions', href: '/companions'}, {label: 'My Journey', href: '/my-journey'}];

    const pathname = usePathname();

  return (
    <nav className='flex items-center gap-4'>
        {navItems.map(({ label, href }) => (
            <Link 
                href={href} 
                key={label} 
                className={cn(pathname === href && 'text-primary font-semibold')}
                
            >{label}</Link>
        ))}
    </nav>
  )
}

export default NavItems