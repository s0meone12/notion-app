'use client'
import { Spinner } from "@/components/spinner";
import { Navigation } from "./_components/navigation";
import { redirect } from "next/navigation";
import { useConvexAuth } from "convex/react";

const MainLayout = ({children}: {children: React.ReactNode}) => {
    const {isAuthenticated, isLoading} = useConvexAuth();

    if(isLoading){
        return(
            <div className="min-h-screen flex items-center justify-center">
                <Spinner size="lg"/>
            </div>
        )
    }

    if(!isAuthenticated){
        return redirect("/")
    }
    
    return ( 
        <div className="h-full flex dark:bg-[#1F1F1F]">
            <Navigation />
            <main className="flex-1 h-full overflow-y-auto">
                {children}
            </main>
        </div>
     );
}
 
export default MainLayout;