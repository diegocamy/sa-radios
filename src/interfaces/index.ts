export interface RadioStation {
  id: number;
  name: string;
  host?: string;
  url: string;
  logo: string;
}

export interface RadioCardProps {
  img: string;
}

export interface AppState {
  radios: RadioStation[];
  activeRadio: RadioStation;
  volume: number;
  playing: boolean;
  muted: boolean;
  percentagePlayed: number;
}
