"use client";

import { useState } from "react";
import Input from "../components/common/Input";
import Button from "../components/common/Button";
import { login } from "../api/auth";
import { useNavigate } from "react-router";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!username || !password) {
      setError("아이디와 비밀번호를 모두 입력해주세요.");
      return;
    }

    try {
      await login({ username, password });
      navigate("/main");
    } catch (e: unknown) {
      setError("로그인에 실패했습니다.");
      console.error(e);
    }
  };

  return (
    <div className="min-h-screen bg-[#fcf9f4] flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-white px-6 py-10 rounded-3xl border border-[#e3d9c4] shadow-[4px_4px_0_#cbbfa9] flex flex-col items-center space-y-6"
      >
        <h1 className="text-2xl font-bold text-[#3e3226]">로그인</h1>

        {error && (
          <div className="text-sm text-red-500 text-center w-full">{error}</div>
        )}

        <div className="w-full flex flex-col items-center space-y-2">
          <label className="text-sm font-medium text-[#4c3b2b] self-start">
            아이디
          </label>
          <Input
            type="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="admin@example.com"
            className="rounded-full text-base px-4 py-3 w-full"
          />
        </div>

        <div className="w-full flex flex-col items-center space-y-2">
          <label className="text-sm font-medium text-[#4c3b2b] self-start">
            비밀번호
          </label>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="rounded-full text-base px-4 py-3 w-full"
          />
        </div>

        <Button
          type="submit"
          className="rounded-full text-base font-semibold py-3 w-full max-w-[300px]"
        >
          로그인
        </Button>
      </form>
    </div>
  );
}
