import React, { useEffect, useRef, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { SceneManager } from "./manager/scene-manager";
import { LivingRoomScene } from "./show/scene/living-room-scene";
import { CharacterManager } from "./manager/character-manager";
import { fabric } from "fabric";

function App() {
  const canvasRef = useRef(null);
  let canvasElement: HTMLCanvasElement;
  let canvas: fabric.Canvas;
  const [text, setText] = useState<string>(
    " A quiet park, late afternoon. Birds can be heard chirping, and there’s a soft glow as the sun begins to set"
  );
  useEffect(() => {
    console.log("use");
    if (canvasRef.current) {
      canvasElement = canvasRef.current;
      const context = canvasElement.getContext("2d");
      context?.clearRect(0, 0, canvasElement.width, canvasElement.height);
      canvas = new fabric.Canvas(canvasElement);
      canvas.clear();
      const sceneManager = new SceneManager(canvas, canvasElement, setText);

      sceneManager.addScene(new LivingRoomScene());
      sceneManager.setScene("living-room");
    }
  }, []);
  return (
    <div className="App">
      <canvas ref={canvasRef}></canvas>
      <div className="transcript">{text}</div>
    </div>
  );
}

export default App;
