import { Typography } from "@/components";

export default function Dashboard() {
    return <div className="flex flex-col h-20 shadow-xl" >
        <header className="bg-white h-20">
            <Typography variant="h1" className="text-black text-4xl md:text-5xl lg:text-7xl font-bold md:font-extrabold">oda.com</Typography>

        </header>
        <div className="flex">
            <aside className="w-4/12 bg-dashboard-dark flex flex-col gap-5">
                <div>
                    <Typography variant="h3">Categories</Typography>
                </div>
                <div>
                    <Typography variant="h3">VENDOR NAME</Typography>
                </div>

                <ul className="flex flex-col gap-2">
                    {
                        "Categories Products Banners Orders Account".split(" ").
                            map(item => <li key={item}>{item}</li>)
                    }
                </ul>
            </aside>



        </div>

    </div>
}

