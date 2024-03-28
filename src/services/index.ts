import useSWR, { SWRResponse } from "swr";
import { Instance } from "./instance";
import { AxiosResponse } from "axios";

interface IServicesOptions {
  name: string;
  method: () => Promise<AxiosResponse<any, any>>;
}

export const Services = {
  list: (params: string): IServicesOptions => ({
    name: `/pokemon/${params}`,
    method: () => Instance.get(`/pokemon/${params}`),
  }),
};

type Entry = keyof typeof Services;

export const useData = <E extends Entry>(
  entry: E
): SWRResponse<AxiosResponse, Error> => {
  const serviceEntry = Services[entry] as unknown as IServicesOptions;
  const { name, method } = serviceEntry;
  return useSWR(name, () => method());
};
