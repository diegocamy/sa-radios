export interface RadioStation {
  id: number;
  name: string;
  host?: string;
  url: string;
  logo: string;
}

export interface AppState {
  radios: RadioStation[];
  activeRadio: RadioStation;
  color: string;
  volume: number;
  playing: boolean;
  percentagePlayed: number;
  loadRadio: boolean;
}
