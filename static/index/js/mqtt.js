/* @file mqtt.chat.js
 * @date 2018.03.30 16:51:01
 */
(function ($, undefined) {
    var CON_UID = "ntguest";
    var CON_PWD = "xiaoneng123";
    $.Connection = {
        name: "Connection",
        debug: true,
        client: null,
        mqttMessageTopic: "",
        mqttWillTopic: "",
        chatRouteTopic: "",
        sessionId: "",
        _urlExp: /(wss?:)\/\/(.*?):(\d+)\/(\w+)/gi,
        _ssl: false,
        _mqttserver: "",
        _clientId: "",
        _protocol: "",
        _host: "",
        _port: 80,
        _path: "",
        _options: "",
        _conn: false,
        _reconnectCount: 0,
        _waitTime: 0,
        _timeout: 6,
        _keepAliveInterval: 60,
        eventCallback: {onConnectSuccess: {}, onConnectFailure: {}, onResponse: {}, onPublish: {}},
        status: true,
        connect: function (url, clientId) {
            this._conn = true;
            if (!this.client || !this.client.isConnected()) {
                return this._connectMqtt(url, clientId)
            } else {
                this._fireEvent("onConnectSuccess", this.mqttMessageTopic)
            }
            return true
        },
        disconnect: function () {
            this._conn = false;
            this.status = false;
            if (this.client && this.client.isConnected()) {
                this._disconnectMqtt()
            }
        },
        publish: function (jsonMessage, topic) {
            var strMessage, objMessage;
            if (!this.client || !this.client.isConnected()) {
                if (this.debug) {
                    $.Log(this._clientId + " publish failure, client disconnect", 3)
                }
                return false
            }
            if (!jsonMessage || typeof jsonMessage !== "object") {
                if (this.debug) {
                    $.Log(this._clientId + " publish param jsonMessage failure", 3)
                }
                return false
            }
            strMessage = $.JSON.toJSONString(jsonMessage);
            topic = topic || this.chatRouteTopic;
            if (!topic) {
                if (this.debug) {
                    $.Log(this._clientId + " publish param topic is null>" + strMessage)
                }
                return false
            }
            objMessage = this._mqttMessage(strMessage, topic);
            if (this.debug) {
                $.Log(this._clientId + " $.Connection.publish(" + strMessage + ", " + topic + ")", 2)
            }
            return this.client.send(objMessage)
        },
        register: function (appId, eventName, callback) {
            var arr, method, registered = false;
            var self = this;
            if (typeof callback === "function") {
                if (typeof this.eventCallback[eventName] === "undefined") {
                    this.eventCallback[eventName] = {}
                }
                $.each(this.eventCallback[eventName], function (key, func) {
                    if (func === callback || appId === key) {
                        registered = true
                    }
                });
                if (registered !== true) {
                    if (this.debug) {
                        $.Log(this._clientId + " $.Connection.reqister(" + eventName + ")")
                    }
                    this.eventCallback[eventName][appId] = callback
                }
            } else if (typeof callback === "string") {
                arr = methodName.split(".");
                mehtod = $;
                $.each(arr, function (i, value) {
                    mehtod = mehtod[value]
                });
                if (typeof this.eventCallback[key] === "undefined") {
                    this.eventCallback[key] = {}
                }
                $.each(this.eventCallback[eventName], function (key, func) {
                    if (func === mehtod || appId === key) {
                        registered = true
                    }
                });
                if (registered !== true) {
                    if (this.debug) {
                        $.Log(this._clientId + " $.Connection.reqister(" + methodName + ")")
                    }
                    this.eventCallback[eventName][appId] = mehtod
                }
            }
        },
        unregister: function (appId) {
            var self = this;
            $.each(this.eventCallback, function (methodName, methods) {
                $.each(methods, function (key, func) {
                    if (key === appId) {
                        delete self.eventCallback[methodName][key]
                    }
                })
            })
        },
        subscribe: function (topic, options) {
            if (!this.client || !this.client.isConnected()) {
                return false
            }
            if (this.debug) {
                $.Log(this._clientId + " $.Connection.subscribe(" + topic + ")")
            }
            var self = this;
            options = $.extend({qos: 1}, options);
            this.client.subscribe(topic, options)
        },
        unsubscribe: function (topic) {
            if (!this.client || !this.client.isConnected() || !topic) {
                return false
            }
            if (this.debug) {
                $.Log(this._clientId + " $.Connection.unsubscribe(" + topic + ")")
            }
            this.client.unsubscribe(topic)
        },
        onConnectionLost: function (response) {
            var self = this;
            if (response.errorCode === 0) {
                return
            }
            if (this.debug) {
                $.Log(this._clientId + " $.Connection.onConnectionLost() > " + response.errorMessage, 3)
            }
            this._reconnectMqtt()
        },
        onPublish: function (message) {
            var data, method;
            if (!this.client || !this.client.isConnected()) {
                return false
            }
            if (this.debug) {
                $.Log(this._clientId + " $.Connection.onPublish() > " + message.payloadString, 2)
            }
            try {
                data = $.JSON.parseJSON(message.payloadString)
            } catch (e) {
                try {
                    data = JSON.parse(message.payloadString)
                } catch (e1) {
                    data = {};
                    $.Log("$.Connection.onPublish(): " + e1.message, 3)
                }
            }
            method = data.method || "";
            if (method === "responseServer") {
                this.responseServer.apply(this, Array.prototype.concat.call([message.destinationName], data.params))
            } else if (method) {
                this._fireEvent("onPublish", Array.prototype.concat.call([message.destinationName, method], data.params))
            }
        },
        responseServer: function (topic, cTopic, cWillTopic, sTopic, sId) {
            var self = this;
            this.subscribe(cWillTopic, {
                onSuccess: function (result) {
                    if (this.debug) {
                        $.Log(self._clientId + " $.Connection.subscribe()>" + $JSON.toJSONString(result), 2)
                    }
                }, onFailure: function (error) {
                    if (this.debug) {
                        $.Log(self._clientId + " $.Connection.subscribe()>" + $JSON.toJSONString(error), 3)
                    }
                    self._fireEvent("onConnectSuccess", self.mqttMessageTopic)
                }
            });
            this.subscribe(sTopic);
            this._fireEvent("onResponse", topic, cTopic, cWillTopic, sTopic, sId)
        },
        getRegisterMethod: function () {
            return this.eventCallback
        },
        _connectMqtt: function (url, clientId) {
            var self = this;
            var mqttserver = url;
            if (!this._mqttserver || this._mqttserver !== mqttserver) {
                mqttserver = mqttserver || this._mqttserver;
                if (!this._format(mqttserver)) {
                    return false
                }
                this.chatRouteTopic = "S/ROUTE/" + this._path
            }
            if (!this._clientId || this._clientId !== clientId) {
                this._clientId = clientId || this._clientId;
                if (!this._clientId) {
                    return false
                }
                this.mqttMessageTopic = "C/" + this._clientId;
                this.mqttWillTopic = "S/WILL/" + this._clientId
            }
            this._options = {
                userName: CON_UID,
                password: CON_PWD,
                useSSL: this._ssl,
                timeout: this._timeout,
                keepAliveInterval: this._keepAliveInterval,
                cleanSession: false,
                willMessage: this._mqttMessage("{}"),
                mqttVersion: 4,
                onSuccess: function () {
                    self._success()
                },
                onFailure: function (e) {
                    self._failure(e)
                }
            };
            if ($.browser.supportMqtt) {
                if (!this.client) {
                    if (this.debug) {
                        $.Log("connect mqtt server", 2)
                    }
                    this.client = new $.MQTT.Client(this._host, this._port, this._clientId);
                    this.client.onConnectionLost = function (response) {
                        self.onConnectionLost(response)
                    };
                    this.client.onMessageArrived = function (message) {
                        self.onPublish(message)
                    }
                } else {
                    if (this.debug) {
                        $.Log("reconnect mqtt server", 2)
                    }
                }
                this.client.connect(this._options);
                if (this.debug) {
                    this.client.startTrace()
                }
            } else {
                this.client = $.MQTT.flashSock;
                this.client.onConnectionLost = function (response) {
                    self.onConnectionLost(response)
                };
                this.client.onMessageArrived = function (message) {
                    self.onPublish(message)
                };
                this.client.init(this._host, this._port, this._clientId, this._options)
            }
        },
        _reconnectMqtt: function () {
            if ((!this.client || !this.client.isConnected()) && this._conn) {
                var self = this;
                if (++this._reconnectCount <= 3) {
                    this._waitTime = 50
                } else {
                    this._waitTime = +"034567890".charAt(Math.ceil(Math.random() * 5)) * 1e3
                }
                if (this.debug) {
                    $.Log(this._clientId + " wait recontent mqtt:" + this._waitTime, 3)
                }
                if (!this.status) {
                    return
                }
                this._fireEvent("onConnectFailure", this.mqttMessageTopic);
                setTimeout(function () {
                    self._connectMqtt(self._mqttserver, self._clientId)
                }, this._waitTime)
            }
        },
        _disconnectMqtt: function () {
            var message = this._mqttMessage("{}");
            this.publish(message, this.mqttWillTopic);
            this.unsubscribe(this.mqttMessageTopic);
            if (this.client) {
                if (this.debug) {
                    this.client.stopTrace()
                }
                this.client.disconnect();
                if (this.client.clear) {
                    this.client.clear()
                }
            }
            this.client = null
        },
        _format: function (mqttserver) {
            var math, url;
            if (!mqttserver || mqttserver === "") {
                return false
            }
            if ($.isObject(mqttserver)) {
                if ($.browser.supportMqtt) {
                    if (($.protocol === "http:" || $.protocol === "file:") && $.flashserver.usehttps == 0) {
                        url = mqttserver.ws ? mqttserver.ws : mqttserver.wss.replace(/^wss:/, "ws:")
                    } else {
                        url = mqttserver.wss ? mqttserver.wss : mqttserver.ws.replace(/^ws:/, "wss:")
                    }
                } else {
                    url = mqttserver.tcp
                }
            } else {
                url = mqttserver
            }
            math = this._urlExp.exec(url);
            if (!math || !math.length) {
                math = url.replace(/(wss?|tcp):\/\//gi, ",$1,").replace(/:(\d+)/gi, ",$1").replace(/\//gi, ",").split(",");
                if (!math || !math.length) {
                    $.Log("url:" + url + ", math:" + math, 2)
                }
            }
            this._protocol = $.flashserver.usehttps == 1 ? "wss:" : math[1] || "ws:";
            this._ssl = this._protocol === "wss:";
            this._host = math[2];
            this._port = Number(math[3]) || (this._ssl ? 443 : 80);
            this._path = math[4] || "mqtt";
            this._mqttserver = url;
            return true
        },
        _success: function () {
            if (this.debug) {
                $.Log(this._clientId + " $.Connection connect success.")
            }
            this._reconnectCount = 0;
            this.subscribe(this.mqttMessageTopic);
            this._fireEvent("onConnectSuccess", this.mqttMessageTopic)
        },
        _failure: function (e) {
            if (this.debug) {
                $.Log(this._clientId + " $.Connection connect failure.")
            }
            this._fireEvent("onConnectFailure", this.mqttMessageTopic);
            this._reconnectMqtt()
        },
        _fireEvent: function () {
            var me = this;
            var args = Array.prototype.slice.call(arguments);
            var method = args[0];
            var params = args.slice(1);
            $.each(this.eventCallback[method], function (key, func) {
                if (method === "onResponse") {
                    func.apply(me, params.slice(1))
                } else {
                    func.apply(me, params)
                }
            })
        },
        _mqttMessage: function (strMessage, topic) {
            var message = new $.MQTT.Message(strMessage);
            topic = topic || this.mqttWillTopic;
            message.qos = 1;
            message.destinationName = topic;
            return message
        }
    };
    $(window).bind("unload", function () {
        $.Connection.disconnect()
    })
})(nTalk);
(function ($, undefined) {
    $.Connection.TChat = $.Class.create();
    $.Connection.TChat.prototype = {
        name: "TChat",
        options: null,
        data: null,
        connect: null,
        debug: false,
        login: false,
        connected: false,
        status: false,
        defBody: {bold: false, italic: false, color: "000000", fontsize: "14", underline: false},
        clientWillTopic: "",
        serverTopic: "",
        clientTopic: "",
        _reconnect_mqtt_count: 0,
        _reconnect_tchat_count: 0,
        _waitReconnectTimeID: null,
        _roomConnectTimeID: null,
        _roomConnectTimeout: 5e3,
        roomConnectTimeout: 2e3,
        robotQueue: 0,
        _roomConnect_count: 0,
        startType: 0,
        initialize: function (options) {
            this.sendHASH = new $.HASH;
            this.receiveHASH = new $.HASH;
            this.completeHASH = new $.HASH;
            this.data = $.store;
            this._reconnect_tchat_count = 0;
            this._reconnect_mqtt_count = 0;
            this._roomConnect_count = 0;
            this.options = $.extend({
                deviceType: $.browser.mobile ? 3 : 0,
                chatType: "0",
                chatValue: "0"
            }, $.whereGet(options, ["siteid", "settingid", "tchatmqttserver", "tchatgoserver", "serverurl", "machineID", "userid", "username", "sessionid", "destid", "resourceurl", "statictis", "htmlsid", "connectid", "userlevel", "disconnecttime", "mini", "chattype", "chatvalue", "edu_invisitid", "edu_visitid", "usertag", "userrank"], ["siteId", "settingId", "tchatmqttserver", "tchatgoserver", "serverurl", "machineID", "userId", "userName", "sessionId", "targetId", "resourceurl", "statictis", "htmlSid", "connectId", "userLevel", "disconnectTime", "mini", "chatType", "chatValue"]));
            this.options.edu_invisitid ? this.startType = 1 : this.startType = 0;
            if (!this.options.machineID || this.options.machineID.length <= 10) {
                this.options.machineID = this.data.get("machineid");
                if (!this.options.machineID || this.options.machineID.length <= 10) {
                    this.options.machineID = $.base._createScriptPCID()
                }
            }
            this.data.set("machineid", this.options.machineID);
            var tchatmqttserver = this.options.tchatmqttserver.toString().split(";");
            this.options.tchatmqttserver = {};
            for (var i = 0; i < tchatmqttserver.length; i++) {
                if (!tchatmqttserver[i]) continue;
                if (tchatmqttserver[i].indexOf("ws:") > -1) {
                    this.options.tchatmqttserver.ws = tchatmqttserver[i]
                } else if (tchatmqttserver[i].indexOf("wss:") > -1) {
                    this.options.tchatmqttserver.wss = tchatmqttserver[i]
                } else if (tchatmqttserver[i].indexOf("tcp") > -1) {
                    this.options.tchatmqttserver.tcp = tchatmqttserver[i]
                }
            }
            this.clientId = this.options.connectId;
            if (!this.options.userId) {
                this.options.userId = $.base.userIdFix + this.options.machineID.substr(0, 21)
            }
            if (this.debug) {
                $.Log("initialize mqtt chatConnect")
            }
            this.status = true;
            this.firstConnected = true;
            this._initQueue();
            this.loginConnect()
        },
        loginConnect: function () {
            var self = this;
            $.Log("connect tChat", 1);
            this.connect = $.Connection;
            this.connect.register(this.options.settingId, "onConnectSuccess", function () {
                self.requestServer()
            });
            this.connect.register(this.options.settingId, "onConnectFailure", function () {
                self._onAbnormal.apply(self, arguments);
                if ($.browser.supportMqtt) {
                    self._callback("fIM_callStat", ["mqtt", self.options.settingId, "failure"])
                } else {
                    self._callback("fIM_callStat", ["flash", self.options.settingId, "failure"])
                }
            });
            this.connect.register(this.options.settingId, "onResponse", function (cTopic, cWillTopic, sTopic, settingId) {
                self.roomConnect(cTopic, cWillTopic, sTopic, settingId);
                if ($.browser.supportMqtt) {
                    self._callback("fIM_callStat", ["mqtt", self.options.settingId, "success"])
                } else {
                    self._callback("fIM_callStat", ["flash", self.options.settingId, "success"])
                }
            });
            this.connect.register(this.options.settingId, "onPublish", function () {
                self._onCallback.apply(self, arguments)
            });
            this.connect.connect(this.options.tchatmqttserver, self.clientId);
            this.sessionIdleReplys = {};
            this.sessionIdleReplys[+this.options.disconnectTime] = "超时未发送消息，自动断开连接"
        },
        requestServer: function () {
            var self = this;
            if (this.connected) {
                return false
            }
            this.connected = true;
            this.connect.publish({
                method: "requestServer",
                params: [this.options.userId, this.clientId, this.options.settingId, this.options.targetId, this.options.sessionId]
            }, this.connect.chatRouteTopic);
            this._roomConnectTimeID = setTimeout(function () {
                self.reconnect()
            }, this._roomConnectTimeout)
        },
        roomConnect: function (cTopic, cWillTopic, sTopic, settingId) {
            var self = this;
            if (this.options.settingId !== settingId) {
                return false
            }
            $.Log("$.Connection.TChat.roomConnect(" + cTopic + ", " + cWillTopic + ", " + sTopic + ", " + settingId + ")");
            this.clientTopic = cTopic;
            this.clientWillTopic = cWillTopic;
            this.serverTopic = sTopic;
            var str = '{inviteid:"' + this.options.edu_invisitid + '",visitid:"' + this.options.edu_visitid + '"}';
            this.connect.publish({
                method: "roomConnect",
                params: [this.options.userId, "", this.options.sessionId, this.options.targetId, this.options.machineID, this.options.deviceType, this.options.chatType, this.options.chatValue, this.options.userName, this.options.userLevel, this.options.settingId, this._roomConnect_count, this.startType, str, {
                    userrank: this.options.userrank,
                    usertag: this.options.usertag
                }]
            }, this.clientTopic);
            self._roomConnect_count = 1
        },
        stopReroomConnect: function () {
            clearTimeout(this._roomConnectTimeID);
            this._roomConnectTimeID = null;
            this.connected = true
        },
        isOk: function () {
            try {
                return this.connected && this.connect && this.connect.client && this.connect.client.isConnected()
            } catch (e) {
                return false
            }
        },
        startKaliveConnect: function () {
            var self = this;
            this.stopKaliveConnect();
            this.kaliveTimeId = setInterval(function () {
                $.Log("nTalk.TChat.kaliveConnect()", 1);
                self.connect.publish({
                    method: "remoteKeepAlive",
                    params: [self.options.clientId, self.options.userId]
                }, self.clientTopic)
            }, 6e4)
        },
        stopKaliveConnect: function () {
            clearInterval(this.kaliveTimeId);
            this.kaliveTimeId = null
        },
        reconnect: function () {
            var self = this;
            this.connected = false;
            this.connect.unsubscribe(this.clientWillTopic);
            this.connect.unsubscribe(this.serverTopic);
            this.connect.unregister(this.options.settingId);
            if (++this._reconnect_tchat_count <= 3) {
                this._waitTime = 500
            } else {
                this._waitTime = +"034567890".charAt(Math.ceil(Math.random() * 5)) * 1e3
            }
            $.Log("TChat.reconnect(): waitTime:" + this._waitTime);
            if (!this.status) {
                $.Log("stop reconnect");
                return
            }
            this._waitReconnectTimeID = setTimeout(function () {
                self.loginConnect()
            }, this._waitTime)
        },
        disconnect: function (killmqtt) {
            var self = this;
            for (var key in this.sessionIdleReplys) {
                if (!this.sessionIdleTimeouts) continue;
                if (this.sessionIdleTimeouts[key]) {
                    clearTimeout(this.sessionIdleTimeouts[key].id)
                }
            }
            this.status = false;
            this.login = false;
            this.connected = false;
            clearTimeout(this._waitReconnectTimeID);
            this._waitReconnectTimeID = null;
            this.stopKaliveConnect();
            if (self.options.clientId && this.clientTopic) {
                this.connect.publish({
                    method: "remoteEndConnection",
                    params: [self.options.clientId, self.options.userId]
                }, this.clientTopic)
            }
            this.connect.unsubscribe(this.clientWillTopic);
            this.connect.unsubscribe(this.serverTopic);
            this.connect.unregister(this.options.settingId);
            if (killmqtt) {
                this.connect.disconnect()
            }
            this.clientTopic = "";
            this.clientWillTopic = "";
            this.serverTopic = ""
        },
        sendMessage: function (data) {
            var message, attributes;
            data = $.isObject(data) ? data : $.JSON.parseJSON(data);
            data = $.charFilter(data);
            attributes = $.whereGet(data, ["type", "msgid"], ["type", "msgid"]);
            if (data.url) {
                attributes = $.extend(attributes, $.whereGet(data, ["url", "emotion", "oldfile", "size", "extension", "sourceurl", "mp3", "length"]))
            }
            if (data.hidden) {
                attributes = $.extend(attributes, $.whereGet(data, ["hidden"]))
            }
            message = {flashuid: data.timerkeyid, msgid: data.msgid, src: data, json: {}, xml: ""};
            if (typeof data.msg === "object") {
                message.json.msg = $.extend(data.msg, {attributes: attributes})
            } else {
                attributes = $.extend({}, attributes, this.defBody);
                message.json.msg = $.extend({text: data.msg}, {attributes: attributes})
            }
            if (data.msg.evaluate) {
                message.json.msg.evaluate = $.JSON.toJSONString(data.msg.evaluate)
            }
            message.xml = $.jsonToxml(message.json);
            this.sendHASH.add(message.msgid, message);
            if (data.type !== 5 && !this.robotQueue) {
                this.processSessionIdle()
            }
            this.messageQueue.addMessage(message);
            this.startSend(message)
        },
        sendAbnormal: function (msgid) {
            if (this.completeHASH.contains(msgid)) {
                return
            }
            var message = this.sendHASH.items(msgid);
            var timesample = $.getTime();
            var src = $.extend({
                type: 9,
                msgType: 2,
                timesample: timesample,
                msgid: timesample + "J",
                userid: "system"
            }, message.src);
            this._callback("fIM_receiveMessage", [src])
        },
        startSend: function (message) {
            if (!message || !this.login) {
                return
            }
            if (!message.timestamp || !message.recount) {
                message.timestamp = $.getTime();
                message.recount = 1
            }
            this.connect.publish({
                method: "remoteSendMessage",
                params: [this.options.userId, this.options.clientId, this.options.sessionId, message.xml, message.flashuid]
            }, this.clientTopic)
        },
        _callbackComplete: function (result, msgid) {
            if (result) {
                this.messageQueue.removeMessage(msgid);
                this.completeHASH.add(msgid, this.sendHASH.items(msgid))
            }
        },
        verificationMessage: function () {
            var message = this.messageQueue.first(), curTimestamp = $.getTime(), msgid, index, sendCount = 0,
                SEND_MAX_PERTIME = 2;
            while (message) {
                if (curTimestamp - message.timestamp >= 3e3) {
                    if (message.src.type === 5 && message.recount >= 5 || message.src.type !== 5 && message.recount >= 3) {
                        this.sendAbnormal(message.msgid);
                        this.messageQueue.removeMessage(message.msgid)
                    } else {
                        if (sendCount >= SEND_MAX_PERTIME) {
                            message = this.messageQueue.nextMessage(message.msgid);
                            continue
                        }
                        sendCount++;
                        message.timestamp = curTimestamp;
                        message.recount++;
                        if (!this.login) {
                            this.sendAbnormal(message.msgid)
                        } else {
                            this.startSend(message)
                        }
                    }
                }
                message = this.messageQueue.nextMessage(message.msgid)
            }
        },
        closeTChat: function () {
            this.disconnect()
        },
        setTextStyle: function (data) {
            if (!data) return;
            if (data.fontsize) {
                this.defBody.fontsize = data.fontsize
            }
        },
        predictMessage: function (message) {
            this.connect.publish({
                method: "onPredictMessage",
                params: [this.options.sessionId, this.options.userId, message]
            }, this.clientTopic)
        },
        LoginResult: function (result, clientId, userInfo, sessionId, soid, time) {
            this.login = result === true;
            this.options.result = result === true ? 1 : 0;
            this.options.clientId = clientId;
            this.options.sessionId = sessionId;
            this.options.soid = soid;
            this.options.time = time;
            try {
                this.options.userInfo = $.JSON.parseJSON(userInfo)
            } catch (e) {
                this.options.userInfo = this.options.userInfo || {}
            }
            this.stopReroomConnect();
            this._callback("fIM_tchatFlashReady", [this.options.userId, this.options.machineID]);
            if (this.options.result) {
                if (this.firstConnected === true) {
                    this.firstConnected = false;
                    this.processSessionIdle()
                }
                this.userInfo = {
                    myuid: this.options.userInfo.userid,
                    myuname: this.options.userInfo.username,
                    signature: "",
                    mylogo: this.options.userInfo.usericon || "",
                    sessionid: this.options.sessionId,
                    timesample: this.options.time
                }
            }
            if (this.options.userInfo && this.options.userInfo.connectable === false) {
                this._callback("fIM_onGetUserInfo", ['{"status": 0}']);
                return
            }
            if (!this.options.result) {
                this.reconnect("login relogin");
                this.userInfo = "";
                this.stopKaliveConnect()
            } else {
                this.startKaliveConnect();
                this._reconnect_tchat_count = 0;
                this.flashgourl = this.disconecturl(this.options.tchatgoserver);
                this._callback("fIM_setTChatGoServer", [this.flashgourl])
            }
            this._callback("fIM_ConnectResult", [this.options.result, this.userInfo, ""])
        },
        disconecturl: function (url) {
            return url + "?" + $.toURI({
                from: "TCHAT",
                cid: this.options.clientId,
                sitid: this.options.siteId,
                uid: this.options.userId,
                ts: $.getTime()
            })
        },
        remoteHistroyMessage: function () {
            var self = this, count = arguments[0], strXML, elementMessage, jsonMessage, timeout = 0, historyList = [],
                body = {history: 1};
            var info = {
                userId: this.options.userInfo.userid,
                userName: this.options.userInfo.username,
                cid: this.options.userInfo.pcid || NTKF.global.pcid
            };
            for (var j = 1; j < arguments.length; j++) {
                switch (j % 4) {
                    case 1:
                        body.timestamp = arguments[j];
                        break;
                    case 2:
                        body.userid = arguments[j];
                        break;
                    case 3:
                        body = $.extend(body, $.whereGet($.JSON.parseJSON(arguments[j]), ["externalname", "usericon", "nickname", "username"], ["name", "logo", "nickname", "username"]));
                        body.name = body.name || body.nickname || body.username || "";
                        break;
                    case 0:
                        strXML = arguments[j];
                        if (strXML === null || strXML === "" || strXML.indexOf("<msgtype") != -1) {
                            continue
                        } else {
                            strXML = strXML.replace(/<\?xml\s+version=\"1\.0\"\s+encoding=\"utf\-\d+\"\?>/gi, "");
                            strXML = strXML.replace(/&(?!amp;)/gi, "&amp;");
                            elementMessage = $.htmlToElement(strXML)[0];
                            if (elementMessage && elementMessage.nodeType == 3) {
                                jsonMessage = {msg: elementMessage.textContent}
                            } else {
                                jsonMessage = $.elementToObject(elementMessage)
                            }
                            if (jsonMessage.xnlink == "true" && jsonMessage.msg) {
                                var reg = new RegExp(/\[[0-9]*\].+[\n]/g);
                                jsonMessage.msg = jsonMessage.msg.replace("&amp;lt;![CDATA[", "").replace("<![CDATA[", "").replace("]]>", "");
                                var matches = jsonMessage.msg.match(reg);
                                if (matches && matches.length > 0) {
                                    for (var i = 0, l = matches.length; i < l; i++) {
                                        var tmp_match = matches[i].replace(/[\n]/g, "").replace(/\[[0-9]*\]\s/, "").replace(/[\s]/g, "&nbsp;");
                                        var tmp_match_txt = matches[i].replace(/[\n]/g, "");
                                        tmp_match = "[xnlink]" + tmp_match_txt + "[/xnlink]\n";
                                        jsonMessage.msg = jsonMessage.msg.replace(matches[i], tmp_match)
                                    }
                                }
                            } else if (jsonMessage.type == 7 && strXML) {
                                var matchArr = strXML.replace(/</g, "&lt;").replace(/>/g, "&gt;").match("&lt;content&gt;(.+?)&lt;/content&gt;");
                                if (matchArr && matchArr.length >= 2) {
                                    jsonMessage.msg = $.base64.decode(matchArr[1])
                                }
                            } else {
                                jsonMessage.msg = elementMessage.textContent || elementMessage.text;
                                if (typeof jsonMessage.msg == "string") {
                                    try {
                                        jsonMessage.msg = this.regTu(jsonMessage.msg, info)
                                    } catch (e) {
                                    }
                                    jsonMessage.msg = jsonMessage.msg.replace(/&lt;/g, "<");
                                    jsonMessage.msg = jsonMessage.msg.replace(/&gt;/g, ">")
                                }
                            }
                            body = $.extend(body, this.defBody, jsonMessage)
                        }
                        historyList.push(body);
                        if (this.sendHASH.contains(body.msgid)) {
                            this._callbackComplete(true, body.msgid)
                        }
                        body = {history: 1}
                }
            }
            $.each(historyList, function (i, body) {
                setTimeout(function () {
                    self._callback("fIM_receiveMessage", [body])
                }, timeout);
                timeout += 50
            })
        },
        remoteSendMessage: function (timestamp, userId, userInfo, xmlString, flashUid) {
            var message, jUserInfo, json, elementMessage;
            var info = {
                userId: this.options.userInfo.userid,
                userName: this.options.userInfo.username,
                cid: this.options.userInfo.pcid || NTKF.global.pcid
            };
            if (!xmlString || xmlString.indexOf('type="5"') > -1 && xmlString.indexOf('systype="5"') === -1) return;
            if (userInfo && typeof userInfo == "string") {
                userInfo = $.JSON.parseJSON(userInfo);
                jUserInfo = $.whereGet(userInfo, ["usericon", "userid", "externalname"], ["logo", "userid", "name"]);
                jUserInfo.name = jUserInfo.name || userInfo.username
            }
            xmlString = xmlString.replace(/<\?xml\s+version=\"1\.0\"\s+encoding=\"utf\-\d+\"\?>/gi, "");
            xmlString = xmlString.replace(/&(?!amp;)/gi, "&amp;");
            try {
                elementMessage = $.htmlToElement(xmlString)[0];
                if (elementMessage && elementMessage.nodeType == 3) {
                    json = {type: 1, msg: elementMessage.textContent, msgid: flashUid + "x"}
                } else {
                    json = $.elementToObject(elementMessage)
                }
            } catch (e) {
                $.Log("remoteSendMessage:" + e.description + "; xmlString:" + xmlString, 3);
                return
            }
            if (json.xnlink == "true" && json.msg) {
                var reg = new RegExp(/\[[0-9]*\].+[\n]/g);
                json.msg = json.msg.replace("&amp;lt;![CDATA[", "").replace("<![CDATA[", "").replace("]]>", "");
                var matches = json.msg.match(reg);
                if (matches && matches.length > 0) {
                    for (var i = 0, l = matches.length; i < l; i++) {
                        var tmp_match_txt = matches[i].replace(/[\n]/g, "");
                        var tmp_match = "[xnlink]" + tmp_match_txt + "[/xnlink]\n";
                        json.msg = json.msg.replace(matches[i], tmp_match)
                    }
                }
            } else if (json.type == 7 && xmlString) {
                var matchArr = xmlString.replace(/</g, "&lt;").replace(/>/g, "&gt;").match("&lt;content&gt;(.+?)&lt;/content&gt;");
                if (matchArr && matchArr.length >= 2) {
                    json.msg = $.base64.decode(matchArr[1])
                }
            } else {
                json.msg = elementMessage.textContent || elementMessage.text;
                if (typeof json.msg == "string") {
                    try {
                        json.msg = this.regTu(json.msg, info)
                    } catch (e) {
                    }
                    json.msg = json.msg.replace(/&lt;/g, "<");
                    json.msg = json.msg.replace(/&gt;/g, ">")
                }
            }
            message = $.extend({}, this.defBody, json, jUserInfo, {timestamp: timestamp});
            if (this.sendHASH.contains(message.msgid)) {
                this._callbackComplete(true, message.msgid)
            }
            if (!this.sendHASH.contains(message.msgid) && !this.receiveHASH.contains(message.msgid)) {
                this._callback("fIM_receiveMessage", [message]);
                if ($.browser.mobile && $.isEdu) {
                    this._callback("fim_offlineMssage", [message.msg, "", message])
                }
                if ($.browser.mobile && $.isAutoEdu) {
                    this._callback("fIM_eduWapReceiveMessage", [message])
                }
                this.receiveHASH.add(message.msgid, message)
            }
        },
        regTu: function (data, options) {
            var arr = [], msg = "";
            if (data.indexOf("&amp;")) {
                msg = data.replace(/&amp;/gi, "&")
            } else {
                msg = data
            }
            var reg = new RegExp(/(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:\/~\+#]*[\w\-\@?^=%&\/~\+#])?/gi);
            arr = msg.match(reg);
            for (var i = 0; i < arr.length; i++) {
                var url, str = "", str2 = "", str3 = "";
                if (arr[i].indexOf("ntform=1") > -1) {
                    url = arr[i].replace(/ntform=1/gi, "userId=" + options.userId + "&userName=" + options.userName + "&cid=" + options.cid);
                    if (arr[i].split("?")[1].split("&").length > 1) {
                        var arr2 = arr[i].split("?")[1].split("&");
                        for (var j = 0; j < arr2.length; j++) {
                            if (arr2[j] == "ntform=1") {
                                str3 += ""
                            } else {
                                str3 += arr2[j] + "&"
                            }
                        }
                        str3 = "?" + str3.substr(0, str3.length - 1)
                    }
                    arr[i].split("?")[1] == "ntform=1" ? str = arr[i].split("?")[0] : str = arr[i].split("?")[0] + str3;
                    msg = msg.replace(arr[i].substr(0, arr[i].length), '&lt;a href="' + url + '"&gt;' + str + "&lt;/a&gt;")
                }
            }
            return msg
        },
        remoteNotifyUserList: function (strUserList) {
            var userList = [];
            try {
                userList = $.JSON.parseJSON(strUserList)
            } catch (e) {
                $.Log("remoteNotifyUserList toJSON abnormal", 3)
            }
            for (var i = 0; i < userList.length; i++) {
                if (userList[i].userId == this.options.userId) {
                    userList.splice(i, 1)
                }
            }
            this._callback("fIM_notifyUserNumbers", [userList.length]);
            this._callback("fIM_notifyUserList", [$.JSON.toJSONString(userList)])
        },
        remoteSearchWaiter: function (targetId, destInfo) {
            this._callback("fIM_onGetUserInfo", [destInfo])
        },
        remoteNotifyUserInformation: function (targetId, userInfo) {
            if (targetId == this.options.userId) {
                return
            }
            this._callback("fIM_onGetUserInfo", [userInfo])
        },
        remoteNotifyUserEnter: function (userId, userInfo) {
            this.options.targetId = userId;
            this._callback("fIM_notifyUserEnter", [this.options.targetId, userInfo, ""])
        },
        remoteNotifyUserLeave: function (userId) {
            $.Log("tchat.remoteNotifyUserLeave(" + userId + ")", 2);
            this._callback("fIM_notifyUserLeave", [userId])
        },
        remoteNotifyUserClose: function (clientId, userId) {
            if (clientId != this.options.clientId) {
                return
            }
            this._callback("fIM_ConnectResult", [5, "", ""]);
            this.disconnect();
            this._callback("fIM_ConnectResult", [4, "", ""])
        },
        remoteNotifySessionScene: function (sceneStr) {
            this._callback("fIM_onNotifySessionSence", [sceneStr])
        },
        remoteNotifyUserInputing: function (sessionId, sourceUid) {
            this._callback("fIM_notifyUserInputing", [sourceUid])
        },
        remoteRequestEvalute: function (sessionId, targetId, targetName) {
            this._callback("fIM_requestEvaluate", [targetId, targetName])
        },
        processSessionIdle: function () {
            var self = this;
            if (!this.sessionIdleTimeouts) this.sessionIdleTimeouts = {};
            $.each(this.sessionIdleReplys, function (key, timeoutID) {
                if (self.sessionIdleTimeouts[key]) {
                    clearTimeout(self.sessionIdleTimeouts[key].id)
                }
                self.sendIdleReply(key)
            })
        },
        clearSessionIdle: function () {
            var self = this;
            if (!this.sessionIdleTimeouts) this.sessionIdleTimeouts = {};
            $.each(this.sessionIdleReplys, function (key, timeoutID) {
                if (self.sessionIdleTimeouts[key]) {
                    clearTimeout(self.sessionIdleTimeouts[key].id)
                }
            })
        },
        sendIdleReply: function (key) {
            var self = this;
            var opt = $.extend(this.sessionIdleTimeouts[key], {
                start: $.formatDate(), id: setTimeout(function () {
                    var i = 0, connectMessage = self.sessionIdleReplys[key];
                    delete self.sessionIdleReplys[key];
                    self.sessionIdleTimeouts[key].end = $.formatDate();
                    $.each(self.sessionIdleReplys, function (_k) {
                        i++
                    });
                    $.Log("setTimeout " + key + "s " + self.sessionIdleTimeouts[key].end + ", disconnect tchat", 1);
                    if (i === 0 && self.connect && self.options.result) {
                        self._callback("fIM_ConnectResult", [4, "", connectMessage]);
                        self.disconnect()
                    }
                }, key * 1e3)
            });
            this.sessionIdleTimeouts[key] = opt
        },
        _toArray: function (json, arr) {
            var result = [];
            if (!json) {
                return "error"
            }
            for (var i = 0; i < arr.length; i++) {
                result.push(!$.isDefined(json[arr[i]]) ? "" : json[arr[i]])
            }
            return result
        },
        _handleResponse: function (methodName, methodParams) {
            if (this[methodName]) {
                this[methodName].apply(this, methodParams)
            } else {
                $.Log("The object of the method '" + methodName + "' does not exist", 3)
            }
        },
        _callback: function (methodName, methodParams) {
            methodParams.push(this.options.settingId);
            if ($.hasOwnProperty(methodName)) {
                try {
                    $[methodName].apply(this, methodParams)
                } catch (e) {
                }
            } else {
                $.Log("nTalk." + methodName + "(...)", 2)
            }
        },
        _onCallback: function (args) {
            var self = this, topic, method;
            if (!args.length) {
                return
            }
            topic = args[0];
            method = args[1];
            if (topic === this.clientWillTopic && method === "reconnect") {
                this.reconnect();
                return false
            } else if (topic !== this.serverTopic) {
                return false
            }
            if (method === "LoginResult") {
                this.LoginResult.apply(self, args.slice(2))
            } else {
                this._handleResponse.call(self, method, args.slice(2))
            }
        },
        _onAbnormal: function () {
            this.connected = false;
            this._reconnect_mqtt_count++;
            if (this._reconnect_mqtt_count > 3) {
                this._callback("fIM_ConnectResult", [2, "", "连接服务器超时，请稍后重试！"]);
                this._reconnect_mqtt_count = 0
            }
        },
        _initQueue: function () {
            var self = this;
            this.messageQueue = new $.Queue;
            this.messageQueue.first = function () {
                return this.queueFront()
            };
            this.messageQueue.nextMessage = function (msgid) {
                if (!this.list.length) return null; else if (!msgid) return this.list[0];
                for (var i = 0; i < this.list.length; i++) {
                    if (this.list[i].msgid == msgid) {
                        return this.list[i + 1]
                    }
                }
                return null
            };
            this.messageQueue.removeMessage = function (msgid) {
                var queue = [];
                for (var i = 0; i < this.list.length; i++) {
                    if (this.list[i].msgid == msgid) {
                    } else {
                        queue.push(this.list[i])
                    }
                }
                this.list = queue;
                this.length = queue.length
            };
            this.messageQueue.addMessage = function (obj) {
                for (var i = 0; i < this.list.length; i++) {
                    if (this.list[i].msgid == obj.msgid) return false
                }
                this.list.push(obj);
                this.length = this.list.length;
                return true
            };
            this.messageQueue.getSendingNum = function () {
                var count = 0;
                for (var i = 0; i < this.list.length; i++) {
                    if (this.list[i].status) count++
                }
                return count
            };
            this.sendIntervalID = setInterval(function () {
                self.verificationMessage()
            }, 1e3)
        }
    }
})(nTalk);