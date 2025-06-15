"use client";

import { useEffect, useState } from "react";
import Input from "../common/Input";
import Button from "../common/Button";
import ImageInput from "../common/ImageInput";
import Modal from "../common/Modal";
import type { Item } from "./ItemPanel";
import type { ItemGrade, ItemType } from "lia-admin-type/dist/src/types/item";
import { getPresignedUrl, uploadImage } from "../../api/file";
import { BUCKET_PATH, CDN_URL } from "../../constants/url";

type Props = {
  item: Item | null; // null이면 추가, 있으면 수정
  onClose: () => void;
  onSave: (item: Item) => void;
};

const ITEM_TYPE_OPTIONS = [
  { label: "오라", value: "AURA" },
  { label: "말풍선", value: "SPEECH_BUBBLE" },
];
const GRADE_OPTIONS = ["NORMAL", "RARE", "UNIQUE", "EPIC"];

export default function AddEditItemModal({ item, onClose, onSave }: Props) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [itemType, setItemType] = useState<ItemType>("AURA");
  const [keyName, setKeyName] = useState("");
  const [grade, setGrade] = useState<ItemGrade>("NORMAL");
  const [image, setImage] = useState("");

  useEffect(() => {
    if (item) {
      setName(item.name);
      setDescription(item.description);
      setItemType(item.itemType);
      setKeyName(item.key);
      setGrade(item.grade);
      setImage(item.image);
    }
  }, [item]);

  const handleImageChange = async (file: File | null) => {
    try {
      const data = await getPresignedUrl({
        path: BUCKET_PATH[itemType],
        name: file?.name || crypto.randomUUID(),
      });
      const { presignedUrl, key } = data;

      if (!file) {
        console.error("file not found");
        return;
      }

      await uploadImage(presignedUrl, file);

      setImage(`${CDN_URL}/${key}`);
    } catch (e) {
      console.error(e);
      return;
    }
  };

  const handleSubmit = () => {
    const id = item?.id || crypto.randomUUID();
    const createdAt = item?.createdAt || new Date().toISOString();

    const newItem: Item = {
      id,
      name,
      description,
      itemType,
      key: keyName,
      grade,
      image,
      createdAt,
    };

    console.log(newItem);
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
          <label className="text-sm font-medium text-[#4c3b2b]">
            아이템타입
          </label>
          <select
            value={itemType}
            onChange={(e) => setItemType(e.target.value as ItemType)}
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
            onChange={(e) => setGrade(e.target.value as ItemGrade)}
            className="w-full p-2 rounded-md border border-[#bfae96] bg-[#f9f5ec] text-sm"
          >
            {GRADE_OPTIONS.map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-[#4c3b2b]">이미지</label>
        <ImageInput previewUrl={image} onChange={handleImageChange} />
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
