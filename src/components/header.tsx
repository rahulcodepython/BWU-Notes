import Link from "next/link";

const Header = () => {
    return (
        <header className="sticky top-0 z-50 bg-white shadow-sm">
            <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                <div className="flex items-center space-x-2">
                    <i className="fas fa-book-open text-darkgreen-600 text-2xl"></i>
                    <span className="text-xl font-bold text-gray-800">NotesHub</span>
                </div>
                <nav className="flex space-x-8">
                    <Link href="/" className="text-gray-600 hover:text-darkgreen-600 transition">Home</Link>
                    <a href="https://rahulcodepython.in/" target="_blank" className="text-gray-600 hover:text-darkgreen-600 transition">About</a>
                </nav>
            </div>
        </header>
    );
};

export default Header;