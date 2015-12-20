/// <reference path="jquery.d.ts" />
/// <reference path="knockout.d.ts" />

module pulsar {
    export module data {
        export class user { // TODO: remove this level. Make user property of data class.
            private accountInfo: IAccountInfo;

            constructor() {
                this.accountInfo = {
                    username: "",
                    password: "",
                    domain: ""
                }
            }

            public hasValidLogin(): boolean {
                return (this.accountInfo.username != "" && this.accountInfo.password != "" && this.accountInfo.domain != "");
            }

            get AccountInfo(): IAccountInfo {
                return this.accountInfo;
            }

            set AccountInfo(newAccountInfo: IAccountInfo) {
                for (var key in newAccountInfo) {
                    this.accountInfo[key] = newAccountInfo[key];
                }
                // TODO: Store data in localStorage.
            }
        }
    }
}