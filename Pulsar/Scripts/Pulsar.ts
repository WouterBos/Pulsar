/// <reference path="jquery.d.ts" />
/// <reference path="knockout.d.ts" />

export module pulsar {
    export class api {
        private accountInfo: IAccountInfo;
        private iteration: IIteration;

        constructor() {
        }

        hasCredentials(): boolean {
            return (this.accountInfo != null);
        }

        login(accountInfo: IAccountInfo, loginWindow?: HTMLElement, loginGuid?: string): void {
            this.accountInfo = accountInfo;
            jQuery.ajax({
                url: '/api/PulsarApi/Login?Username=' + this.accountInfo.username + '&Password=' + this.accountInfo.password + '&Domain=' + this.accountInfo.domain,
                success: d => {
                    this.iteration = JSON.parse(d).iteration;
                    this.accountInfo.displayName = JSON.parse(d).accountInfo.displayName;
                    console.log(this.accountInfo.displayName);
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

    export class widgets {
        private template = "";

        constructor(templateURL: string, callback: () => any) {
            jQuery.ajax({
                url: templateURL,
                success: d => {
                    this.template = d;
                    callback();
                },
                error: d => {
                    throw Error('Could not load templates');
                }
            });
        }

        getTemplate(selector: string): string {
            return $(this.template).filter(selector).html();
        }

        generateGuid() : string {
            function s4(): string {
                return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
            }
            return 'classId-' + s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
        }
    }

    export class test {
        constructor() {
        }

        calculate(int1: number, int2: number): number {
            return int1 + int2;
        }
    }

    export module widgets {
        export class login {
            private template = "";
            private guid = "";
            private root: JQuery;

            constructor(widget: pulsar.widgets) {
                this.guid = widget.generateGuid();
                this.template = widget.getTemplate('#plsr_template_modal');
                this.template = this.template.replace(/(plsr_modal_window)/, '$1 plsr_action plsr_action__hiddenRotate');
                this.root = $(this.template).addClass(this.guid);
            }

            open(callback: (accountInfo: IAccountInfo, loginWindow?: HTMLElement, loginGuid?: string) => void) {
                $(this.root).find('.' + this.guid + '.plsr_modal_window').addClass('plsr_action plsr_action__hiddenRotate')
                this.root = $('body').append(this.root);
                var loginWindow: HTMLElement = this.root.find('.' + this.guid + '.plsr_modal_window')[0];
                setTimeout(
                    () => {
                        $(loginWindow).addClass('plsr_action__showRotate').removeClass('plsr_action__hiddenRotate');
                    },
                    30
                );

                function loginViewModel() {
                    this.username = ko.observable("");
                    this.password = ko.observable("");
                    this.domain = ko.observable("");
                    this.cansave = ko.computed((): boolean => {
                        return (this.username() != "" && this.password() != "" && this.domain() != "");
                    });
                    this.submit = function(): void {
                        var accountInfo: IAccountInfo = {
                            username: this.username().toString(),
                            password: this.password().toString(),
                            domain: this.domain().toString()
                        }
                        callback(accountInfo, loginWindow, this.guid);
                    };
                }

                ko.applyBindings(new loginViewModel(), $(this.root).find('.plsr_js_modal_window')[0]);
            }
        }
    }

    export module page {
        var api: pulsar.api;
        var widgets: pulsar.widgets;
        var credentials: {};
        var widgets: pulsar.widgets;
        var login: pulsar.widgets.login;

        export function init(templateUrl: string): void {
            widgets = new pulsar.widgets(templateUrl, init2);
        }

        function init2(): void {
            api = new pulsar.api();
            if (api.hasCredentials() == false) {
                login = new pulsar.widgets.login(widgets);
                login.open(api.login);
            }
        }
    }

    export interface IAccountInfo {
        username: string
        password: string
        domain: string
        displayName?: string
    }

    export interface IIteration {
        id: number
        startDate: string
        endDate: string
    }
}