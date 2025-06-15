import Button from "./Button";

export default function PaginationController({
  page,
  totalPages,
  onPageChange,
}: {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}) {
  return (
    <div className="flex justify-center items-center mt-4 gap-2">
      <Button
        variant="ghost"
        disabled={page === 1}
        onClick={() => onPageChange(page - 1)}
      >
        이전
      </Button>
      <span>
        {page} / {totalPages}
      </span>
      <Button
        variant="ghost"
        disabled={page === totalPages}
        onClick={() => onPageChange(page + 1)}
      >
        다음
      </Button>
    </div>
  );
}
