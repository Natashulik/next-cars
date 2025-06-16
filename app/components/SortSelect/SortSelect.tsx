"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Form } from "react-bootstrap";
import styles from "./styles.module.css";

export default function SortSelect() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentSort = searchParams.get("sort") || "";
  const currentOrder = searchParams.get("order") || "";
  const selectedValue = currentSort === "price" ? currentOrder : "";

  console.log(currentSort);
  console.log(currentOrder);

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const order = e.target.value;
    const params = new URLSearchParams(searchParams);

    params.delete("page");

    if (order === "asc" || order === "desc") {
      params.set("sort", "price");
      params.set("order", order);
    } else {
      params.delete("sort");
      params.delete("order");
    }

    router.push(`?${params.toString()}`);
  };

  return (
    <div className={styles.selectWrapper}>
      <Form.Select
        className={styles.select}
        value={selectedValue}
        onChange={handleSortChange}
      >
        <option value="">Без сортировки</option>
        <option value="asc">Цена по возрастанию</option>
        <option value="desc">Цена по убыванию</option>
      </Form.Select>
    </div>
  );
}
