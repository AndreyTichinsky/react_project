import type { HandlerControllerEvent } from "types/menu";

export interface StartFormProps {
  gameInProgress: boolean;
  updateSpeed: string;
  handleProgress: (ev: HandlerControllerEvent) => void;
  selectHandler: (ev: HandlerControllerEvent) => void;
}
