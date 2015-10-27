/// <reference path="jquery.d.ts" />
/// <reference path="knockout.d.ts" />

module pulsar {
    export module api {
        export function login(username: string, password: string, domain: string): void {
            jQuery.ajax({
                url: '/api/PulsarApi/Login?Username=' + username + '&Password=' + password + '&Domain=' + domain,
                success: d => {
                    console.log(d);
                }
            });
        }
    }

    export module page {
        export function init(): void {
            pulsar.api.login('xxx', 'xxx', 'xxx');
        }
    }
}