"use client";

import "react-dadata/dist/react-dadata.css";

import dynamic from "next/dynamic";

const AddressSuggestions = dynamic(
  () => import("react-dadata").then((mod) => mod.AddressSuggestions),
  { ssr: false }
);

type Props = {
  onChange?: (value?: string) => void;
};

export const AddressInput = ({ onChange }: Props) => {
  return (
    <AddressSuggestions
      token="1857539784c656d13325a3a0d32f7f6e6aeb7a97"
      onChange={(data) => onChange?.(data?.value)}
    />
  );
};
