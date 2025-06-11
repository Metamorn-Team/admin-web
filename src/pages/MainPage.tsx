"use client";

import { useEffect, useState } from "react";
import Button from "../components/common/Button";
// import ImageInput from "../components/common/ImageInput";
import ItemPanel from "../components/item/ItemPanel";
import ProductPanel from "../components/product/ProductPanel";
import PromotionPanel from "../components/promotion/PromotionPanel";
import { useNavigate } from "react-router";
import { checkAuth } from "../api/auth";

const MENU_ITEMS = ["아이템", "상품", "프로모션"];

export default function MainPage() {
  const [activeTab, setActiveTab] = useState("아이템");
  // const [search, setSearch] = useState("");
  // const [imageFile, setImageFile] = useState<File | null>(null);
  const [menuOpen, setMenuOpen] = useState(true); // ← 메뉴 상태 추가
  const navigate = useNavigate();

  const chekcLogin = async () => {
    try {
      await checkAuth();
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (_: unknown) {
      navigate("/");
    }
  };

  useEffect(() => {
    chekcLogin();
  }, []);

  return (
    <div className="min-h-screen bg-[#fcf9f4] flex relative">
      {/* 메뉴 열기 버튼 (상단 고정) */}
      {/* 메뉴 열기 버튼 (항상 좌측 상단 고정) */}
      <button
        className="fixed top-4 left-4 z-50 bg-[#d4c8b0] text-[#3e3226] text-sm px-3 py-1 rounded-full shadow border border-[#bfae96]"
        onClick={() => setMenuOpen((prev) => !prev)}
      >
        {menuOpen ? "← 메뉴 닫기" : "→ 메뉴 열기"}
      </button>

      {/* 좌측 메뉴탭 */}
      {menuOpen && (
        <aside className="w-48 bg-white border-r border-[#e3d9c4] shadow-[4px_0_0_#cbbfa9] py-6 px-4 space-y-4">
          <h2 className="text-lg font-bold text-[#3e3226] mb-4">메뉴</h2>
          {MENU_ITEMS.map((item) => (
            <Button
              key={item}
              variant={activeTab === item ? "primary" : "ghost"}
              className="w-full text-sm"
              onClick={() => setActiveTab(item)}
            >
              {item}
            </Button>
          ))}
        </aside>
      )}

      {/* 콘텐츠 영역 */}
      <main
        className={`flex-1 p-8 transition-all duration-300 ${
          menuOpen ? "ml-0" : "ml-0"
        }`}
      >
        <h1 className="text-xl font-bold text-[#3e3226] mb-6">
          {activeTab} 관리
        </h1>

        {activeTab === "아이템" && (
          <div className="space-y-4">
            <ItemPanel />
          </div>
        )}

        {activeTab === "상품" && (
          <div className="space-y-4">
            <ProductPanel />
          </div>
        )}

        {activeTab === "프로모션" && (
          <div className="space-y-4">
            <PromotionPanel />
          </div>
        )}
      </main>
    </div>
  );
}
