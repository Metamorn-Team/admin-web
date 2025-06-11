"use client";

import { useEffect, useState } from "react";
import Modal from "../common/Modal";
import Input from "../common/Input";
import Select from "../common/Select";
import Button from "../common/Button";

const PROMOTION_TYPE_OPTIONS = [
  { label: "시즌 한정", value: "season" },
  { label: "런칭 기념", value: "launch" },
];

type Promotion = {
  id: string;
  name: string;
  type: string;
  description: string;
  startedAt: string;
  endedAt: string;
};

type Props = {
  promotion: Promotion | null;
  onClose: () => void;
  onSave: (promotion: Promotion) => void;
};

export default function AddEditPromotionModal({
  promotion,
  onClose,
  onSave,
}: Props) {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  const [startedAt, setStartedAt] = useState("");
  const [endedAt, setEndedAt] = useState("");

  useEffect(() => {
    if (promotion) {
      setName(promotion.name);
      setType(promotion.type);
      setDescription(promotion.description);
      setStartedAt(promotion.startedAt);
      setEndedAt(promotion.endedAt);
    }
  }, [promotion]);

  const handleSubmit = () => {
    const newPromotion: Promotion = {
      id: promotion?.id || crypto.randomUUID(),
      name,
      type,
      description,
      startedAt,
      endedAt,
    };
    onSave(newPromotion);
  };

  return (
    <Modal
      isOpen={true}
      onClose={onClose}
      className="w-full max-w-lg space-y-4"
    >
      <h2 className="text-xl font-bold text-[#3e3226]">
        {promotion ? "프로모션 수정" : "프로모션 추가"}
      </h2>

      <Input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="프로모션명"
      />
      <Select
        value={type}
        onChange={(val) => setType(String(val))}
        options={PROMOTION_TYPE_OPTIONS}
        placeholder="타입 선택"
      />
      <Input
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="간단 설명"
      />
      <Input
        type="date"
        value={startedAt}
        onChange={(e) => setStartedAt(e.target.value)}
        placeholder="시작일"
      />
      <Input
        type="date"
        value={endedAt}
        onChange={(e) => setEndedAt(e.target.value)}
        placeholder="종료일"
      />

      <div className="flex justify-end gap-2">
        <Button variant="ghost" onClick={onClose}>
          취소
        </Button>
        <Button onClick={handleSubmit}>
          {promotion ? "수정 완료" : "추가 완료"}
        </Button>
      </div>
    </Modal>
  );
}
