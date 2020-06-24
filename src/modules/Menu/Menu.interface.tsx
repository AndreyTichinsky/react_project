import type { HandlerControllerEvent } from "types/menu";
import type { HandlerNameType } from "types/game";

export interface MenuProps {
  initialPercent: number;
  xSize: number;
  ySize: number;
  isDisabled: boolean;
  eventHandler: (event: HandlerControllerEvent, name: HandlerNameType) => void;
}
