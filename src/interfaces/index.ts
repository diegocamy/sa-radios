export interface RadioStation {
  id: number;
  name: string;
  host?: string;
  url: string;
  streamURL: string;
  logo: string;
}

export interface AppState {
  radios: RadioStation[];
  activeRadio: RadioStation;
  color: string | undefined;
  loading: boolean;
  volume: number;
  playing: boolean;
  percentagePlayed: number;
  loadRadio: boolean;
}
