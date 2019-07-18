import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";


export function configReducer (appService: AppConfig) {
    return () => appService;
}

@Injectable()
export class AppConfig {
    private static _env = (window as any).env = environment;

    static get(name?: string) {
        if (name) { return this._env[name]; }

        return this._env;
    }
}