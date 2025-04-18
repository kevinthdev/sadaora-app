interface PaginationProps {
  setPage: React.Dispatch<React.SetStateAction<number>>;
  total: number;
  page: number;
}

const Pagination = ({ setPage, total, page }: PaginationProps) => {
  return (
    <div className="flex justify-center items-center gap-4 my-8">
      <button
        className="cursor-pointer disabled:text-gray-600 disabled:cursor-not-allowed"
        onClick={() => setPage((p: number) => Math.max(1, p - 1))}
        disabled={page === 1}
      >
        Previous
      </button>
      <span className="text-gray-700 font-medium">
        Page {page} of {Math.ceil(total / 5)}
      </span>
      <button
        className="cursor-pointer disabled:text-gray-600 disabled:cursor-not-allowed"
        onClick={() => setPage((p) => Math.min(total, p + 1))}
        disabled={page === Math.ceil(total / 5)}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
