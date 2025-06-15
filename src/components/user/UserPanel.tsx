"use client";

import { useState } from "react";
import Table from "../common/Table";
import Button from "../common/Button";
import Modal from "../common/Modal";
// import AddEditUserModal from "./AddEditUserModal";
import PaginationController from "../common/PaginationController";
import { formatKST } from "../../utils/format-kst";
import { useGetUser } from "../hook/query/useGetUser";
import type { UserItem } from "lia-admin-type";
import { PAWN_AVATAR_URL } from "../../constants/url";

export default function UserPanel() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editUser, setEditUser] = useState<UserItem | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const [page, setPage] = useState(1);
  const limit = 10;

  const { data, isLoading, isError } = useGetUser(page, limit);

  const users = data?.users ?? [];
  const total = data?.total ?? 0;
  const totalPages = Math.ceil(total / limit);

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">사용자 목록</h2>
        <Button
          onClick={() => {
            setEditUser(null);
            setIsModalOpen(true);
          }}
        >
          + 사용자 추가
        </Button>
      </div>

      {isLoading ? (
        <div>로딩 중...</div>
      ) : isError ? (
        <div>에러 발생</div>
      ) : (
        <>
          <UserTable
            users={users}
            page={page}
            limit={limit}
            setEditUser={setEditUser}
            setPreviewImage={setPreviewImage}
            openModal={() => setIsModalOpen(true)}
          />

          <PaginationController
            page={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        </>
      )}

      {/* {isModalOpen && (
        <AddEditUserModal
          user={editUser}
          onClose={() => setIsModalOpen(false)}
        />
      )} */}

      {previewImage && (
        <Modal isOpen={true} onClose={() => setPreviewImage(null)}>
          <img
            src={previewImage}
            alt="아바타 미리보기"
            className="max-w-full max-h-[80vh] object-contain"
          />
        </Modal>
      )}
    </>
  );
}

interface UserTableProps {
  users: UserItem[];
  page: number;
  limit: number;
  setEditUser: React.Dispatch<React.SetStateAction<UserItem | null>>;
  setPreviewImage: React.Dispatch<React.SetStateAction<string | null>>;
  openModal: () => void;
}

function UserTable({
  users,
  page,
  limit,
  setEditUser,
  setPreviewImage,
  openModal,
}: UserTableProps) {
  const [tooltipUserId, setTooltipUserId] = useState<string | null>(null);

  return (
    <Table
      headers={[
        "NUM",
        "이메일",
        "프로바이더",
        "닉네임",
        "태그",
        "소개",
        "골드",
        "아바타",
        "가입일",
        "액션",
      ]}
      rows={users.map((u, i) => [
        (page - 1) * limit + i + 1,
        u.email,
        u.provider,
        u.nickname,
        u.tag,
        <div className="relative" key={`bio-${u.id}`}>
          <span
            className="cursor-pointer underline"
            onClick={() =>
              setTooltipUserId((prev) => (prev === u.id ? null : u.id))
            }
          >
            {u.bio?.slice(0, 10) ?? "-"}
          </span>
          {tooltipUserId === u.id && u.bio && (
            <div className="absolute top-full mt-1 z-10 bg-white border rounded shadow p-2 w-64 text-sm whitespace-pre-wrap">
              {u.bio}
              <div className="absolute top-0 left-2 w-2 h-2 bg-white rotate-45 -translate-y-1 border-l border-t" />
            </div>
          )}
        </div>,
        ,
        `${u.gold.toLocaleString()}G`,
        <img
          key={u.id}
          src={PAWN_AVATAR_URL(u.avatarKey)}
          className="w-10 h-10 rounded-full object-cover cursor-pointer"
          onClick={() => setPreviewImage(PAWN_AVATAR_URL(u.avatarKey))}
        />,
        formatKST(u.createdAt),
        <div className="flex gap-2" key={`action-${u.id}`}>
          <Button
            variant="ghost"
            onClick={() => {
              setEditUser(u);
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
