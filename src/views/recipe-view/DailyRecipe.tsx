import { Button } from "@/components/ui/button";
import { getRandomDayMeal, RandomMeal } from "@/services/user-service";
import Cookies from "js-cookie";
import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function DailyRecipe() {
  const navigate = useNavigate();
  const [dailyRandomMeal, setdailyRandomMeal] = useState<RandomMeal>();

  useEffect(() => {
    if (Cookies.get("isLogged")) {
      getRandomDayMeal({ completeData: true }).then((randomMeal) =>
        setdailyRandomMeal(randomMeal)
      );
    } else {
      navigate("/", { replace: true });
    }
  }, []);
  return (
    <main className="h-screen flex w-screen flex-col">
      <div className="mx-auto w-11/12 lg:w-6/12 lg:py-20 flex flex-col p-5 rounded-2xl">
        <>
          <header className="flex flex-row gap-5">
            <Button onClick={() => navigate(-1)}>
              <ArrowLeft />
            </Button>
            <h2>{dailyRandomMeal?.title}</h2>
          </header>
          <p>
            Posted by <b>{dailyRandomMeal?.author}</b>
            <br />
            <em>
              <a target="_blank" href={dailyRandomMeal?.source}>
                Source Recipe
              </a>
            </em>
            <br />
            <b>Category: {dailyRandomMeal?.category}</b>
          </p>
          <section>
            {/*Lista de ingredientes */}
            <div className="grid mt-5 md:grid-cols-2 gap-5">
              <div>
                <img
                  className="w-full h-full object-cover sm:w-auto"
                  src={dailyRandomMeal?.img}
                />
              </div>
              <div>
                <h3>Ingredients</h3>
                <ul className="ml-7">
                  {dailyRandomMeal?.ingredients.map((e) => (
                    <li key={e} style={{ listStyleType: "square" }}>
                      {e}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="mt-5">
              <h3>Instructions</h3>
              <TextWithLineBreaks text={dailyRandomMeal?.description} />
              {dailyRandomMeal?.youtube_link ? (
                <YoutubeFrame link={dailyRandomMeal?.youtube_link} />
              ) : (
                ""
              )}
            </div>
          </section>
        </>
      </div>
    </main>
  );
}

const TextWithLineBreaks = ({ text = "" }) => {
  const newlineText = text.split("\n").map((text, index) => (
    <p key={index}>
      {text}
      <br />
    </p>
  ));
  return <div style={{ textWrap: "wrap" }}>{newlineText}</div>;
};

const YoutubeFrame = ({ link }: { link: string }) => {
  return (
    <>
      <h3>Youtube Tutorial</h3>
      <iframe
        className="video"
        title="Youtube player"
        sandbox="allow-same-origin allow-forms allow-popups allow-scripts allow-presentation"
        src={link}
      ></iframe>
    </>
  );
};
