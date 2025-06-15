import { useState, useEffect } from "react";
import Modal from "../common/Modal";
import Input from "../common/Input";
import Select from "../common/Select";
import Button from "../common/Button";
import type {
  AddPromotionProductRequest,
  UpdatePromotionProductRequest,
} from "lia-admin-type";
import { useGetAllProduct } from "../hook/query/useGetAllProduct";
import { useGetAllPromotion } from "../hook/query/useGetAllPromotion";
import { useAddPromotionProduct } from "../hook/query/useAddPromotionProduct";
import { useQueryClient } from "@tanstack/react-query";
import { QUERY_KEY as PROMOTION_PRODUCT_KEY } from "../hook/query/useGetAllPromotionProduct";
import { useUpdatePromotionProduct } from "../hook/query/useUpdatePromotionProduct";
import type { PromotionProduct } from "./PromotionProductPanel";

type Props = {
  initialData: AddPromotionProductRequest | null;
  onClose: () => void;
};

export default function AddEditPromotionProductModal({
  initialData,
  onClose,
}: Props) {
  const queryClient = useQueryClient();
  const isEdit = !!initialData;

  const [form, setForm] = useState<PromotionProduct>({
    productId: "",
    promotionId: "",
    discountRate: 0,
  });

  const onSuccess = () =>
    queryClient.invalidateQueries({ queryKey: [PROMOTION_PRODUCT_KEY] });

  const { data: products } = useGetAllProduct();
  const { data: promotions } = useGetAllPromotion();
  const { mutate: addMutate } = useAddPromotionProduct(onSuccess);
  const { mutate: updateMutate } = useUpdatePromotionProduct(onSuccess);

  useEffect(() => {
    if (initialData) setForm(initialData);
  }, [initialData]);

  const onChange = <K extends keyof AddPromotionProductRequest>(
    key: K,
    value: AddPromotionProductRequest[K]
  ) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const isValid = (): boolean => {
    if (!form.productId || !form.promotionId) {
      alert("상품과 프로모션을 선택해주세요.");
      return false;
    }
    if (
      typeof form.discountRate !== "number" ||
      form.discountRate < 0 ||
      form.discountRate > 1
    ) {
      alert("할인율은 0 이상 1 이하의 값이어야 합니다.");
      return false;
    }
    return true;
  };

  const handleSubmit = () => {
    if (!isValid()) return;

    if (isEdit || form.id) {
      updateMutate(form as UpdatePromotionProductRequest);
    } else {
      addMutate(form);
    }
    onClose();
  };

  return (
    <Modal
      isOpen={true}
      onClose={onClose}
      className="w-full max-w-lg space-y-4"
    >
      <h2 className="text-xl font-bold text-[#3e3226]">
        {isEdit ? "프로모션 상품 수정" : "프로모션 상품 추가"}
      </h2>

      <Select
        value={form.productId}
        onChange={(val) => onChange("productId", val as string)}
        options={products.map((p) => ({ label: p.name, value: p.id }))}
        placeholder="상품 선택"
      />

      <Select
        value={form.promotionId}
        onChange={(val) => onChange("promotionId", val as string)}
        options={promotions.map((p) => ({ label: p.name, value: p.id }))}
        placeholder="프로모션 선택"
      />

      <Input
        type="number"
        step="0.01"
        min={0}
        max={1}
        value={form.discountRate}
        onChange={(e) => onChange("discountRate", parseFloat(e.target.value))}
        placeholder="할인율 (예: 0.2 → 20%)"
      />

      <div className="flex justify-end gap-2">
        <Button variant="ghost" onClick={onClose}>
          취소
        </Button>
        <Button onClick={handleSubmit}>{isEdit ? "수정 완료" : "추가"}</Button>
      </div>
    </Modal>
  );
}
