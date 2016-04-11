var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from 'angular2/src/core/di';
import { ListWrapper, Map } from 'angular2/src/facade/collection';
import { Serializer } from "angular2/src/web_workers/shared/serializer";
import { isPresent, FunctionWrapper } from "angular2/src/facade/lang";
import { MessageBus } from "angular2/src/web_workers/shared/message_bus";
import { PromiseWrapper, ObservableWrapper } from 'angular2/src/facade/async';
export class ServiceMessageBrokerFactory {
}
export let ServiceMessageBrokerFactory_ = class extends ServiceMessageBrokerFactory {
    constructor(_messageBus, _serializer) {
        super();
        this._messageBus = _messageBus;
        this._serializer = _serializer;
    }
    createMessageBroker(channel, runInZone = true) {
        this._messageBus.initChannel(channel, runInZone);
        return new ServiceMessageBroker_(this._messageBus, this._serializer, channel);
    }
};
ServiceMessageBrokerFactory_ = __decorate([
    Injectable(), 
    __metadata('design:paramtypes', [MessageBus, Serializer])
], ServiceMessageBrokerFactory_);
export class ServiceMessageBroker {
}
/**
 * Helper class for UIComponents that allows components to register methods.
 * If a registered method message is received from the broker on the worker,
 * the UIMessageBroker deserializes its arguments and calls the registered method.
 * If that method returns a promise, the UIMessageBroker returns the result to the worker.
 */
export class ServiceMessageBroker_ extends ServiceMessageBroker {
    constructor(messageBus, _serializer, channel) {
        super();
        this._serializer = _serializer;
        this.channel = channel;
        this._methods = new Map();
        this._sink = messageBus.to(channel);
        var source = messageBus.from(channel);
        ObservableWrapper.subscribe(source, (message) => this._handleMessage(message));
    }
    registerMethod(methodName, signature, method, returnType) {
        this._methods.set(methodName, (message) => {
            var serializedArgs = message.args;
            let numArgs = signature === null ? 0 : signature.length;
            var deserializedArgs = ListWrapper.createFixedSize(numArgs);
            for (var i = 0; i < numArgs; i++) {
                var serializedArg = serializedArgs[i];
                deserializedArgs[i] = this._serializer.deserialize(serializedArg, signature[i]);
            }
            var promise = FunctionWrapper.apply(method, deserializedArgs);
            if (isPresent(returnType) && isPresent(promise)) {
                this._wrapWebWorkerPromise(message.id, promise, returnType);
            }
        });
    }
    _handleMessage(map) {
        var message = new ReceivedMessage(map);
        if (this._methods.has(message.method)) {
            this._methods.get(message.method)(message);
        }
    }
    _wrapWebWorkerPromise(id, promise, type) {
        PromiseWrapper.then(promise, (result) => {
            ObservableWrapper.callEmit(this._sink, { 'type': 'result', 'value': this._serializer.serialize(result, type), 'id': id });
        });
    }
}
export class ReceivedMessage {
    constructor(data) {
        this.method = data['method'];
        this.args = data['args'];
        this.id = data['id'];
        this.type = data['type'];
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmljZV9tZXNzYWdlX2Jyb2tlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImRpZmZpbmdfcGx1Z2luX3dyYXBwZXItb3V0cHV0X3BhdGgtNUtzZzFBSk4udG1wL2FuZ3VsYXIyL3NyYy93ZWJfd29ya2Vycy9zaGFyZWQvc2VydmljZV9tZXNzYWdlX2Jyb2tlci50cyJdLCJuYW1lcyI6WyJTZXJ2aWNlTWVzc2FnZUJyb2tlckZhY3RvcnkiLCJTZXJ2aWNlTWVzc2FnZUJyb2tlckZhY3RvcnlfIiwiU2VydmljZU1lc3NhZ2VCcm9rZXJGYWN0b3J5Xy5jb25zdHJ1Y3RvciIsIlNlcnZpY2VNZXNzYWdlQnJva2VyRmFjdG9yeV8uY3JlYXRlTWVzc2FnZUJyb2tlciIsIlNlcnZpY2VNZXNzYWdlQnJva2VyIiwiU2VydmljZU1lc3NhZ2VCcm9rZXJfIiwiU2VydmljZU1lc3NhZ2VCcm9rZXJfLmNvbnN0cnVjdG9yIiwiU2VydmljZU1lc3NhZ2VCcm9rZXJfLnJlZ2lzdGVyTWV0aG9kIiwiU2VydmljZU1lc3NhZ2VCcm9rZXJfLl9oYW5kbGVNZXNzYWdlIiwiU2VydmljZU1lc3NhZ2VCcm9rZXJfLl93cmFwV2ViV29ya2VyUHJvbWlzZSIsIlJlY2VpdmVkTWVzc2FnZSIsIlJlY2VpdmVkTWVzc2FnZS5jb25zdHJ1Y3RvciJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O09BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSxzQkFBc0I7T0FDeEMsRUFBQyxXQUFXLEVBQUUsR0FBRyxFQUFhLE1BQU0sZ0NBQWdDO09BQ3BFLEVBQUMsVUFBVSxFQUFDLE1BQU0sNENBQTRDO09BQzlELEVBQUMsU0FBUyxFQUFRLGVBQWUsRUFBQyxNQUFNLDBCQUEwQjtPQUNsRSxFQUFDLFVBQVUsRUFBQyxNQUFNLDZDQUE2QztPQUMvRCxFQUFlLGNBQWMsRUFBRSxpQkFBaUIsRUFBQyxNQUFNLDJCQUEyQjtBQUV6RjtBQUtBQSxDQUFDQTtBQUVELHdEQUNrRCwyQkFBMkI7SUFJM0VDLFlB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QUFJQSxDQUFDQSxDQUFDQTtRQUNyQkEsSUFBSUEsQ0FBQ0EsSUFBSUEsR0FBR0EsSUFBSUEsQ0FBQ0EsTUFBTUEsQ0FBQ0EsQ0FBQ0E7SUFDM0JBLENBQUNBO0FBQ0hELENBQUNBO0FBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0luamVjdGFibGV9IGZyb20gJ2FuZ3VsYXIyL3NyYy9jb3JlL2RpJztcbmltcG9ydCB7TGlzdFdyYXBwZXIsIE1hcCwgTWFwV3JhcHBlcn0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9jb2xsZWN0aW9uJztcbmltcG9ydCB7U2VyaWFsaXplcn0gZnJvbSBcImFuZ3VsYXIyL3NyYy93ZWJfd29ya2Vycy9zaGFyZWQvc2VyaWFsaXplclwiO1xuaW1wb3J0IHtpc1ByZXNlbnQsIFR5cGUsIEZ1bmN0aW9uV3JhcHBlcn0gZnJvbSBcImFuZ3VsYXIyL3NyYy9mYWNhZGUvbGFuZ1wiO1xuaW1wb3J0IHtNZXNzYWdlQnVzfSBmcm9tIFwiYW5ndWxhcjIvc3JjL3dlYl93b3JrZXJzL3NoYXJlZC9tZXNzYWdlX2J1c1wiO1xuaW1wb3J0IHtFdmVudEVtaXR0ZXIsIFByb21pc2VXcmFwcGVyLCBPYnNlcnZhYmxlV3JhcHBlcn0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9hc3luYyc7XG5cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBTZXJ2aWNlTWVzc2FnZUJyb2tlckZhY3Rvcnkge1xuICAvKipcbiAgICogSW5pdGlhbGl6ZXMgdGhlIGdpdmVuIGNoYW5uZWwgYW5kIGF0dGFjaGVzIGEgbmV3IHtAbGluayBTZXJ2aWNlTWVzc2FnZUJyb2tlcn0gdG8gaXQuXG4gICAqL1xuICBhYnN0cmFjdCBjcmVhdGVNZXNzYWdlQnJva2VyKGNoYW5uZWw6IHN0cmluZywgcnVuSW5ab25lPzogYm9vbGVhbik6IFNlcnZpY2VNZXNzYWdlQnJva2VyO1xufVxuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgU2VydmljZU1lc3NhZ2VCcm9rZXJGYWN0b3J5XyBleHRlbmRzIFNlcnZpY2VNZXNzYWdlQnJva2VyRmFjdG9yeSB7XG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgcHVibGljIF9zZXJpYWxpemVyOiBTZXJpYWxpemVyO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX21lc3NhZ2VCdXM6IE1lc3NhZ2VCdXMsIF9zZXJpYWxpemVyOiBTZXJpYWxpemVyKSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLl9zZXJpYWxpemVyID0gX3NlcmlhbGl6ZXI7XG4gIH1cblxuICBjcmVhdGVNZXNzYWdlQnJva2VyKGNoYW5uZWw6IHN0cmluZywgcnVuSW5ab25lOiBib29sZWFuID0gdHJ1ZSk6IFNlcnZpY2VNZXNzYWdlQnJva2VyIHtcbiAgICB0aGlzLl9tZXNzYWdlQnVzLmluaXRDaGFubmVsKGNoYW5uZWwsIHJ1bkluWm9uZSk7XG4gICAgcmV0dXJuIG5ldyBTZXJ2aWNlTWVzc2FnZUJyb2tlcl8odGhpcy5fbWVzc2FnZUJ1cywgdGhpcy5fc2VyaWFsaXplciwgY2hhbm5lbCk7XG4gIH1cbn1cblxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIFNlcnZpY2VNZXNzYWdlQnJva2VyIHtcbiAgYWJzdHJhY3QgcmVnaXN0ZXJNZXRob2QobWV0aG9kTmFtZTogc3RyaW5nLCBzaWduYXR1cmU6IFR5cGVbXSwgbWV0aG9kOiBGdW5jdGlvbixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuVHlwZT86IFR5cGUpOiB2b2lkO1xufVxuXG4vKipcbiAqIEhlbHBlciBjbGFzcyBmb3IgVUlDb21wb25lbnRzIHRoYXQgYWxsb3dzIGNvbXBvbmVudHMgdG8gcmVnaXN0ZXIgbWV0aG9kcy5cbiAqIElmIGEgcmVnaXN0ZXJlZCBtZXRob2QgbWVzc2FnZSBpcyByZWNlaXZlZCBmcm9tIHRoZSBicm9rZXIgb24gdGhlIHdvcmtlcixcbiAqIHRoZSBVSU1lc3NhZ2VCcm9rZXIgZGVzZXJpYWxpemVzIGl0cyBhcmd1bWVudHMgYW5kIGNhbGxzIHRoZSByZWdpc3RlcmVkIG1ldGhvZC5cbiAqIElmIHRoYXQgbWV0aG9kIHJldHVybnMgYSBwcm9taXNlLCB0aGUgVUlNZXNzYWdlQnJva2VyIHJldHVybnMgdGhlIHJlc3VsdCB0byB0aGUgd29ya2VyLlxuICovXG5leHBvcnQgY2xhc3MgU2VydmljZU1lc3NhZ2VCcm9rZXJfIGV4dGVuZHMgU2VydmljZU1lc3NhZ2VCcm9rZXIge1xuICBwcml2YXRlIF9zaW5rOiBFdmVudEVtaXR0ZXI8YW55PjtcbiAgcHJpdmF0ZSBfbWV0aG9kczogTWFwPHN0cmluZywgRnVuY3Rpb24+ID0gbmV3IE1hcDxzdHJpbmcsIEZ1bmN0aW9uPigpO1xuXG4gIGNvbnN0cnVjdG9yKG1lc3NhZ2VCdXM6IE1lc3NhZ2VCdXMsIHByaXZhdGUgX3NlcmlhbGl6ZXI6IFNlcmlhbGl6ZXIsIHB1YmxpYyBjaGFubmVsKSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLl9zaW5rID0gbWVzc2FnZUJ1cy50byhjaGFubmVsKTtcbiAgICB2YXIgc291cmNlID0gbWVzc2FnZUJ1cy5mcm9tKGNoYW5uZWwpO1xuICAgIE9ic2VydmFibGVXcmFwcGVyLnN1YnNjcmliZShzb3VyY2UsIChtZXNzYWdlKSA9PiB0aGlzLl9oYW5kbGVNZXNzYWdlKG1lc3NhZ2UpKTtcbiAgfVxuXG4gIHJlZ2lzdGVyTWV0aG9kKG1ldGhvZE5hbWU6IHN0cmluZywgc2lnbmF0dXJlOiBUeXBlW10sIG1ldGhvZDogKC4uLl86IGFueVtdKSA9PiBQcm9taXNlPGFueT58IHZvaWQsXG4gICAgICAgICAgICAgICAgIHJldHVyblR5cGU/OiBUeXBlKTogdm9pZCB7XG4gICAgdGhpcy5fbWV0aG9kcy5zZXQobWV0aG9kTmFtZSwgKG1lc3NhZ2U6IFJlY2VpdmVkTWVzc2FnZSkgPT4ge1xuICAgICAgdmFyIHNlcmlhbGl6ZWRBcmdzID0gbWVzc2FnZS5hcmdzO1xuICAgICAgbGV0IG51bUFyZ3MgPSBzaWduYXR1cmUgPT09IG51bGwgPyAwIDogc2lnbmF0dXJlLmxlbmd0aDtcbiAgICAgIHZhciBkZXNlcmlhbGl6ZWRBcmdzOiBhbnlbXSA9IExpc3RXcmFwcGVyLmNyZWF0ZUZpeGVkU2l6ZShudW1BcmdzKTtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbnVtQXJnczsgaSsrKSB7XG4gICAgICAgIHZhciBzZXJpYWxpemVkQXJnID0gc2VyaWFsaXplZEFyZ3NbaV07XG4gICAgICAgIGRlc2VyaWFsaXplZEFyZ3NbaV0gPSB0aGlzLl9zZXJpYWxpemVyLmRlc2VyaWFsaXplKHNlcmlhbGl6ZWRBcmcsIHNpZ25hdHVyZVtpXSk7XG4gICAgICB9XG5cbiAgICAgIHZhciBwcm9taXNlID0gRnVuY3Rpb25XcmFwcGVyLmFwcGx5KG1ldGhvZCwgZGVzZXJpYWxpemVkQXJncyk7XG4gICAgICBpZiAoaXNQcmVzZW50KHJldHVyblR5cGUpICYmIGlzUHJlc2VudChwcm9taXNlKSkge1xuICAgICAgICB0aGlzLl93cmFwV2ViV29ya2VyUHJvbWlzZShtZXNzYWdlLmlkLCBwcm9taXNlLCByZXR1cm5UeXBlKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgX2hhbmRsZU1lc3NhZ2UobWFwOiB7W2tleTogc3RyaW5nXTogYW55fSk6IHZvaWQge1xuICAgIHZhciBtZXNzYWdlID0gbmV3IFJlY2VpdmVkTWVzc2FnZShtYXApO1xuICAgIGlmICh0aGlzLl9tZXRob2RzLmhhcyhtZXNzYWdlLm1ldGhvZCkpIHtcbiAgICAgIHRoaXMuX21ldGhvZHMuZ2V0KG1lc3NhZ2UubWV0aG9kKShtZXNzYWdlKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF93cmFwV2ViV29ya2VyUHJvbWlzZShpZDogc3RyaW5nLCBwcm9taXNlOiBQcm9taXNlPGFueT4sIHR5cGU6IFR5cGUpOiB2b2lkIHtcbiAgICBQcm9taXNlV3JhcHBlci50aGVuKHByb21pc2UsIChyZXN1bHQ6IGFueSkgPT4ge1xuICAgICAgT2JzZXJ2YWJsZVdyYXBwZXIuY2FsbEVtaXQoXG4gICAgICAgICAgdGhpcy5fc2luayxcbiAgICAgICAgICB7J3R5cGUnOiAncmVzdWx0JywgJ3ZhbHVlJzogdGhpcy5fc2VyaWFsaXplci5zZXJpYWxpemUocmVzdWx0LCB0eXBlKSwgJ2lkJzogaWR9KTtcbiAgICB9KTtcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgUmVjZWl2ZWRNZXNzYWdlIHtcbiAgbWV0aG9kOiBzdHJpbmc7XG4gIGFyZ3M6IGFueVtdO1xuICBpZDogc3RyaW5nO1xuICB0eXBlOiBzdHJpbmc7XG5cbiAgY29uc3RydWN0b3IoZGF0YToge1trZXk6IHN0cmluZ106IGFueX0pIHtcbiAgICB0aGlzLm1ldGhvZCA9IGRhdGFbJ21ldGhvZCddO1xuICAgIHRoaXMuYXJncyA9IGRhdGFbJ2FyZ3MnXTtcbiAgICB0aGlzLmlkID0gZGF0YVsnaWQnXTtcbiAgICB0aGlzLnR5cGUgPSBkYXRhWyd0eXBlJ107XG4gIH1cbn1cbiJdfQ==