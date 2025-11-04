import { MdSearch } from 'react-icons/md';

type ProductSearchBarProps = {
    searchValue: string;
    setSearchValue: (value: string) => void;
    searchAction: () => void;
};

export const ProductSearchBar = ({
    searchValue,
    setSearchValue,
    searchAction,
}: ProductSearchBarProps) => {
    return (
        <div className="p-3 bg-slate-50 rounded-lg shadow-lg mb-5 w-96 ">
            <div className="flex items-center">
                <input
                    className="p-3 outline-none shadow-lg rounded-lg bg-white text-center w-full"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    placeholder="Ingrese nombre del producto"
                />
                <button
                    className="p-3 ml-3 text-xl shadow-lg rounded-lg bg-indigo-600 text-white cursor-pointer hover:scale-105"
                    onClick={searchAction}>
                    <MdSearch />
                </button>
            </div>
        </div>
    );
};
