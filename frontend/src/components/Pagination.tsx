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
        <div className="flex item-center justify-center mt-4">
            <button
                disabled={currentPage === 1}
                onClick={() => onPageChange(currentPage - 1)}
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
                    >
                        {page}
                    </button>
                );
            })}

            <button
                disabled={currentPage === totalPages}
                onClick={() => onPageChange(currentPage + 1)}
            >
                Next
            </button>
            <br />
            <br />
            <label>
                Results Per Page:
                <select
                    value={pageSize}
                    onChange={(p) => {
                        onPageSizeChange(Number(p.target.value));
                        onPageChange(1);
                    }}
                >
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="20">20</option>
                </select>
            </label>
        </div>
    );
};

export default Pagination;
