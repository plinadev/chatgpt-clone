import { useEffect, useRef, useState } from "react";
import { FcMindMap, FcReading } from "react-icons/fc";

interface MessageProps {
  content: string;
  aiMessage: boolean;
  animate: boolean;
}
interface SlowTextProps {
  speed: number;
  text: string;
}

function SlowText({ speed, text }: SlowTextProps) {
  const [placeholder, setPlaceholder] = useState(text[0]);
  const index = useRef(0);

  useEffect(() => {
    function tick() {
      index.current++;
      setPlaceholder((prev) => prev + text[index.current]);
    }

    if (index.current < text.length - 1) {
      const addChar = setInterval(tick, speed);
      return () => clearInterval(addChar);
    }
  }, [placeholder, speed, text]);

  return <span>{placeholder}</span>;
}

function Message({ content, aiMessage, animate }: MessageProps) {
  return (
    <div
      className="message_container"
      style={{ background: aiMessage ? "rgb(247, 247, 248)" : "white" }}
    >
      <div className="message_avatar_container">
        {aiMessage ? <FcMindMap /> : <FcReading />}
      </div>
      <p className="message_text">
        {animate ? <SlowText speed={20} text={content} /> : content}
      </p>
    </div>
  );
}

export default Message;
