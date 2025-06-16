import { Suspense } from "react";
import CarContent from "./components/CarContent/CarContent";

export default function CarsPage() {
  return (
    <Suspense fallback={<div>Загрузка...</div>}>
      <CarContent />
    </Suspense>
  );
}
