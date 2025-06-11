import { Suspense, useState } from "react";
import ImagePreviewModal from "../common/ImagePreviewModal";
import Table from "../common/Table";
import Button from "../common/Button";
import AddEditItemModal from "./AddEditItemModal";
import { useGetAllItem } from "../hook/query/useGetAllItem";

type Item = {
  id: string;
  name: string;
  description: string;
  itemType: string;
  key: string;
  grade: string;
  image: string;
  createdAt: string;
};

export default function ItemPanel() {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [editItem, setEditItem] = useState<Item | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddClick = () => {
    setEditItem(null);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleSave = (newItem: Item) => {
    // TODO: 실제 API 호출로 대체 필요
    console.log("저장됨:", newItem);
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
        <AddEditItemModal
          item={editItem}
          onClose={handleModalClose}
          onSave={handleSave}
        />
      )}

      <Suspense fallback={<h2>로드 중..</h2>}>
        <ItemTable
          setPreviewUrl={setPreviewUrl}
          setEditItem={setEditItem}
          openModal={() => setIsModalOpen(true)}
        />
      </Suspense>
    </>
  );
}

interface ItemTableProps {
  setPreviewUrl: React.Dispatch<React.SetStateAction<string | null>>;
  setEditItem: React.Dispatch<React.SetStateAction<Item | null>>;
  openModal: () => void;
}

function ItemTable({ setPreviewUrl, setEditItem, openModal }: ItemTableProps) {
  const { data: items } = useGetAllItem();

  const handleDelete = (id: string) => {
    if (confirm("정말 삭제하시겠습니까?")) {
      // TODO: API 삭제 로직
      console.log("삭제됨:", id);
    }
  };

  return (
    <Table
      headers={[
        "NUM",
        "이름",
        "설명",
        "종류",
        "Key",
        "등급",
        "이미지",
        "생성일",
        "액션",
      ]}
      rows={items.map((item, i) => [
        i,
        item.name,
        item.description,
        item.type,
        item.key,
        item.grade.toString(),
        <img
          key={item.id}
          src={item.image}
          alt={item.name}
          className="w-12 h-12 object-contain cursor-pointer"
          onClick={() => setPreviewUrl(item.image)}
        />,
        new Date(item.createdAt).toLocaleDateString(),
        <div className="flex gap-2">
          <Button
            variant="ghost"
            onClick={() => {
              setEditItem({ ...item, itemType: item.type });
              openModal();
            }}
          >
            수정
          </Button>
          <Button variant="ghost" onClick={() => handleDelete(item.id)}>
            삭제
          </Button>
        </div>,
      ])}
    />
  );
}
