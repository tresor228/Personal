import Nav from "../components/Nav";

export default function PortfolioLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="relative w-full overflow-x-hidden">
            <Nav />
            <main className="w-full overflow-hidden">{children}</main>
        </div>
    );
}
