"use client";

import EditForm from "@/components/EditForm";

export default function Edit({ params }: { params: { id: string } }) {
  const { id } = params;
  return (
    <>
      <EditForm id={id} />
    </>
  );
}
