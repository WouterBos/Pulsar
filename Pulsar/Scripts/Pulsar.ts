/// <reference path="jquery.d.ts" />
/// <reference path="knockout.d.ts" />

module pulsar {
    export class api {
        private accountInfo: IAccountInfo;
        private iteration: IIteration;

        constructor(username: string, password: string, domain: string) {
            this.accountInfo = {
                username: username,
                password: password,
                domain: domain,
                displayName: ''
            }
        }

        login(): void {
            jQuery.ajax({
                url: '/api/PulsarApi/Login?Username=' + this.accountInfo.username + '&Password=' + this.accountInfo.password + '&Domain=' + this.accountInfo.domain,
                success: d => {
                    this.iteration = JSON.parse(d).iteration;
                    this.accountInfo.displayName = JSON.parse(d).accountInfo.displayName;
                    console.log(this.iteration, this.accountInfo);

                }
            });
        }
    }

    export module page {
        var api: pulsar.api;
        export function init(): void {
            api = new pulsar.api('wouter.bos', 'xxx', 'xxx');
            api.login();
        }
    }

    export interface IAccountInfo {
        username: string
        password: string
        domain: string
        displayName: string
    }

    export interface IIteration {
        id: number
        startDate: string
        endDate: string
    }
}