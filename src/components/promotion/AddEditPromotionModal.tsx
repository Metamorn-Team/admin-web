"use client";

import { useEffect, useState } from "react";
import Modal from "../common/Modal";
import Input from "../common/Input";
import Select from "../common/Select";
import Button from "../common/Button";
import type { PromotionType } from "lia-admin-type/dist/src/types/promotion";
import { fromZonedTime, toZonedTime, format } from "date-fns-tz";
import { useAddPromotion } from "../hook/query/useAddPromotion";
import { QUERY_KEY as ALL_PROMOTION_QUERY_KEY } from "../hook/query/useGetAllPromotion";
import { useQueryClient } from "@tanstack/react-query";

const PROMOTION_TYPE_OPTIONS: { label: string; value: PromotionType }[] = [
  { label: "런칭 기념", value: "LAUNCH" },
];

type Promotion = {
  id: string;
  name: string;
  type: PromotionType;
  description: string;
  startedAt: string;
  endedAt: string;
};

type Props = {
  promotion: Promotion | null;
  onClose: () => void;
};

export default function AddEditPromotionModal({ promotion, onClose }: Props) {
  const queryClient = useQueryClient();
  const { mutate: addPromotionMutate } = useAddPromotion(() => {
    queryClient.invalidateQueries({
      queryKey: [ALL_PROMOTION_QUERY_KEY],
    });
  });

  const [name, setName] = useState("");
  const [type, setType] = useState<PromotionType>("LAUNCH");
  const [description, setDescription] = useState("");
  const [startedAt, setStartedAt] = useState("");
  const [endedAt, setEndedAt] = useState("");

  useEffect(() => {
    if (promotion) {
      setName(promotion.name);
      setType(promotion.type);
      setDescription(promotion.description);
      setStartedAt(toDatetimeLocal(promotion.startedAt));
      setEndedAt(toDatetimeLocal(promotion.endedAt));
    }
  }, [promotion]);

  const handleSubmit = () => {
    const newPromotion: Promotion = {
      id: promotion?.id || crypto.randomUUID(),
      name,
      type,
      description,
      startedAt: toUTCISOStringFromKST(startedAt),
      endedAt: toUTCISOStringFromKST(endedAt),
    };
    console.log(newPromotion);
    addPromotionMutate(newPromotion);
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
        onChange={(val) => setType(val as PromotionType)}
        options={PROMOTION_TYPE_OPTIONS}
        placeholder="타입 선택"
      />
      <Input
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="간단 설명"
      />
      <Input
        type="datetime-local"
        value={startedAt}
        onChange={(e) => setStartedAt(e.target.value)}
        placeholder="시작일"
      />
      <Input
        type="datetime-local"
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

// 한국 시간(datetime-local) → UTC ISO string
function toUTCISOStringFromKST(localInput: string) {
  const utcDate = fromZonedTime(localInput, "Asia/Seoul");
  return utcDate.toISOString();
}

// UTC ISO string → datetime-local string (한국 시간 기준)
function toDatetimeLocal(utcISOString: string) {
  const zoned = toZonedTime(new Date(utcISOString), "Asia/Seoul");
  return format(zoned, "yyyy-MM-dd'T'HH:mm");
}
