import Header from "@/components/Header";
import SideBar from "@/components/SideBar";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    return (
        <>
            <SideBar />
            <div className=" flex flex-col w-full md:ml-64">
                <Header />
                <main className="flex-1 overflow-y-auto p-6">
                    {children}
                </main>
            </div>
        </>
    );
}
