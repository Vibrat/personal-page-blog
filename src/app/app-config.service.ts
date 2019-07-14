import { Injectable } from "@angular/core";
import { environment } from "../environments/environment";

@Injectable()
export class AppConfig {
    private static _env = environment;

    static get(name?: string) {
        if (name) {
            return this._env[name];
        }

        return this._env;
    }
}