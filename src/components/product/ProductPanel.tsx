import { useState } from "react";
import Table from "../common/Table";
import Button from "../common/Button";
import Modal from "../common/Modal";
import AddEditProductModal from "./AddEditProductModal";
import { useGetAllProduct } from "../hook/query/useGetAllProduct";
import type { ProductItem } from "lia-admin-type";

export default function ProductPanel() {
  const [editProduct, setEditProduct] = useState<ProductItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">상품 목록</h2>
        <Button
          onClick={() => {
            setEditProduct(null);
            setIsModalOpen(true);
          }}
        >
          + 상품 추가
        </Button>
      </div>

      <ProductTable
        openModal={() => setIsModalOpen(true)}
        setEditProduct={setEditProduct}
        setPreviewImage={setPreviewImage}
      />

      {isModalOpen && (
        <AddEditProductModal
          product={editProduct}
          onClose={() => setIsModalOpen(false)}
        />
      )}

      {previewImage && (
        <Modal isOpen={true} onClose={() => setPreviewImage(null)}>
          <img
            src={previewImage}
            alt="미리보기"
            className="max-w-full max-h-[80vh] object-contain"
          />
        </Modal>
      )}
    </>
  );
}

interface ProductTableProps {
  setPreviewImage: React.Dispatch<React.SetStateAction<string | null>>;
  setEditProduct: React.Dispatch<React.SetStateAction<ProductItem | null>>;
  openModal: () => void;
}

function ProductTable({
  setEditProduct,
  setPreviewImage,
  openModal,
}: ProductTableProps) {
  const { data: products = [] } = useGetAllProduct();

  return (
    <Table
      headers={[
        "NUM",
        "이름",
        "종류",
        "설명",
        "가격",
        "아이템",
        "이미지",
        "추가일",
        "액션",
      ]}
      rows={products.map((p, i) => [
        i + 1,
        p.name,
        p.type,
        p.description,
        `${p.price.toLocaleString()}G`,
        p.itemName,
        <img
          key={p.id}
          src={p.coverImage}
          className="w-12 h-12 object-contain cursor-pointer"
          onClick={() => setPreviewImage(p.coverImage)}
        />,
        new Date(p.createdAt).toLocaleDateString(),
        <div className="flex gap-2">
          <Button
            variant="ghost"
            onClick={() => {
              setEditProduct(p);
              openModal();
            }}
          >
            수정
          </Button>
          <Button variant="ghost" onClick={() => alert("삭제 로직 필요")}>
            삭제
          </Button>
        </div>,
      ])}
    />
  );
}
