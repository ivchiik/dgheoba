export interface ApiErrorBody {
  error: {
    code: string;
    message: string;
    details?: Record<string, unknown>;
    traceId?: string;
  };
}

/** The codes the app branches on; the full catalogue is in the backend README. */
export enum ApiErrorCode {
  CodeNotRecognised = "EVT_2002",
  AccessRevoked = "EVT_2003",
  AccessWindowClosed = "EVT_2004",
  RateLimited = "SYS_9002",
}

// TODO(swagger): field names are guessed — the backend README documents no request bodies.
export interface RedeemReq {
  code: string;
  name: string;
}

// TODO(swagger): same for the response.
export interface RedeemRes {
  token: string;
}
