import { useEffect, useState } from "react";
import Card from "../components/Card";
import "../App.css";

const Task = () => {
  const [inputData, setInputData] = useState("");
  const [timeDate, setTimeDate] = useState("");
  const [text, setText] = useState([]);

  const numIndex = inputData.indexOf(":");
  const dataNumId = inputData.indexOf(".");

  const handleSubmit = (e) => {
    e.preventDefault();
    const newInputData = inputData.trim();
    if (newInputData !== "") {
      const words = newInputData.split(" ");
      let dayValue = "";

      if (words.includes("bugun")) {
        dayValue = words[words.indexOf("bugun")].toLowerCase();
        delete words[words.indexOf("bugun")];
      } else if (words.includes("ertaga")) {
        dayValue = words[words.indexOf("ertaga")].toLowerCase();
        delete words[words.indexOf("ertaga")];
      }

      // TODO: Matinni ichidan vaqtni olib tashlash;

      if (inputData.indexOf(":") !== -1) {
        delete words[
          words.indexOf(inputData.substring(numIndex - 2, numIndex + 3))
        ];
      }

      // TODO: Matinni ichidan sanani olish;

      let newDate = "";

      if (inputData.indexOf(".") !== -1) {
        newDate =
          words[
            words.indexOf(inputData.substring(dataNumId - 2, dataNumId + 8))
          ];
      }

      let inputNewData = words.join(" ");
      let newTime = "";

      // TODO: Vaqtsiz holat matni o’zini kiritish;

      if (
        dayValue !== "ertaga" &&
        dayValue !== "bugun" &&
        !inputNewData.includes(".")
      ) {
        dayValue = "bugun";
        const now = new Date();
        now.setMinutes(0);
        now.setSeconds(0);
        now.setHours(now.getHours() + 1);
        newTime = now.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });

        // TODO: Vaqtsiz bugun holat;
      } else if (
        dayValue !== "ertaga" &&
        dayValue === "bugun" &&
        !inputNewData.includes(".")
      ) {
        dayValue = "bugun";
        const now = new Date();
        now.setMinutes(0);
        now.setSeconds(0);
        now.setHours(now.getHours() + 1);
        newTime = now.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });

        // TODO: Vaqtsiz sanali holat aniq sanani DD.MM.YYYY formatida kiritadi
      } else if (
        (dayValue !== "bugun" && numIndex === -1) ||
        dayValue !== "ertaga"
      ) {
        newTime = "09:00";
      } else {
        const now = new Date();
        now.setMinutes(0);
        now.setSeconds(0);
        now.setHours(now.getHours() + 1);
        newTime = now.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });
      }

      // TODO: Vaqtni olib beradi;

      if (inputData.indexOf(":") !== -1) {
        newTime = inputData.substring(numIndex - 2, numIndex + 3);
      }

      // TODO: Kunni olib beradi;

      if (inputData.indexOf(".") !== -1) {
        inputNewData = inputNewData
          .substring(0, inputNewData.indexOf(newDate))
          .trim();
        newDate = inputData.substring(dataNumId - 2, dataNumId + 8);
      }

      // TODO: Hamma ma'lumotlardan data yasash;

      setText([
        ...text,
        {
          day: dayValue,
          data: inputNewData,
          date: newDate,
          time: newTime,
        },
      ]);
      setInputData("");
    }
  };

  // TODO: Vaqti bilan ketma-ket turish!

  text.sort((a, b) => {
    const nameA = a.time;
    const nameB = b.time;
    if (nameA < nameB) return -1;
    if (nameA > nameB) return 1;
    return 0;
  });

  // TODO: Xozirgi vaqtni ko'rsatib turadi;

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeDate(new Date().toLocaleString());
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <section className="section">
      <div className="section-box">
        <h1>Vazifalar Menedjeri</h1>
        <form onSubmit={handleSubmit} className="section-send">
          <input
            type="text"
            name="data"
            placeholder="Yangi vazifa qo'shish"
            value={inputData}
            onChange={(e) => setInputData(e.target.value.toLowerCase())}
          />
          <button type="submit">+</button>
        </form>
        <p>{timeDate ? `Bugun: ${timeDate}` : ""}</p>
        <div className="section-head">
          <h2>Bugun</h2>
          {text.map((item, index) => {
            if (item.day === "bugun" || item.data.includes("bugun")) {
              return <Card item={item} index={index} key={index} />;
            }
            return null;
          })}
          <h2>Ertaga</h2>
          {text.map((item, index) => {
            if (item.day === "ertaga" || item.data.includes("ertaga")) {
              return <Card item={item} index={index} key={index} />;
            }
            return null;
          })}
          <h2>Keyin</h2>
          {text.map((item, index) => {
            if (
              item.date.includes(".") &&
              !item.data.includes("bugun") &&
              !item.day.includes("bugun") &&
              !item.data.includes("ertaga") &&
              !item.day.includes("ertaga")
            ) {
              return <Card item={item} index={index} key={index} />;
            }
            return null;
          })}
        </div>
      </div>
    </section>
  );
};

export default Task;
