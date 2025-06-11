import { useState } from "react";
import ImagePreviewModal from "../common/ImagePreviewModal";
import Table from "../common/Table";
import Button from "../common/Button";
import AddEditItemModal from "./AddEditItemModal";

type Item = {
  id: string;
  name: string;
  description: string;
  type: string;
  itemType: number;
  key: string;
  grade: number;
  image: string;
  createdAt: string;
};

const mockItems: Item[] = [
  {
    id: "1",
    name: "골드 옐로우",
    description: "골드 옐로우 색상의 오라",
    type: "aura",
    itemType: 0,
    key: "gold-yellow-aura",
    grade: 2,
    image: "https://cdn.metamorn.com/product/aura/gold-yellow.png",
    createdAt: "2024-06-01T12:00:00Z",
  },
  {
    id: "2",
    name: "토마토",
    description: "토마토 색상의 오라",
    type: "aura",
    itemType: 1,
    key: "tomato-aura",
    grade: 3,
    image: "https://cdn.metamorn.com/product/aura/tomato.png",
    createdAt: "2024-06-05T08:00:00Z",
  },
];

export default function ItemPanel() {
  const [items, setItems] = useState<Item[]>(mockItems);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [editItem, setEditItem] = useState<Item | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDelete = (id: string) => {
    if (confirm("정말 삭제하시겠습니까?")) {
      setItems((prev) => prev.filter((item) => item.id !== id));
    }
  };

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">아이템 목록</h2>
        <Button
          onClick={() => {
            setEditItem(null);
            setIsModalOpen(true);
          }}
        >
          + 아이템 추가
        </Button>
      </div>

      <Table
        headers={[
          "ID",
          "이름",
          "설명",
          "타입",
          "itemType",
          "Key",
          "등급",
          "이미지",
          "생성일",
          "액션",
        ]}
        rows={items.map((item) => [
          item.id,
          item.name,
          item.description,
          item.type,
          item.itemType.toString(),
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
                setEditItem(item);
                setIsModalOpen(true);
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

      {previewUrl && (
        <ImagePreviewModal
          src={previewUrl}
          onClose={() => setPreviewUrl(null)}
        />
      )}

      {isModalOpen && (
        <AddEditItemModal
          item={editItem}
          onClose={() => setIsModalOpen(false)}
          onSave={(newItem) => {
            setItems((prev) => {
              const exists = prev.find((i) => i.id === newItem.id);
              if (exists) {
                return prev.map((i) => (i.id === newItem.id ? newItem : i));
              }
              return [...prev, newItem];
            });
            setIsModalOpen(false);
          }}
        />
      )}
    </>
  );
}
