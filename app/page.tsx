import { Suspense } from "react";
import CarContent from "./components/CarContent/CarContent";

export default function CarsPage() {
  return (
    <Suspense
      fallback={
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Загрузка...</span>
          </div>
        </div>
      }
    >
      <CarContent />
    </Suspense>
  );
}
