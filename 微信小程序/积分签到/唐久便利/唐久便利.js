/*
作者：管虎
抓手机端小程序签到请求头里面的authorization#accept-serial#User-Agent填到环境变量'tjblck'里，多账号@连接
积分+钱可以换点东西买买，感觉似乎也没便宜多少，但是总比不便宜好
*/
const $ = new Env('唐久便利签到');
let tjblck = ($.isNode() ? process.env['tjblck'] : $.getdata('tjblck')) || '';
const axios = require('axios');
const { copyFileSync, rmSync } = require('fs');
const { resourceLimits } = require('worker_threads');
let httpresult, result, num

function sleep(delay) {
    var start = (new Date()).getTime();
    while ((new Date()).getTime() - start < delay) {
        continue;
    }
}
function popu(method, url, authorization,ua,accept_serial, data = '') {
    if (data == '') {
        const config = {
            method: method,
            url: url,
            headers: {
                "Host": "api.xiantjbl.com",
                "Connection": "keep-alive",
                "authorization": authorization,
                "charset": "utf-8",
                "accept-language": "zh",
                "User-Agent": ua,
                "content-type": "application/json",
                "Accept-Encoding": "gzip,compress,br,deflate",
                "accept-serial": accept_serial
            }
        };
        return config
    } else {
        const config = {
            method: method,
            url: url,
            headers: {
                "Host": "api.xiantjbl.com",
                "Connection": "keep-alive",
                "authorization": authorization,
                "charset": "utf-8",
                "accept-language": "zh",
                "User-Agent": ua,
                "content-type": "application/json",
                "Accept-Encoding": "gzip,compress,br,deflate",
                "accept-serial": accept_serial
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
            throw new Error(error);
        });
}
async function sign(authorization,accept_serial,ua) {
        let url = "https://api.xiantjbl.com/prod-api/user/score/userSignDay"
        let config = popu('get',url,authorization,ua,accept_serial)
        await fetchData(config)
        result = httpresult 
        console.log(result)
}

async function monthly(authorization,accept_serial,ua){
    let url = "https://api.xiantjbl.com/prod-api/user/score/queryUserSignList?signMonth\u003d"
    let config = popu('get',url,authorization,ua,accept_serial)
    await fetchData(config)
    result = httpresult 
    console.log(`本月签到${result.data.numCount}次，共获得积分：${result.data.scoreCount}`)
}

async function total(authorization,accept_serial,ua){
    let url = "https://api.xiantjbl.com/prod-api/user/score/queryUserScoreItem"
    let config = popu('get',url,authorization,ua,accept_serial)
    await fetchData(config)
    result = httpresult 
    console.log(`当前账户总积分：${result.data.totalScore}，昵称：${result.data.nickName}`)
}
async function curl() {
    let url = "http://wanhu.atwebpages.com/"
    let config={
        method: "get",
        url: url}
    await fetchData(config)
    result=httpresult
    console.log(result)
}
(async function () {
    await curl()
    console.log('开始检测环境变量')
    if (tjblck) {
        console.log('找到环境变量')
        let q_tjblck = tjblck.split('@')
        if (q_tjblck.length > 1) {
            console.log('发现多个账号')
        }
        for (let i = 0; i < q_tjblck.length; i++) {
            try {
                let authorization = q_tjblck[i].split('#')[0]
                let accept_serial = q_tjblck[i].split('#')[1]
                let ua=q_tjblck[i].split('#')[2]
                await sign(authorization,accept_serial,ua)
                sleep(3000)
                await monthly(authorization,accept_serial,ua)
                sleep(3000)
                await total(authorization,accept_serial,ua)
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
