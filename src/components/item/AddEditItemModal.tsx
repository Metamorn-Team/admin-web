"use client";

import { useEffect, useState } from "react";
import Input from "../common/Input";
import Button from "../common/Button";
import ImageInput from "../common/ImageInput";
import Modal from "../common/Modal";

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

type Props = {
  item: Item | null; // null이면 추가, 있으면 수정
  onClose: () => void;
  onSave: (item: Item) => void;
};

const TYPE_OPTIONS = ["aura", "speech_bubble"];
const ITEM_TYPE_OPTIONS = [{ label: "일반", value: 0 }];
const GRADE_OPTIONS = [0, 1, 2, 3, 4, 5];

export default function AddEditItemModal({ item, onClose, onSave }: Props) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const [itemType, setItemType] = useState(0);
  const [keyName, setKeyName] = useState("");
  const [grade, setGrade] = useState(0);
  const [image, setImage] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);

  useEffect(() => {
    if (item) {
      setName(item.name);
      setDescription(item.description);
      setType(item.type);
      setItemType(item.itemType);
      setKeyName(item.key);
      setGrade(item.grade);
      setImage(item.image);
    }
  }, [item]);

  const handleSubmit = () => {
    const id = item?.id || crypto.randomUUID();
    const createdAt = item?.createdAt || new Date().toISOString();

    const newItem: Item = {
      id,
      name,
      description,
      type,
      itemType,
      key: keyName,
      grade,
      image: imageFile ? URL.createObjectURL(imageFile) : image,
      createdAt,
    };

    onSave(newItem);
  };

  return (
    <Modal
      isOpen={true}
      onClose={onClose}
      className="w-full max-w-lg space-y-4"
    >
      <h2 className="text-xl font-bold text-[#3e3226]">
        {item ? "아이템 수정" : "아이템 추가"}
      </h2>

      <div className="space-y-2">
        <label className="text-sm font-medium text-[#4c3b2b]">이름</label>
        <Input value={name} onChange={(e) => setName(e.target.value)} />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-[#4c3b2b]">설명</label>
        <Input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div className="flex gap-4">
        <div className="flex-1 space-y-2">
          <label className="text-sm font-medium text-[#4c3b2b]">타입</label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full p-2 rounded-md border border-[#bfae96] bg-[#f9f5ec] text-sm"
          >
            <option value="">선택하세요</option>
            {TYPE_OPTIONS.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>

        <div className="flex-1 space-y-2">
          <label className="text-sm font-medium text-[#4c3b2b]">
            아이템타입
          </label>
          <select
            value={itemType}
            onChange={(e) => setItemType(Number(e.target.value))}
            className="w-full p-2 rounded-md border border-[#bfae96] bg-[#f9f5ec] text-sm"
          >
            {ITEM_TYPE_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex gap-4">
        <div className="flex-1 space-y-2">
          <label className="text-sm font-medium text-[#4c3b2b]">Key</label>
          <Input value={keyName} onChange={(e) => setKeyName(e.target.value)} />
        </div>

        <div className="flex-1 space-y-2">
          <label className="text-sm font-medium text-[#4c3b2b]">등급</label>
          <select
            value={grade}
            onChange={(e) => setGrade(Number(e.target.value))}
            className="w-full p-2 rounded-md border border-[#bfae96] bg-[#f9f5ec] text-sm"
          >
            {GRADE_OPTIONS.map((g) => (
              <option key={g} value={g}>
                {g}등급
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-[#4c3b2b]">이미지</label>
        <ImageInput
          previewUrl={
            imageFile ? URL.createObjectURL(imageFile) : image || undefined
          }
          onChange={(file) => {
            setImageFile(file);
          }}
        />
      </div>

      <div className="flex justify-end gap-2 pt-4">
        <Button variant="ghost" onClick={onClose}>
          취소
        </Button>
        <Button onClick={handleSubmit}>
          {item ? "수정 완료" : "아이템 추가"}
        </Button>
      </div>
    </Modal>
  );
}
