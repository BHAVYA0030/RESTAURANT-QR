import React from "react";
import { useParams } from "react-router-dom";
import Menu from "./Menu";

export default function MenuWrapper() {
  // 🧾 Get the tableSlug from URL
  const { tableSlug } = useParams();

  console.log("📍 Table Slug from URL:", tableSlug);

  // 🔄 Fallback if no slug found
  const safeSlug = tableSlug || "default-table";

  return <Menu tableSlug={safeSlug} />;
}
