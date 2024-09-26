import { injectable } from 'inversify';
import 'reflect-metadata';

@injectable()
export abstract class BaseController {
    protected async apiGet(url: string) {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    }

}