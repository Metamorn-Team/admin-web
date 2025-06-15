import { useEffect, useState } from "react";
import Input from "../common/Input";
import Button from "../common/Button";
import ImageInput from "../common/ImageInput";
import Modal from "../common/Modal";
import Select from "../common/Select";
import type {
  AddProductRequest,
  ProductItem,
  UpdateProductRequest,
} from "lia-admin-type";
import { useAddProduct } from "../hook/query/useAddProduct";
import { useQueryClient } from "@tanstack/react-query";
import { QUERY_KEY as ALL_PRODUCT_QUERY_KEY } from "../hook/query/useGetAllProduct";
import { useGetAllItem } from "../hook/query/useGetAllItem";
import { getPresignedUrl, uploadImage } from "../../api/file";
import { BUCKET_PATH, CDN_URL } from "../../constants/url";
import type { ProductType } from "lia-admin-type/dist/src/types/product";
import { useUpdateProduct } from "../hook/query/useUpdateProduct";

const PRODUCT_TYPE_OPTIONS = [
  { label: "오라", value: "AURA" } as const,
  { label: "말풍선", value: "SPEECH_BUBBLE" } as const,
];

type Props = {
  product: ProductItem | null;
  onClose: () => void;
};

export default function AddEditProductModal({ product, onClose }: Props) {
  const queryClient = useQueryClient();
  const { data: items } = useGetAllItem();
  const { mutate: addProductMutate } = useAddProduct(() => {
    queryClient.invalidateQueries({ queryKey: [ALL_PRODUCT_QUERY_KEY] });
  });
  const { mutate: updateProductMutate } = useUpdateProduct(() => {
    queryClient.invalidateQueries({ queryKey: [ALL_PRODUCT_QUERY_KEY] });
  });

  const [newProduct, setNewProduct] = useState<
    Partial<AddProductRequest> & { id?: string }
  >({});

  const onChange = <T extends AddProductRequest, K extends keyof T>(
    key: K,
    value: T[K]
  ) => {
    setNewProduct({
      ...newProduct,
      [key]: value,
    });
  };

  const isValid = (
    newProduct: Partial<AddProductRequest>
  ): newProduct is AddProductRequest => {
    if (!newProduct.name || newProduct.name.trim().length === 0) {
      throw new Error("상품명을 입력해주세요.");
    }
    if (!newProduct.description || newProduct.description.trim().length === 0) {
      throw new Error("상품 설명을 입력해주세요.");
    }
    if (
      typeof newProduct.price !== "number" ||
      isNaN(newProduct.price) ||
      newProduct.price < 0
    ) {
      throw new Error("유효한 상품 가격을 입력해주세요.");
    }
    if (!newProduct.productType) {
      throw new Error("상품 타입을 선택해주세요.");
    }
    if (!newProduct.itemId || newProduct.itemId.trim().length === 0) {
      throw new Error("연결된 아이템을 선택해주세요.");
    }

    return true;
  };

  useEffect(() => {
    if (product) {
      setNewProduct({
        ...product,
        productType: product.type,
        id: product.id,
      });
    }
  }, [product]);

  const handleImageChange = async (file: File | null) => {
    if (!newProduct.productType) {
      alert("종류를 먼저 선택해주세요");
      return;
    }

    try {
      const data = await getPresignedUrl({
        path: BUCKET_PATH[newProduct.productType],
        name: file?.name || crypto.randomUUID(),
      });
      const { presignedUrl, key } = data;

      if (!file) {
        console.error("file not found");
        return;
      }

      await uploadImage(presignedUrl, file);

      onChange("coverImage", `${CDN_URL}/${key}`);
    } catch (e) {
      console.error(e);
      return;
    }
  };

  const handleSubmit = () => {
    try {
      isValid(newProduct);
      if (product && newProduct.id) {
        updateProductMutate(newProduct as UpdateProductRequest);
      } else {
        addProductMutate(newProduct as AddProductRequest);
      }
    } catch (err) {
      alert((err as Error).message);
    }
  };

  return (
    <Modal
      isOpen={true}
      onClose={onClose}
      className="w-full max-w-lg space-y-4"
    >
      <h2 className="text-xl font-bold text-[#3e3226]">
        {product ? "상품 수정" : "상품 추가"}
      </h2>

      <Input
        value={newProduct.name || ""}
        onChange={(e) => onChange("name", e.target.value)}
        placeholder="상품명"
      />
      <Input
        value={newProduct.description || ""}
        onChange={(e) => onChange("description", e.target.value)}
        placeholder="설명"
      />
      <Input
        type="number"
        value={newProduct.price ?? 200}
        onChange={(e) => onChange("price", Number(e.target.value))}
        placeholder="가격"
      />

      <Select
        value={newProduct.productType || "AURA"}
        onChange={(val) => onChange("productType", val as ProductType)}
        options={PRODUCT_TYPE_OPTIONS}
        placeholder="상품 타입 선택"
      />

      <Select
        value={newProduct.itemId || ""}
        onChange={(val) => onChange("itemId", String(val))}
        options={items.map((item) => ({ label: item.name, value: item.id }))}
        placeholder="연결된 아이템 선택"
      />

      <p className="text-red-600">
        🔴 이미지를 등록하지 않으면 자동으로 아이템 이미지 사용 🔴
      </p>
      <ImageInput
        previewUrl={newProduct.coverImage || ""}
        onChange={handleImageChange}
      />

      <div className="flex justify-end gap-2">
        <Button variant="ghost" onClick={onClose}>
          취소
        </Button>
        <Button onClick={handleSubmit}>
          {product ? "수정 완료" : "상품 추가"}
        </Button>
      </div>
    </Modal>
  );
}
