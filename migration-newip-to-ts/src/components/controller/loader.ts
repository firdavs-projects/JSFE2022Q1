import { ILoader, DataTypes, IResponse, IParams, IOption, IOptions, StatusCodes } from '../../types/loader';

class Loader implements ILoader {
    public constructor(private baseLink: string, private options: Partial<IOptions>) {}

    public getResp(
        { endpoint, options = {} }: IParams<Partial<IOptions>>,
        callback = (data: Pick<IResponse, DataTypes>): void => {
            console.error('No callback for GET response', data);
        }
    ): void {
        this.load('GET', endpoint, callback, options);
    }

    public errorHandler(res: Response): Response {
        if (!res.ok) {
            if (res.status === StatusCodes.unauthorized || res.status === StatusCodes.notFound) {
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
                throw Error(res.statusText);
            }
        }
        return res;
    }

    public makeUrl(options: Partial<IOptions>, endpoint: string): string {
        const urlOptions: Partial<IOptions> = { ...this.options, ...options };
        let url = `${this.baseLink}${endpoint}?`;

        Object.keys(urlOptions).forEach((key) => {
            url += `${key}=${urlOptions[key as IOption]}&`;
        });

        return url.slice(0, -1);
    }

    public load(
        method: string,
        endpoint: string,
        callback: (data: IResponse) => void,
        options: Partial<IOptions> = {}
    ): void {
        fetch(this.makeUrl(options, endpoint), { method })
            .then(this.errorHandler)
            .then((res: Response): Promise<IResponse> => res.json())
            .then((data: IResponse): void => callback(data))
            .catch((err: Error): void => console.error(err));
    }
}

export default Loader;
