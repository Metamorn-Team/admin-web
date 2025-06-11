"use client";

import Modal from "./Modal";

type Props = {
  src: string;
  alt?: string;
  onClose: () => void;
};

export default function ImagePreviewModal({ src, alt, onClose }: Props) {
  return (
    <Modal isOpen={true} onClose={onClose} className="max-w-4xl max-h-[90vh]">
      <img
        src={src}
        alt={alt}
        className="max-w-full max-h-[80vh] object-contain"
      />
    </Modal>
  );
}
