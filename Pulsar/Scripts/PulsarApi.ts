/// <reference path="jquery.d.ts" />
/// <reference path="knockout.d.ts" />
/// <reference path="Pulsar.ts" />

module pulsar {
    export class api {
        private accountInfo: IAccountInfo;
        private iteration: IIteration;

        constructor() {
        }

        login(accountInfo: IAccountInfo, user: pulsar.data.user, loginWindow?: HTMLElement, loginGuid?: string): void {
            jQuery.ajax({
                url: '/api/PulsarApi/Login?Username=' + accountInfo.username + '&Password=' + accountInfo.password + '&Domain=' + accountInfo.domain,
                success: d => {
                    this.iteration = JSON.parse(d).iteration;
                    accountInfo.displayName = JSON.parse(d).accountInfo.displayName;
                    user.AccountInfo = accountInfo;
                    console.log(user.AccountInfo);
                    $(loginWindow).removeClass('plsr_action__showRotate').addClass('plsr_action__hiddenRotate');;
                    setTimeout(
                        () => {
                            $('.' + loginGuid).remove();
                        },
                        300
                    );
                }
            });
        }
    }
}