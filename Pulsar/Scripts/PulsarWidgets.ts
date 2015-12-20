/// <reference path="jquery.d.ts" />
/// <reference path="knockout.d.ts" />
/// <reference path="Pulsar.ts" />

module pulsar {
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

        generateGuid(): string {
            function s4(): string {
                return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
            }
            return 'classId-' + s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
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

            open(callback: pulsar.api, user: pulsar.data.user) {
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
                    this.rememberLogin = ko.observable(false);
                    this.cansave = ko.computed((): boolean => {
                        return (this.username() != "" && this.password() != "" && this.domain() != "");
                    });
                    this.submit = function (): void {
                        var accountInfo: IAccountInfo = {
                            username: this.username().toString(),
                            password: this.password().toString(),
                            domain: this.domain().toString(),
                            rememberLogin: this.rememberLogin().toString()
                        }
                        callback.login(accountInfo, user, loginWindow, this.guid);
                    };
                }

                ko.applyBindings(new loginViewModel(), $(this.root).find('.plsr_js_modal_window')[0]);
            }
        }
    }
}