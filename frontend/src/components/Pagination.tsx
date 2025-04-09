interface PaginationProps {
    currentPage: number;
    totalPages: number;
    pageSize: number;
    onPageChange: (newPage: number) => void;
    onPageSizeChange: (newSize: number) => void;
}

const Pagination = ({
    currentPage,
    totalPages,
    pageSize,
    onPageChange,
    onPageSizeChange,
}: PaginationProps) => {
    const visiblePages = 5;
    const startPage = Math.max(1, currentPage - Math.floor(visiblePages / 2));
    const endPage = Math.min(totalPages, startPage + visiblePages - 1);
    return (
        <div className="flex flex-col items-center mt-4">
            <div className="flex items-center justify-center space-x-2">
                <button
                    disabled={currentPage === 1}
                    onClick={() => onPageChange(currentPage - 1)}
                    className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition"
                >
                    Previous
                </button>

                {Array.from({ length: endPage - startPage + 1 }, (_, i) => {
                    const page = startPage + i;
                    return (
                        <button
                            key={page}
                            onClick={() => onPageChange(page)}
                            disabled={currentPage === page}
                            className={`px-4 py-2 border border-gray-300 rounded hover:bg-gray-100 transition ${
                                currentPage === page
                                    ? 'bg-blue-500 text-white'
                                    : 'bg-white text-gray-700'
                            }`}
                        >
                            {page}
                        </button>
                    );
                })}

                <button
                    disabled={currentPage === totalPages}
                    onClick={() => onPageChange(currentPage + 1)}
                    className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition"
                >
                    Next
                </button>
            </div>

            <div className="mt-4">
                <label className="flex items-center space-x-2">
                    <span>Results Per Page:</span>
                    <select
                        value={pageSize}
                        onChange={(p) => {
                            onPageSizeChange(Number(p.target.value));
                            onPageChange(1);
                        }}
                        className="px-2 py-1 border border-gray-300 rounded"
                    >
                        <option value="4">4</option>
                        <option value="8">8</option>
                        <option value="12">12</option>
                        <option value="16">16</option>
                        <option value="20">20</option>
                    </select>
                </label>
            </div>
        </div>
    );
};

export default Pagination;
