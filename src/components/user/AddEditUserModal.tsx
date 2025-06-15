// "use client";

// import { useEffect, useState } from "react";
// import Modal from "../common/Modal";
// import Input from "../common/Input";
// import Select from "../common/Select";
// import Button from "../common/Button";
// import type { UserItem, OAuthProvider } from "lia-admin-type";
// import { useQueryClient } from "@tanstack/react-query";
// import { useAddUser } from "../hook/query/useAddUser";
// import { useUpdateUser } from "../hook/query/useUpdateUser";
// import { QUERY_KEY as USER_QUERY_KEY } from "../hook/query/useGetAllUser";

// const PROVIDER_OPTIONS: { label: string; value: OAuthProvider }[] = [
//   { label: "구글", value: "GOOGLE" },
//   { label: "깃허브", value: "GITHUB" },
//   { label: "카카오", value: "KAKAO" },
// ];

// type Props = {
//   user: UserItem | null;
//   onClose: () => void;
// };

// export default function AddEditUserModal({ user, onClose }: Props) {
//   const isEdit = !!user;

//   const [email, setEmail] = useState("");
//   const [provider, setProvider] = useState<OAuthProvider>("GOOGLE");
//   const [nickname, setNickname] = useState("");
//   const [tag, setTag] = useState("");
//   const [bio, setBio] = useState("");
//   const [avatarKey, setAvatarKey] = useState("");
//   const [gold, setGold] = useState(0);

//   const queryClient = useQueryClient();

//   const { mutate: addUser } = useAddUser(() =>
//     queryClient.invalidateQueries({ queryKey: [USER_QUERY_KEY] })
//   );

//   const { mutate: updateUser } = useUpdateUser(() =>
//     queryClient.invalidateQueries({ queryKey: [USER_QUERY_KEY] })
//   );

//   useEffect(() => {
//     if (user) {
//       setEmail(user.email);
//       setProvider(user.provider);
//       setNickname(user.nickname);
//       setTag(user.tag);
//       setBio(user.bio ?? "");
//       setAvatarKey(user.avatarKey ?? "");
//       setGold(user.gold ?? 0);
//     }
//   }, [user]);

//   const handleSubmit = () => {
//     const payload = {
//       email,
//       provider,
//       nickname,
//       tag,
//       bio,
//       avatarKey,
//       gold,
//     };

//     if (isEdit) {
//       updateUser({ id: user!.id, ...payload });
//     } else {
//       addUser(payload);
//     }

//     onClose();
//   };

//   return (
//     <Modal
//       isOpen={true}
//       onClose={onClose}
//       className="w-full max-w-lg space-y-4"
//     >
//       <h2 className="text-xl font-bold text-[#3e3226]">
//         {isEdit ? "사용자 수정" : "사용자 추가"}
//       </h2>

//       <Input
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//         placeholder="이메일"
//       />
//       <Select
//         value={provider}
//         onChange={(val) => setProvider(val as OAuthProvider)}
//         options={PROVIDER_OPTIONS}
//         placeholder="OAuth 제공자"
//       />
//       <Input
//         value={nickname}
//         onChange={(e) => setNickname(e.target.value)}
//         placeholder="닉네임"
//       />
//       <Input
//         value={tag}
//         onChange={(e) => setTag(e.target.value)}
//         placeholder="태그 (예: 1234)"
//       />
//       <Input
//         value={bio}
//         onChange={(e) => setBio(e.target.value)}
//         placeholder="소개"
//       />
//       <Input
//         value={avatarKey}
//         onChange={(e) => setAvatarKey(e.target.value)}
//         placeholder="아바타 키 (이미지 경로)"
//       />
//       <Input
//         type="number"
//         value={gold}
//         onChange={(e) => setGold(Number(e.target.value))}
//         placeholder="보유 골드"
//       />

//       <div className="flex justify-end gap-2">
//         <Button variant="ghost" onClick={onClose}>
//           취소
//         </Button>
//         <Button onClick={handleSubmit}>
//           {isEdit ? "수정 완료" : "추가 완료"}
//         </Button>
//       </div>
//     </Modal>
//   );
// }
