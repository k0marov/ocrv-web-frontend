import { getNetworkFailure } from "../errors/errorHandling";
import { NetworkFailure } from "../errors/failures";

export type NetworkFetcher = (input: RequestInfo | URL, init?: RequestInit) => Promise<Response>; 
export type FetcherMiddleware = (fetcher: NetworkFetcher) => NetworkFetcher;

export function FetcherExceptionMW(fetcher: NetworkFetcher): NetworkFetcher {
    return async (input: RequestInfo | URL, init?: RequestInit) => {
        console.log("here");
        const response = await fetcher(input, init);
        console.log(response);
        if (!response.ok) {
            throw await getNetworkFailure(response);
        }
        return response;
    }; 
}