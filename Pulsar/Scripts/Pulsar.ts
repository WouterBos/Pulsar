/// <reference path="jquery.d.ts" />
/// <reference path="knockout.d.ts" />

module pulsar {
    export class page {
        private api: pulsar.api;
        private widgets: pulsar.widgets;
        private login: pulsar.widgets.login;
        private user: pulsar.data.user;

        constructor() {
            this.api = new pulsar.api();
            this.user = new pulsar.data.user();
        }

        public init(templateUrl: string): void {
            // Get widgets template.
            this.widgets = new pulsar.widgets(templateUrl, () => { this.init2() });
        }

        init2(): void {
            if (this.user.hasValidLogin() == false) {
                // Show login screen
                this.login = new pulsar.widgets.login(this.widgets);
                this.login.open(this.api, this.user);
            } else {
                // Auto login
                this.api.login(this.user.AccountInfo, this.user);
            }
        }
    }



    export interface IAccountInfo {
        username: string
        password: string
        domain: string
        rememberLogin?: boolean
        displayName?: string
    }

    export interface IIteration {
        id: number
        startDate: string
        endDate: string
    }
}