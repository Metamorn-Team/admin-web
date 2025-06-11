import { useState } from "react";
import Table from "../common/Table";
import Button from "../common/Button";
import Modal from "../common/Modal";
import AddEditProductModal from "./AddEditProductModal";

const mockItems = [
  { id: "1", name: "강화검" },
  { id: "2", name: "방패" },
];

export default function ProductPanel() {
  const [products, setProducts] = useState<any[]>([]);
  const [editProduct, setEditProduct] = useState<any | null>(null);
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

      <Table
        headers={["이름", "가격", "아이템", "이미지", "액션"]}
        rows={products.map((p) => [
          p.name,
          `₩${p.price.toLocaleString()}`,
          mockItems.find((i) => i.id === p.itemId)?.name || "-",
          <img
            src={p.coverImage}
            className="w-12 h-12 object-contain cursor-pointer"
            onClick={() => setPreviewImage(p.coverImage)}
          />,
          <div className="flex gap-2">
            <Button
              variant="ghost"
              onClick={() => {
                setEditProduct(p);
                setIsModalOpen(true);
              }}
            >
              수정
            </Button>
            <Button
              variant="ghost"
              onClick={() =>
                setProducts(products.filter((pr) => pr.id !== p.id))
              }
            >
              삭제
            </Button>
          </div>,
        ])}
      />

      {isModalOpen && (
        <AddEditProductModal
          product={editProduct}
          items={mockItems}
          onClose={() => setIsModalOpen(false)}
          onSave={(newProduct) => {
            setProducts((prev) => {
              const exists = prev.find((p) => p.id === newProduct.id);
              if (exists) {
                return prev.map((p) =>
                  p.id === newProduct.id ? newProduct : p
                );
              }
              return [...prev, newProduct];
            });
            setIsModalOpen(false);
          }}
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
