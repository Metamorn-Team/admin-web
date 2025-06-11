"use client";

import { useState } from "react";
import Table from "../common/Table";
import Button from "../common/Button";
import AddEditPromotionModal from "./AddEditPromotionModal";

export default function PromotionPanel() {
  const [promotions, setPromotions] = useState<any[]>([]);
  const [editPromotion, setEditPromotion] = useState<any | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">프로모션 목록</h2>
        <Button
          onClick={() => {
            setEditPromotion(null);
            setIsModalOpen(true);
          }}
        >
          + 프로모션 추가
        </Button>
      </div>

      <Table
        headers={["이름", "타입", "설명", "시작일", "종료일", "액션"]}
        rows={promotions.map((p) => [
          p.name,
          p.type,
          p.description,
          p.startedAt,
          p.endedAt,
          <div className="flex gap-2">
            <Button
              variant="ghost"
              onClick={() => {
                setEditPromotion(p);
                setIsModalOpen(true);
              }}
            >
              수정
            </Button>
            <Button
              variant="ghost"
              onClick={() =>
                setPromotions(promotions.filter((pm) => pm.id !== p.id))
              }
            >
              삭제
            </Button>
          </div>,
        ])}
      />

      {isModalOpen && (
        <AddEditPromotionModal
          promotion={editPromotion}
          onClose={() => setIsModalOpen(false)}
          onSave={(newPromotion) => {
            setPromotions((prev) => {
              const exists = prev.find((p) => p.id === newPromotion.id);
              if (exists) {
                return prev.map((p) =>
                  p.id === newPromotion.id ? newPromotion : p
                );
              }
              return [...prev, newPromotion];
            });
            setIsModalOpen(false);
          }}
        />
      )}
    </>
  );
}
