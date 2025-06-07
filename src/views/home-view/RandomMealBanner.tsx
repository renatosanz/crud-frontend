import { getRandomDayMeal, RandomMeal } from "@/services/user-service";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function RandomMealBanner() {
  const navigate = useNavigate();

  const [dailyRandomMeal, setdailyRandomMeal] = useState<RandomMeal>();
  useEffect(() => {
    getRandomDayMeal({ completeData: false }).then((randomMeal) =>
      setdailyRandomMeal(randomMeal)
    );
  }, []);
  return (
    <section
      className="flex p-2 bg-neutral-200 cursor-pointer rounded-xl"
      onClick={() => navigate("/daily")}
    >
      <div className="p-2 flex flex-col sm:flex-row">
        <div className="flex-1 m-auto">
          <p className="text-sm italic">Random Daily Recipe</p>
          <h2>{dailyRandomMeal?.title} 🍽️</h2>
          <p>{dailyRandomMeal?.description + "..."}</p>
          <p>
            <em>
              Source:{" "}
              <a href="https://www.themealdb.com/" target="_blank">
                themealdb.com
              </a>
            </em>
          </p>
        </div>
        <div className="m-auto w-[100%] md:w-auto flex h-[8rem] mt-2">
          <img
            className="m-auto w-[100%] h-[8rem] sm:w-[12rem] object-cover rounded-xl"
            src={dailyRandomMeal?.img}
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}
