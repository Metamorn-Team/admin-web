import { Suspense, useState } from "react";
import ImagePreviewModal from "../common/ImagePreviewModal";
import Table from "../common/Table";
import Button from "../common/Button";
import { useGetAllPromotionProduct } from "../hook/query/useGetAllPromotionProduct";
import AddEditPromotionProductModal from "./AddEditPromotionProductModal";

export interface PromotionProduct {
  id?: string;
  productId: string;
  promotionId: string;
  discountRate: number;
}

export default function PromotionProductPanel() {
  const [promotionProduct, setPromotionProduct] =
    useState<PromotionProduct | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddClick = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">아이템 목록</h2>
        <Button onClick={handleAddClick}>+ 아이템 추가</Button>
      </div>

      {previewUrl && (
        <ImagePreviewModal
          src={previewUrl}
          onClose={() => setPreviewUrl(null)}
        />
      )}

      {isModalOpen && (
        <AddEditPromotionProductModal
          initialData={promotionProduct}
          onClose={handleModalClose}
        />
      )}

      <Suspense fallback={<h2>로드 중..</h2>}>
        <PromotionProductTable
          setPreviewUrl={setPreviewUrl}
          setPromotionProduct={setPromotionProduct}
          openModal={() => setIsModalOpen(true)}
        />
      </Suspense>
    </>
  );
}

interface PromotionProductTableProps {
  setPreviewUrl: React.Dispatch<React.SetStateAction<string | null>>;
  setPromotionProduct: React.Dispatch<
    React.SetStateAction<PromotionProduct | null>
  >;
  openModal: () => void;
}

function PromotionProductTable({
  setPreviewUrl,
  setPromotionProduct,
  openModal,
}: // setEditItem,
// openModal,
PromotionProductTableProps) {
  const { promotionProducts } = useGetAllPromotionProduct();

  // const handleDelete = (id: string) => {
  //   if (confirm("정말 삭제하시겠습니까?")) {
  //     // TODO: API 삭제 로직
  //     console.log("삭제됨:", id);
  //   }
  // };

  return (
    <Table
      headers={[
        "NUM",
        "상품명",
        "이미지",
        "프로모션명",
        "원가",
        "할인가",
        "프로모션 상태",
        "액션",
      ]}
      rows={promotionProducts.map((p, i) => [
        i + 1,
        p.productName,
        <img
          key={p.productId}
          src={p.productImage}
          alt={p.productName}
          className="w-12 h-12 object-contain cursor-pointer"
          onClick={() => setPreviewUrl(p.productImage)}
        />,
        p.promotionName,
        p.originPrice,
        p.saledPrice,
        p.promotionStatus,
        <div className="flex gap-2">
          <Button
            variant="ghost"
            onClick={() => {
              setPromotionProduct({
                id: p.id,
                discountRate: p.discountRate,
                productId: p.productId,
                promotionId: p.promotionId,
              });
              openModal();
            }}
          >
            수정
          </Button>
          <Button
            variant="ghost"
            // onClick={() => handleDelete(item.id)}
          >
            삭제
          </Button>
        </div>,
      ])}
    />
  );
}
