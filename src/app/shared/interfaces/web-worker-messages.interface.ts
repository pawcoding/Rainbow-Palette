export type WebWorkerMessage = {
  id?: string;
  type: string;
};

export type RegenerateRequest = WebWorkerMessage & {
  type: 'regenerate';
  shadesString: Array<string>;
};

export type RegenerateResponse = WebWorkerMessage & {
  type: 'regenerate';
  shadesString: Array<string>;
};

export type WebWorkerRequest = RegenerateRequest;
export type WebWorkerResponse = RegenerateResponse;
