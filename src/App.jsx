import { useState } from "react";
import Cover from "./components/Cover";
import Invitation from "./components/Invitation";

export default function App() {
  const [phase, setPhase] = useState("cover");

  function openInvite() {
    if (phase !== "cover") return;
    setPhase("opening");
    window.setTimeout(() => {
      setPhase("open");
      window.scrollTo(0, 0);
    }, 1000);
  }

  if (phase === "open") return <Invitation />;

  return <Cover opening={phase === "opening"} onOpen={openInvite} />;
}
