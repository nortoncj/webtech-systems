import React from 'react'
import SideMenu from "@/components/admin/SideMenu";
import { createClient } from "@lib/supabase/server";
import {redirect} from 'next/navigation'

export default async function AdminLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
        redirect("/admin/login");
    }
  return (
      <div className="wtn flex gap-4">
          <SideMenu email={user.email!} />
          <main className="main">
              {children}
              </main>
          
      </div>
  )
}
