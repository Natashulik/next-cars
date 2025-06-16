"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import SortSelect from "./components/SortSelect/SortSelect";
import CarPagination from "./components/CarPagination/CarPagination";
import CarList from "./components/CarList/CarList";
import { Car } from "./types/car";

export default function CarsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const page = searchParams.get("page") || "1";
  const sort = searchParams.get("sort");
  const order = searchParams.get("order");

  const [cars, setCars] = useState<Car[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        setIsLoading(true);
        let url = `https://testing-api.ru-rating.ru/cars?_limit=12&_page=${page}`;

        if (sort === "price" && (order === "asc" || order === "desc")) {
          url += `&_sort=price&_order=${order}`;
        }

        const response = await fetch(url);
        if (!response.ok) throw new Error("Ошибка загрузки данных");
        const cars = await response.json();
        console.log(cars.data);

        setCars(cars.data);

        const totalCount = response.headers.get("X-Total-Count");
        if (totalCount) {
          setTotalPages(Math.ceil(Number(totalCount) / 12));
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Неизвестная ошибка");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCars();
  }, [page, sort, order]);

  const updateParams = () => {
    const params = new URLSearchParams(searchParams);
    params.set("sort", "price");
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="container">
      <SortSelect />
      <CarList cars={cars} isLoading={isLoading} error={error} />
      <CarPagination totalPages={totalPages} currentPage={Number(page)} />
    </div>
  );
}
