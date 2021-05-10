export interface RadioStation {
  id: number;
  name: string;
  host?: string;
  url: string;
  streamURL: string;
  logo: string;
}

export interface IdentifiedTrack {
  identified: boolean;
  title?: string;
  artist?: string;
  coverart?: string;
}

export interface AppState {
  radios: RadioStation[];
  activeRadio: RadioStation;
  color: string | undefined;
  loading: boolean;
  volume: number;
  playing: boolean;
  showShareButtons: boolean;
  percentagePlayed: number;
  loadRadio: boolean;
  identifying: boolean;
  track?: IdentifiedTrack | null;
  error: string | null;
}
