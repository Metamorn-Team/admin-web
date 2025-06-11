import { useEffect, useState } from "react";
import Input from "../common/Input";
import Button from "../common/Button";
import ImageInput from "../common/ImageInput";
import Modal from "../common/Modal";
import Select from "../common/Select";

const PRODUCT_TYPE_OPTIONS = [
  { label: "일반", value: 0 },
  { label: "한정", value: 1 },
];

type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  productType: number;
  coverImage: string;
  itemId: string;
  item?: { id: string; name: string };
  createdAt: string;
  updatedAt: string;
};

type Props = {
  product: Product | null;
  items: { id: string; name: string }[];
  onClose: () => void;
  onSave: (product: Product) => void;
};

// item은 실제 아이템 리스트
export default function AddEditProductModal({
  product,
  items,
  onClose,
  onSave,
}: Props) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [productType, setProductType] = useState(0);
  const [coverImage, setCoverImage] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [itemId, setItemId] = useState("");

  useEffect(() => {
    if (product) {
      setName(product.name);
      setDescription(product.description);
      setPrice(product.price);
      setProductType(product.productType);
      setCoverImage(product.coverImage);
      setItemId(product.itemId);
    }
  }, [product]);

  const handleSubmit = () => {
    const now = new Date().toISOString();
    const id = product?.id || crypto.randomUUID();

    const newProduct: Product = {
      id,
      name,
      description,
      price,
      productType,
      coverImage: imageFile ? URL.createObjectURL(imageFile) : coverImage,
      itemId,
      createdAt: product?.createdAt || now,
      updatedAt: now,
    };

    onSave(newProduct);
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
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="상품명"
      />
      <Input
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="설명"
      />
      <Input
        type="number"
        value={price}
        onChange={(e) => setPrice(Number(e.target.value))}
        placeholder="가격"
      />

      <Select
        value={productType}
        onChange={(val) => setProductType(Number(val))}
        options={PRODUCT_TYPE_OPTIONS}
        placeholder="상품 타입 선택"
      />

      <Select
        value={itemId}
        onChange={(val) => setItemId(String(val))}
        options={items.map((item) => ({ label: item.name, value: item.id }))}
        placeholder="연결된 아이템 선택"
      />

      <ImageInput
        previewUrl={
          imageFile ? URL.createObjectURL(imageFile) : coverImage || undefined
        }
        onChange={(file) => setImageFile(file)}
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
