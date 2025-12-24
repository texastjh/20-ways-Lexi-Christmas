export interface Message {
  id: number;
  title: string;
  body: string;
  signature?: string;
}

export interface DoorPosition {
  id: number;
  top: string;
  left: string;
  rotation: number; // in degrees, for imperfect charm
}

export interface AdventDoorProps {
  message: Message;
  position: DoorPosition;
  isOpen: boolean;
  onOpen: (id: number) => void;
  bgImage: string;
  containerWidth: number;
  containerHeight: number;
}
