import {HttpClient} from "aurelia-fetch-client";
import {inject, LogManager} from "aurelia-framework";
import {Logger} from "aurelia-logging";
import * as moment from "moment";

import {FormattedSavedGreeting} from "./formattedsavedgreeting";
import {SavedGreeting} from "./messages/savedgreeting";
import {Notifier} from "./notifier";

@inject(HttpClient)
export class Greetings {
    public numberOfSavedGreetings: string = "0";
    public savedGreetings: FormattedSavedGreeting[] = [];

    private log: Logger = LogManager.getLogger("greetings");
    private httpClient: HttpClient;
    private notifier: Notifier;

    constructor(private $httpClient) {
        this.httpClient = $httpClient;
        this.notifier = new Notifier();

        this.prepareRequests();
        this.fetchNumberOfSavedGreetings();
        this.fetchLastGreetings();
    }

    private prepareRequests(): void {
        this.notifier.Info("Working...");
    }

    private async fetchNumberOfSavedGreetings(): Promise<any> {
        let response: Response;
        try {
            response = await this.httpClient.fetch("greetings/count");
        } catch (err) {
            this.handleErrorResponse(err);
            return;
        }

        this.handleFetchNumberOfSavedGreetingsValidResponse(response);
    }

    private async handleFetchNumberOfSavedGreetingsValidResponse(response: Response): Promise<any> {
        this.log.info(`Received http code was: ${response.status}`);
        this.notifier.Info("HTTP/" + response.status);

        const data: string = await response.json();
        this.log.info(`Received data was: ${data}`);
        this.numberOfSavedGreetings = data;
    }

    private async fetchLastGreetings(): Promise<any> {
        let response: Response;
        try {
            response = await this.httpClient.fetch("greetings");
        } catch (err) {
            this.handleErrorResponse(err);
            return;
        }

        this.handleFetchLastGreetingsValidResponse(response);
    }

    private handleErrorResponse(response: Response): void {
        this.log.warn(`Oops... something went wrong. Received http code was: ${response.status}`);
        this.notifier.Warn(`Oops... HTTP/${response.status}`);
    }

    private async handleFetchLastGreetingsValidResponse(response: Response): Promise<any> {
        this.log.info(`Received http code was: ${response.status}`);
        this.notifier.Info("HTTP/" + response.status);

        const data: SavedGreeting[] = await response.json();
        this.log.info(`Received data was: ${data.length} elements`);

        data.forEach((element) => {
            const formatedSavedGreeting = new FormattedSavedGreeting();
            formatedSavedGreeting.greeting = element.greeting;
            formatedSavedGreeting.timestamp = moment.utc(element.timestampUtc).fromNow();
            this.savedGreetings.push(formatedSavedGreeting);
        });
    }
}
