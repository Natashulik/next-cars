import { Car } from "@/app/types/car";
import React from "react";
import styles from "./styles.module.css";
import { FaRegHeart, FaHeart, FaBalanceScale } from "react-icons/fa";

interface CarListProps {
  cars: Car[];
  isLoading: boolean;
  error: string | null;
}

const CarList: React.FC<CarListProps> = ({ cars, isLoading, error }) => {
  if (isLoading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Загрузка...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  if (!cars || cars.length === 0) {
    return <div className="alert alert-info">Автомобили не найдены</div>;
  }

  return (
    <div
      className={`row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4 my-3 ${styles.cardList}`}
    >
      {cars.map(car => (
        <div key={car.vin} className="col">
          <div className={`card  ${styles.card}`}>
            {car.images?.image?.[0] && (
              <img
                src={car.images.image[0]}
                className="card-img-top object-fit-cover"
                alt={`${car.mark_id} ${car.folder_id}`}
              />
            )}

            <div className={`card-body ${styles.cardBody}`}>
              <div className={styles.cardTop}>
                <h5 className="card-title">
                  {car.mark_id} {car.model_name} {car.generation_name}
                </h5>
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <span className="text-success fw-bold fs-5">
                    {car.price.toLocaleString("ru-RU")} ₽
                  </span>
                </div>
                <ul className="list-unstyled mb-3">
                  <li className="list-item">
                    <strong>Год:</strong> {car.year}{" "}
                    {car.registry_year !== car.year && `(${car.registry_year})`}
                  </li>
                  <li className="list-item">
                    <strong>Пробег:</strong> {car.run.toLocaleString("ru-RU")}{" "}
                    км
                  </li>
                  <li className="list-item">
                    <strong>Двигатель:</strong> {car.engine_volume} см³ (
                    {car.engine_power})
                  </li>
                  <li className="list-item">
                    <strong>Цвет:</strong> {car.color}
                  </li>
                </ul>
              </div>
              <div className={styles.cardBottom}>
                <div className={styles.iconBtn}>
                  <FaRegHeart className={styles.heart} />
                </div>
                <div className={styles.iconBtn}>
                  <FaBalanceScale />
                </div>
                <button className={`btn btn-primary ${styles.buyBtn}`}>
                  Купить
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CarList;
