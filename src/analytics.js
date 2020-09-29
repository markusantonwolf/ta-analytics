window.analytics = function() {
    return {
        ask: false,
        status: false,
        confirmed: false,
        default: {
            id: '',
            name: 'ta-analytics',
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
                    console.warn('Options are in wrong type - should be object - default options will be used')
                }
                for (let [key, value] of Object.entries(options)) {
                    this.default[key] = value
                }
            }
            this.loadStatus()
            if (this.status === null) {
                this.status = false
                this.ask = true
                return true
            }
            if (this.status === false) {
                return false
            }
            this.loadGoogleTagmanager()
        },
        accept() {
            this.saveStatus(true)
            this.loadGoogleTagmanager()
            this.confirmed = true
            setTimeout(() => {
                this.ask = false
            }, this.default.delay)
        },
        deny() {
            this.saveStatus(false)
            this.ask = false
        },
        loadStatus() {
            let status = null
            if (this.default.store === 'cookie') {
                status = this.getCookie(this.default.name)
            } else {
                status = localStorage.getItem(this.default.name)
            }
            if (status === null) {
                this.status = null
                return
            }
            this.status = status === 'true'
        },
        saveStatus(value) {
            if (this.default.test === true) {
                return
            }
            this.status = value
            if (this.default.store === 'cookie') {
                this.setCookie(this.default.name, value, this.default.days)
                return
            }
            localStorage.setItem(this.default.name, value)
        },
        getCookie(name) {
            var v = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)')
            return v ? v[2] : null
        },
        setCookie(name, value, days) {
            var d = new Date()
            d.setTime(d.getTime() + 24 * 60 * 60 * 1000 * days)
            document.cookie = name + '=' + value + ';path=/;expires=' + d.toGMTString()
        },
        loadGoogleTagmanager() {
            var head = document.getElementsByTagName('head')[0]
            var script = document.createElement('script')
            script.type = 'text/javascript'
            script.async = true
            script.onload = () => {
                this.callGoogleTagManager()
            }
            script.src = 'https://www.googletagmanager.com/gtag/js?id=' + this.default.id
            head.appendChild(script)
        },
        callGoogleTagManager() {
            console.info(this.default.message)
            window.dataLayer = window.dataLayer || []
            function gtag() {
                dataLayer.push(arguments)
            }
            gtag('js', new Date())
            gtag('config', this.default.id, {
                anonymize_ip: this.default.anonymize_ip,
                send_page_view: this.default.send_page_view,
            })
        },
    }
}
