"use client";

import { Suspense, useState } from "react";
import Table from "../common/Table";
import Button from "../common/Button";
import AddEditPromotionModal from "./AddEditPromotionModal";
import { useGetAllPromotion } from "../hook/query/useGetAllPromotion";
import { formatKST } from "../../utils/format-kst";

const formatStatus = (status: string) => {
  switch (status) {
    case "UPCOMING":
      return "시작전";
    case "ONGOING":
      return "진행중";
    case "ENDED":
      return "종료";
  }
};

export default function PromotionPanel() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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

      <Suspense fallback={<div>로드 중...</div>}>
        <PromotionTable />
      </Suspense>

      {isModalOpen && (
        <AddEditPromotionModal
          promotion={editPromotion}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
}

function PromotionTable() {
  const { data: promotions } = useGetAllPromotion();

  return (
    <Table
      headers={[
        "NUM",
        "이름",
        "종류",
        "설명",
        "상태",
        "시작일",
        "종료일",
        "액션",
      ]}
      rows={promotions.map((p, i) => [
        i + 1,
        p.name,
        p.type,
        p.description,
        formatStatus(p.status),
        formatKST(p.startedAt),
        formatKST(p.endedAt),
        <div className="flex gap-2">
          <Button
            variant="ghost"
            onClick={() => {
              // setEditPromotion(p);
              // setIsModalOpen(true);
            }}
          >
            수정
          </Button>
          <Button
            variant="ghost"
            // onClick={() =>
            //   setPromotions(promotions.filter((pm) => pm.id !== p.id))
            // }
          >
            삭제
          </Button>
        </div>,
      ])}
    />
  );
}
