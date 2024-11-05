/*
作者：管虎
it之家签到脚本，抓包抓napi.ithome.com后面的userhash，签到可以嫖积分，不过感觉要撸很久才能兑换东西
脚本源自项目：https://github.com/wanhu-star/qlcollection
tg玩耍群：https://t.me/+etXUqgeMnYU4Nzgx
羊毛投稿： https://t.me/GuanHuCom_bot
脚本有自写，也有网上嫖的，加密脚本使用注意安全，最好多开几个docker，防止芭比q
*/
const $ = new Env('it之家签到');
let it_userhash = ($.isNode() ? process.env['it_userhash'] : $.getdata('it_userhash')) || '';
const axios = require('axios');
const crypto = require('crypto');
const { copyFileSync, rmSync } = require('fs');
const { resourceLimits } = require('worker_threads');
let httpresult, result

function sleep(delay) {
    var start = (new Date()).getTime();
    while ((new Date()).getTime() - start < delay) {
        continue;
    }
}
function popu(method, url, data = '') {
    if (method == 'post') {
        const config = {
            method: method,
            url: url,
            headers: {
                "content-type":"application/x-www-form-urlencoded",
                "User-Agent":"Dalvik/2.1.0 (Linux; U; Android 14; Mi Note 3 Build/UP1A.231105.003)",
                "Host":"napi.ithome.com",
                "Accept-Encoding":"gzip"
            }
        };
        return config
    } else {
        const config = {
            method: method,
            url: url,
            headers: {
                "content-type":"application/x-www-form-urlencoded",
                "User-Agent":"Dalvik/2.1.0 (Linux; U; Android 14; Mi Note 3 Build/UP1A.231105.003)",
                "Host":"napi.ithome.com",
                "Accept-Encoding":"gzip"
            },
            data: data
        };
        return config
    }
}
// 定义请求的配置
// 发送请求
async function fetchData(config) {
    return axios(config)
        .then(response => {
            if (response.data) {
                if (typeof response.data == "object") {
                    httpresult = response.data;
                } else {
                    try {
                        httpresult = JSON.parse(response.data);
                    } catch (e) {
                        httpresult = response.data;
                        // console.log(response.data)
                    }
                }
            }
            return response.data;
        })
        .catch(error => {
            console.error('Axios error caught:', error.message);
            if (error.response) {
                if (axios.isAxiosError(error)) {
                    // 服务器返回了状态码和响应数据  
                    console.error('Status code:', error.response.status);
                    console.error('Status text:', error.response.statusText);
                    httpresult=error.response.data;
                } 
            } 
        });
}
async function login(token){
    let url = "https://napi.ithome.com/api/usersign/getsigninfo?userHash="+token
    let config = popu("get",url)
    await fetchData(config)
    result=httpresult
    console.log(`你当前的积分为${result.totalcoin}`)
}
async function  sign(token) {
    let url = "https://napi.ithome.com/api/usersign/sign?userHash="+token
    let config = popu("get",url)
    await fetchData(config)
    result=httpresult
    console.log(result)
    sleep(2000)
    await login(token)
}

(async function () {
    sleep(1000)
    console.log('开始检测环境变量')
    if (it_userhash) {
        console.log('找到环境变量')
        let q_it_userhash = it_userhash.split('@')
        if (q_it_userhash.length > 1) {
            console.log('发现多个账号')
        }
        for (let i = 0; i < q_it_userhash.length; i++) {
            try {
                let token = q_it_userhash[i].split('#')[0]
                await login(token)
                sleep(2500)
                await sign(token)
            } catch (error) {
                console.error(error);
            }
        }
        process.exit()
    }
})();
function Env(a, b) {
    return "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0), new class {
        constructor(a, b) {
            this.name = a, this.notifyStr = "", this.startTime = (new Date).getTime(), Object.assign(this, b), console.log(`\ud83d\udd14 ${this.name} 开始运行：
`)
        } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } getdata(b) { let a = this.getval(b); if (/^@/.test(b)) { let [, c, f] = /^@(.*?)\.(.*?)$/.exec(b), d = c ? this.getval(c) : ""; if (d) try { let e = JSON.parse(d); a = e ? this.lodash_get(e, f, "") : a } catch (g) { a = "" } } return a } setdata(c, d) { let a = !1; if (/^@/.test(d)) { let [, b, e] = /^@(.*?)\.(.*?)$/.exec(d), f = this.getval(b), i = b ? "null" === f ? null : f || "{}" : "{}"; try { let g = JSON.parse(i); this.lodash_set(g, e, c), a = this.setval(JSON.stringify(g), b) } catch (j) { let h = {}; this.lodash_set(h, e, c), a = this.setval(JSON.stringify(h), b) } } else a = this.setval(c, d); return a } getval(a) { return this.isSurge() || this.isLoon() ? $persistentStore.read(a) : this.isQuanX() ? $prefs.valueForKey(a) : this.isNode() ? (this.data = this.loaddata(), this.data[a]) : this.data && this.data[a] || null } setval(b, a) { return this.isSurge() || this.isLoon() ? $persistentStore.write(b, a) : this.isQuanX() ? $prefs.setValueForKey(b, a) : this.isNode() ? (this.data = this.loaddata(), this.data[a] = b, this.writedata(), !0) : this.data && this.data[a] || null } send(b, a, f = () => { }) { if ("get" != b && "post" != b && "put" != b && "delete" != b) { console.log(`无效的http方法：${b}`); return } if ("get" == b && a.headers ? (delete a.headers["Content-Type"], delete a.headers["Content-Length"]) : a.body && a.headers && (a.headers["Content-Type"] || (a.headers["Content-Type"] = "application/x-www-form-urlencoded")), this.isSurge() || this.isLoon()) { this.isSurge() && this.isNeedRewrite && (a.headers = a.headers || {}, Object.assign(a.headers, { "X-Surge-Skip-Scripting": !1 })); let c = { method: b, url: a.url, headers: a.headers, timeout: a.timeout, data: a.body }; "get" == b && delete c.data, $axios(c).then(a => { let { status: b, request: c, headers: d, data: e } = a; f(null, c, { statusCode: b, headers: d, body: e }) }).catch(a => console.log(a)) } else if (this.isQuanX()) a.method = b.toUpperCase(), this.isNeedRewrite && (a.opts = a.opts || {}, Object.assign(a.opts, { hints: !1 })), $task.fetch(a).then(a => { let { statusCode: b, request: c, headers: d, body: e } = a; f(null, c, { statusCode: b, headers: d, body: e }) }, a => f(a)); else if (this.isNode()) { this.got = this.got ? this.got : require("got"); let { url: d, ...e } = a; this.instance = this.got.extend({ followRedirect: !1 }), this.instance[b](d, e).then(a => { let { statusCode: b, request: c, headers: d, body: e } = a; f(null, c, { statusCode: b, headers: d, body: e }) }, b => { let { message: c, response: a } = b; f(c, a, a && a.body) }) } } time(a) { let b = { "M+": (new Date).getMonth() + 1, "d+": (new Date).getDate(), "h+": (new Date).getHours(), "m+": (new Date).getMinutes(), "s+": (new Date).getSeconds(), "q+": Math.floor(((new Date).getMonth() + 3) / 3), S: (new Date).getMilliseconds() }; for (let c in /(y+)/.test(a) && (a = a.replace(RegExp.$1, ((new Date).getFullYear() + "").substr(4 - RegExp.$1.length))), b) new RegExp("(" + c + ")").test(a) && (a = a.replace(RegExp.$1, 1 == RegExp.$1.length ? b[c] : ("00" + b[c]).substr(("" + b[c]).length))); return a } async showmsg() { if (!this.notifyStr) return; let a = this.name + " \u8FD0\u884C\u901A\u77E5\n\n" + this.notifyStr; if ($.isNode()) { var b = require("./sendNotify"); console.log("\n============== \u63A8\u9001 =============="), await b.sendNotify(this.name, a) } else this.msg(a) } logAndNotify(a) { console.log(a), this.notifyStr += a, this.notifyStr += "\n" } msg(d = t, a = "", b = "", e) { let f = a => { if (!a) return a; if ("string" == typeof a) return this.isLoon() ? a : this.isQuanX() ? { "open-url": a } : this.isSurge() ? { url: a } : void 0; if ("object" == typeof a) { if (this.isLoon()) { let b = a.openUrl || a.url || a["open-url"], c = a.mediaUrl || a["media-url"]; return { openUrl: b, mediaUrl: c } } if (this.isQuanX()) { let d = a["open-url"] || a.url || a.openUrl, e = a["media-url"] || a.mediaUrl; return { "open-url": d, "media-url": e } } if (this.isSurge()) return { url: a.url || a.openUrl || a["open-url"] } } }; this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(d, a, b, f(e)) : this.isQuanX() && $notify(d, a, b, f(e))); let c = ["", "============== \u7CFB\u7EDF\u901A\u77E5 =============="]; c.push(d), a && c.push(a), b && c.push(b), console.log(c.join("\n")) } getMin(a, b) { return a < b ? a : b } getMax(a, b) { return a < b ? b : a } padStr(e, b, f = "0") { let a = String(e), g = b > a.length ? b - a.length : 0, c = ""; for (let d = 0; d < g; d++)c += f; return c + a } json2str(b, e, f = !1) { let c = []; for (let d of Object.keys(b).sort()) { let a = b[d]; a && f && (a = encodeURIComponent(a)), c.push(d + "=" + a) } return c.join(e) } str2json(e, f = !1) { let d = {}; for (let a of e.split("#")) { if (!a) continue; let b = a.indexOf("="); if (-1 == b) continue; let g = a.substr(0, b), c = a.substr(b + 1); f && (c = decodeURIComponent(c)), d[g] = c } return d } randomString(d, a = "abcdef0123456789") { let b = ""; for (let c = 0; c < d; c++)b += a.charAt(Math.floor(Math.random() * a.length)); return b } randomList(a) { let b = Math.floor(Math.random() * a.length); return a[b] } wait(a) { return new Promise(b => setTimeout(b, a)) } done(a = {}) {
            let b = (new Date).getTime(), c = (b - this.startTime) / 1e3; console.log(`
${this.name} 运行结束，共运行了 ${c} 秒！`), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(a)
        }
    }(a, b)
}
