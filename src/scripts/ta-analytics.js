window.taAnalytics = () => {
    return {
        show: false,
        dialog: false,
        status: false,
        confirmed: false,
        options: {
            id: '',
            name: 'taAnalyticsStorage',
            question: 'question',
            confirmed: 'confirmed',
            declined: 'declined',
            anonymize_ip: true,
            send_page_view: true,
            store: 'cookie',
            days: 365,
            delay: 5000,
            message: 'Thank you for supporting our website',
            test: false,
        },
        init(options) {
            if (typeof options !== 'undefined') {
                if (typeof options !== 'object' || options instanceof Array) {
                    console.warn(
                        'TA-Analytics: Options are in wrong type - should be object - default options will be used'
                    );
                }
                for (let [key, value] of Object.entries(options)) {
                    this.options[key] = value;
                }
            }

            // checks if options are defined by data
            for (let [key, value] of Object.entries(this.$el.dataset)) {
                if (typeof this.options[key] !== 'undefined') {
                    this.options[key] = value;
                }
            }

            this.options.test = String(this.options.test).toLowerCase() === 'true';
            this.options.anonymize_ip = String(this.options.anonymize_ip).toLowerCase() === 'true';
            this.options.send_page_view =
                String(this.options.send_page_view).toLowerCase() === 'true';
            this.options.delay = parseInt(this.options.delay);
            this.options.days = parseInt(this.options.days);

            this.loadStatus();
            this.initAnimations();
            if (this.status === null) {
                this.status = false;
                this.dialog = true;
                this.show = true;
                return;
            }
            if (this.status === false) {
                return;
            }
            this.loadGoogleTagmanager();
        },
        accept() {
            this.saveStatus(true);
            this.loadGoogleTagmanager();
            this.confirmed = true;
            if (typeof this.$refs[this.options.question] !== 'undefined') {
                this.$refs[this.options.question].classList.remove('ta-analytics-anim-init');
                this.$refs[this.options.question].classList.add('ta-analytics-anim-out');
            }
            if (typeof this.$refs[this.options.confirmed] !== 'undefined') {
                this.$refs[this.options.confirmed].classList.add('ta-analytics-anim-in');
            }
            this.hide();
        },
        decline() {
            if (typeof this.$refs[this.options.question] !== 'undefined') {
                this.$refs[this.options.question].classList.remove('ta-analytics-anim-init');
                this.$refs[this.options.question].classList.add('ta-analytics-anim-out');
            }
            if (typeof this.$refs[this.options.declined] !== 'undefined') {
                this.$refs[this.options.declined].classList.add('ta-analytics-anim-in');
            }
            this.saveStatus(false);
            this.hide();
        },
        hide() {
            this.dialog = false;
            if (this.options.delay > 0) {
                setTimeout(() => {
                    this.show = false;
                }, this.options.delay);
            } else {
                this.show = false;
            }
        },
        initAnimations() {
            if (typeof this.$refs[this.options.question] !== 'undefined') {
                this.$refs[this.options.question].classList.add(
                    'ta-analytics-anim',
                    'ta-analytics-anim-init'
                );
                // not yet implemented
                // this.$refs[this.options.question].addEventListener("animationend", (event) => {
                //     console.info('animationend', event.animationName);
                // });
            }
            if (typeof this.$refs[this.options.confirmed] !== 'undefined') {
                this.$refs[this.options.confirmed].classList.add('ta-analytics-anim');
                // not yet implemented
                // this.$refs[this.options.confirmed].addEventListener("animationend", (event) => {
                //     console.info('animationend', event.animationName);
                // });
            }
        },
        loadStatus() {
            let status = null;
            if (this.options.store === 'cookie') {
                status = this.getCookie(this.options.name);
            } else {
                status = localStorage.getItem(this.options.name);
            }
            if (status === null) {
                this.status = null;
                return;
            }
            this.status = status === 'true';
        },
        saveStatus(value) {
            if (this.options.test === true) {
                console.info('TA Analytics is running in test mode - no data will be stored');
                return;
            }
            this.status = value;
            if (this.options.store === 'cookie') {
                this.setCookie(this.options.name, value, this.options.days);
                return;
            }
            localStorage.setItem(this.options.name, value);
        },
        getCookie(name) {
            var v = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
            return v ? v[2] : null;
        },
        setCookie(name, value, days) {
            var d = new Date();
            d.setTime(d.getTime() + 24 * 60 * 60 * 1000 * days);
            document.cookie = name + '=' + value + ';path=/;expires=' + d.toGMTString();
        },
        loadGoogleTagmanager() {
            var head = document.getElementsByTagName('head')[0];
            var script = document.createElement('script');
            script.type = 'text/javascript';
            script.async = true;
            script.onload = () => {
                this.callGoogleTagManager();
            };
            script.src = 'https://www.googletagmanager.com/gtag/js?id=' + this.options.id;
            head.appendChild(script);
        },
        callGoogleTagManager() {
            console.info(this.options.message);
            window.dataLayer = window.dataLayer || [];
            function gtag() {
                dataLayer.push(arguments);
            }
            gtag('js', new Date());
            gtag('config', this.options.id, {
                anonymize_ip: this.options.anonymize_ip,
                send_page_view: this.options.send_page_view,
            });
        },
    };
};
