'use strict';var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var lang_1 = require('angular2/src/facade/lang');
var exceptions_1 = require('angular2/src/facade/exceptions');
var collection_1 = require('angular2/src/facade/collection');
var reflector_reader_1 = require('./reflector_reader');
/**
 * Reflective information about a symbol, including annotations, interfaces, and other metadata.
 */
var ReflectionInfo = (function () {
    function ReflectionInfo(annotations, parameters, factory, interfaces, propMetadata) {
        this.annotations = annotations;
        this.parameters = parameters;
        this.factory = factory;
        this.interfaces = interfaces;
        this.propMetadata = propMetadata;
    }
    return ReflectionInfo;
})();
exports.ReflectionInfo = ReflectionInfo;
/**
 * Provides access to reflection data about symbols. Used internally by Angular
 * to power dependency injection and compilation.
 */
var Reflector = (function (_super) {
    __extends(Reflector, _super);
    function Reflector(reflectionCapabilities) {
        _super.call(this);
        /** @internal */
        this._injectableInfo = new collection_1.Map();
        /** @internal */
        this._getters = new collection_1.Map();
        /** @internal */
        this._setters = new collection_1.Map();
        /** @internal */
        this._methods = new collection_1.Map();
        this._usedKeys = null;
        this.reflectionCapabilities = reflectionCapabilities;
    }
    Reflector.prototype.isReflectionEnabled = function () { return this.reflectionCapabilities.isReflectionEnabled(); };
    /**
     * Causes `this` reflector to track keys used to access
     * {@link ReflectionInfo} objects.
     */
    Reflector.prototype.trackUsage = function () { this._usedKeys = new collection_1.Set(); };
    /**
     * Lists types for which reflection information was not requested since
     * {@link #trackUsage} was called. This list could later be audited as
     * potential dead code.
     */
    Reflector.prototype.listUnusedKeys = function () {
        var _this = this;
        if (this._usedKeys == null) {
            throw new exceptions_1.BaseException('Usage tracking is disabled');
        }
        var allTypes = collection_1.MapWrapper.keys(this._injectableInfo);
        return allTypes.filter(function (key) { return !collection_1.SetWrapper.has(_this._usedKeys, key); });
    };
    Reflector.prototype.registerFunction = function (func, funcInfo) {
        this._injectableInfo.set(func, funcInfo);
    };
    Reflector.prototype.registerType = function (type, typeInfo) {
        this._injectableInfo.set(type, typeInfo);
    };
    Reflector.prototype.registerGetters = function (getters) { _mergeMaps(this._getters, getters); };
    Reflector.prototype.registerSetters = function (setters) { _mergeMaps(this._setters, setters); };
    Reflector.prototype.registerMethods = function (methods) { _mergeMaps(this._methods, methods); };
    Reflector.prototype.factory = function (type) {
        if (this._containsReflectionInfo(type)) {
            var res = this._getReflectionInfo(type).factory;
            return lang_1.isPresent(res) ? res : null;
        }
        else {
            return this.reflectionCapabilities.factory(type);
        }
    };
    Reflector.prototype.parameters = function (typeOrFunc) {
        if (this._injectableInfo.has(typeOrFunc)) {
            var res = this._getReflectionInfo(typeOrFunc).parameters;
            return lang_1.isPresent(res) ? res : [];
        }
        else {
            return this.reflectionCapabilities.parameters(typeOrFunc);
        }
    };
    Reflector.prototype.annotations = function (typeOrFunc) {
        if (this._injectableInfo.has(typeOrFunc)) {
            var res = this._getReflectionInfo(typeOrFunc).annotations;
            return lang_1.isPresent(res) ? res : [];
        }
        else {
            return this.reflectionCapabilities.annotations(typeOrFunc);
        }
    };
    Reflector.prototype.propMetadata = function (typeOrFunc) {
        if (this._injectableInfo.has(typeOrFunc)) {
            var res = this._getReflectionInfo(typeOrFunc).propMetadata;
            return lang_1.isPresent(res) ? res : {};
        }
        else {
            return this.reflectionCapabilities.propMetadata(typeOrFunc);
        }
    };
    Reflector.prototype.interfaces = function (type) {
        if (this._injectableInfo.has(type)) {
            var res = this._getReflectionInfo(type).interfaces;
            return lang_1.isPresent(res) ? res : [];
        }
        else {
            return this.reflectionCapabilities.interfaces(type);
        }
    };
    Reflector.prototype.getter = function (name) {
        if (this._getters.has(name)) {
            return this._getters.get(name);
        }
        else {
            return this.reflectionCapabilities.getter(name);
        }
    };
    Reflector.prototype.setter = function (name) {
        if (this._setters.has(name)) {
            return this._setters.get(name);
        }
        else {
            return this.reflectionCapabilities.setter(name);
        }
    };
    Reflector.prototype.method = function (name) {
        if (this._methods.has(name)) {
            return this._methods.get(name);
        }
        else {
            return this.reflectionCapabilities.method(name);
        }
    };
    /** @internal */
    Reflector.prototype._getReflectionInfo = function (typeOrFunc) {
        if (lang_1.isPresent(this._usedKeys)) {
            this._usedKeys.add(typeOrFunc);
        }
        return this._injectableInfo.get(typeOrFunc);
    };
    /** @internal */
    Reflector.prototype._containsReflectionInfo = function (typeOrFunc) { return this._injectableInfo.has(typeOrFunc); };
    Reflector.prototype.importUri = function (type) { return this.reflectionCapabilities.importUri(type); };
    return Reflector;
})(reflector_reader_1.ReflectorReader);
exports.Reflector = Reflector;
function _mergeMaps(target, config) {
    collection_1.StringMapWrapper.forEach(config, function (v, k) { return target.set(k, v); });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVmbGVjdG9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZGlmZmluZ19wbHVnaW5fd3JhcHBlci1vdXRwdXRfcGF0aC1MdlpMZUE4di50bXAvYW5ndWxhcjIvc3JjL2NvcmUvcmVmbGVjdGlvbi9yZWZsZWN0b3IudHMiXSwibmFtZXMiOlsiUmVmbGVjdGlvbkluZm8iLCJSZWZsZWN0aW9uSW5mby5jb25zdHJ1Y3RvciIsIlJlZmxlY3RvciIsIlJlZmxlY3Rvci5jb25zdHJ1Y3RvciIsIlJlZmxlY3Rvci5pc1JlZmxlY3Rpb25FbmFibGVkIiwiUmVmbGVjdG9yLnRyYWNrVXNhZ2UiLCJSZWZsZWN0b3IubGlzdFVudXNlZEtleXMiLCJSZWZsZWN0b3IucmVnaXN0ZXJGdW5jdGlvbiIsIlJlZmxlY3Rvci5yZWdpc3RlclR5cGUiLCJSZWZsZWN0b3IucmVnaXN0ZXJHZXR0ZXJzIiwiUmVmbGVjdG9yLnJlZ2lzdGVyU2V0dGVycyIsIlJlZmxlY3Rvci5yZWdpc3Rlck1ldGhvZHMiLCJSZWZsZWN0b3IuZmFjdG9yeSIsIlJlZmxlY3Rvci5wYXJhbWV0ZXJzIiwiUmVmbGVjdG9yLmFubm90YXRpb25zIiwiUmVmbGVjdG9yLnByb3BNZXRhZGF0YSIsIlJlZmxlY3Rvci5pbnRlcmZhY2VzIiwiUmVmbGVjdG9yLmdldHRlciIsIlJlZmxlY3Rvci5zZXR0ZXIiLCJSZWZsZWN0b3IubWV0aG9kIiwiUmVmbGVjdG9yLl9nZXRSZWZsZWN0aW9uSW5mbyIsIlJlZmxlY3Rvci5fY29udGFpbnNSZWZsZWN0aW9uSW5mbyIsIlJlZmxlY3Rvci5pbXBvcnRVcmkiLCJfbWVyZ2VNYXBzIl0sIm1hcHBpbmdzIjoiOzs7OztBQUFBLHFCQUF5QywwQkFBMEIsQ0FBQyxDQUFBO0FBQ3BFLDJCQUE4QyxnQ0FBZ0MsQ0FBQyxDQUFBO0FBQy9FLDJCQU9PLGdDQUFnQyxDQUFDLENBQUE7QUFFeEMsaUNBQThCLG9CQUFvQixDQUFDLENBQUE7QUFLbkQ7O0dBRUc7QUFDSDtJQUNFQSx3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Q0FBQ0E7SUFFekZuQiw2QkFBU0EsR0FBVEEsVUFBVUEsSUFBVUEsSUFBWW9CLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLHNCQUFzQkEsQ0FBQ0EsU0FBU0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7SUFDdkZwQixnQkFBQ0E7QUFBREEsQ0FBQ0EsQUF2SUQsRUFBK0Isa0NBQWUsRUF1STdDO0FBdklZLGlCQUFTLFlBdUlyQixDQUFBO0FBRUQsb0JBQW9CLE1BQTZCLEVBQUUsTUFBaUM7SUFDbEZxQiw2QkFBZ0JBLENBQUNBLE9BQU9BLENBQUNBLE1BQU1BLEVBQUVBLFVBQUNBLENBQVdBLEVBQUVBLENBQVNBLElBQUtBLE9BQUFBLE1BQU1BLENBQUNBLEdBQUdBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLENBQUNBLEVBQWhCQSxDQUFnQkEsQ0FBQ0EsQ0FBQ0E7QUFDakZBLENBQUNBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtUeXBlLCBpc1ByZXNlbnQsIHN0cmluZ2lmeX0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9sYW5nJztcbmltcG9ydCB7QmFzZUV4Y2VwdGlvbiwgV3JhcHBlZEV4Y2VwdGlvbn0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9leGNlcHRpb25zJztcbmltcG9ydCB7XG4gIExpc3RXcmFwcGVyLFxuICBNYXAsXG4gIE1hcFdyYXBwZXIsXG4gIFNldCxcbiAgU2V0V3JhcHBlcixcbiAgU3RyaW5nTWFwV3JhcHBlclxufSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2NvbGxlY3Rpb24nO1xuaW1wb3J0IHtTZXR0ZXJGbiwgR2V0dGVyRm4sIE1ldGhvZEZufSBmcm9tICcuL3R5cGVzJztcbmltcG9ydCB7UmVmbGVjdG9yUmVhZGVyfSBmcm9tICcuL3JlZmxlY3Rvcl9yZWFkZXInO1xuaW1wb3J0IHtQbGF0Zm9ybVJlZmxlY3Rpb25DYXBhYmlsaXRpZXN9IGZyb20gJy4vcGxhdGZvcm1fcmVmbGVjdGlvbl9jYXBhYmlsaXRpZXMnO1xuZXhwb3J0IHtTZXR0ZXJGbiwgR2V0dGVyRm4sIE1ldGhvZEZufSBmcm9tICcuL3R5cGVzJztcbmV4cG9ydCB7UGxhdGZvcm1SZWZsZWN0aW9uQ2FwYWJpbGl0aWVzfSBmcm9tICcuL3BsYXRmb3JtX3JlZmxlY3Rpb25fY2FwYWJpbGl0aWVzJztcblxuLyoqXG4gKiBSZWZsZWN0aXZlIGluZm9ybWF0aW9uIGFib3V0IGEgc3ltYm9sLCBpbmNsdWRpbmcgYW5ub3RhdGlvbnMsIGludGVyZmFjZXMsIGFuZCBvdGhlciBtZXRhZGF0YS5cbiAqL1xuZXhwb3J0IGNsYXNzIFJlZmxlY3Rpb25JbmZvIHtcbiAgY29uc3RydWN0b3IocHVibGljIGFubm90YXRpb25zPzogYW55W10sIHB1YmxpYyBwYXJhbWV0ZXJzPzogYW55W11bXSwgcHVibGljIGZhY3Rvcnk/OiBGdW5jdGlvbixcbiAgICAgICAgICAgICAgcHVibGljIGludGVyZmFjZXM/OiBhbnlbXSwgcHVibGljIHByb3BNZXRhZGF0YT86IHtba2V5OiBzdHJpbmddOiBhbnlbXX0pIHt9XG59XG5cbi8qKlxuICogUHJvdmlkZXMgYWNjZXNzIHRvIHJlZmxlY3Rpb24gZGF0YSBhYm91dCBzeW1ib2xzLiBVc2VkIGludGVybmFsbHkgYnkgQW5ndWxhclxuICogdG8gcG93ZXIgZGVwZW5kZW5jeSBpbmplY3Rpb24gYW5kIGNvbXBpbGF0aW9uLlxuICovXG5leHBvcnQgY2xhc3MgUmVmbGVjdG9yIGV4dGVuZHMgUmVmbGVjdG9yUmVhZGVyIHtcbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBfaW5qZWN0YWJsZUluZm8gPSBuZXcgTWFwPGFueSwgUmVmbGVjdGlvbkluZm8+KCk7XG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgX2dldHRlcnMgPSBuZXcgTWFwPHN0cmluZywgR2V0dGVyRm4+KCk7XG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgX3NldHRlcnMgPSBuZXcgTWFwPHN0cmluZywgU2V0dGVyRm4+KCk7XG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgX21ldGhvZHMgPSBuZXcgTWFwPHN0cmluZywgTWV0aG9kRm4+KCk7XG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgX3VzZWRLZXlzOiBTZXQ8YW55PjtcbiAgcmVmbGVjdGlvbkNhcGFiaWxpdGllczogUGxhdGZvcm1SZWZsZWN0aW9uQ2FwYWJpbGl0aWVzO1xuXG4gIGNvbnN0cnVjdG9yKHJlZmxlY3Rpb25DYXBhYmlsaXRpZXM6IFBsYXRmb3JtUmVmbGVjdGlvbkNhcGFiaWxpdGllcykge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5fdXNlZEtleXMgPSBudWxsO1xuICAgIHRoaXMucmVmbGVjdGlvbkNhcGFiaWxpdGllcyA9IHJlZmxlY3Rpb25DYXBhYmlsaXRpZXM7XG4gIH1cblxuICBpc1JlZmxlY3Rpb25FbmFibGVkKCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5yZWZsZWN0aW9uQ2FwYWJpbGl0aWVzLmlzUmVmbGVjdGlvbkVuYWJsZWQoKTsgfVxuXG4gIC8qKlxuICAgKiBDYXVzZXMgYHRoaXNgIHJlZmxlY3RvciB0byB0cmFjayBrZXlzIHVzZWQgdG8gYWNjZXNzXG4gICAqIHtAbGluayBSZWZsZWN0aW9uSW5mb30gb2JqZWN0cy5cbiAgICovXG4gIHRyYWNrVXNhZ2UoKTogdm9pZCB7IHRoaXMuX3VzZWRLZXlzID0gbmV3IFNldCgpOyB9XG5cbiAgLyoqXG4gICAqIExpc3RzIHR5cGVzIGZvciB3aGljaCByZWZsZWN0aW9uIGluZm9ybWF0aW9uIHdhcyBub3QgcmVxdWVzdGVkIHNpbmNlXG4gICAqIHtAbGluayAjdHJhY2tVc2FnZX0gd2FzIGNhbGxlZC4gVGhpcyBsaXN0IGNvdWxkIGxhdGVyIGJlIGF1ZGl0ZWQgYXNcbiAgICogcG90ZW50aWFsIGRlYWQgY29kZS5cbiAgICovXG4gIGxpc3RVbnVzZWRLZXlzKCk6IGFueVtdIHtcbiAgICBpZiAodGhpcy5fdXNlZEtleXMgPT0gbnVsbCkge1xuICAgICAgdGhyb3cgbmV3IEJhc2VFeGNlcHRpb24oJ1VzYWdlIHRyYWNraW5nIGlzIGRpc2FibGVkJyk7XG4gICAgfVxuICAgIHZhciBhbGxUeXBlcyA9IE1hcFdyYXBwZXIua2V5cyh0aGlzLl9pbmplY3RhYmxlSW5mbyk7XG4gICAgcmV0dXJuIGFsbFR5cGVzLmZpbHRlcihrZXkgPT4gIVNldFdyYXBwZXIuaGFzKHRoaXMuX3VzZWRLZXlzLCBrZXkpKTtcbiAgfVxuXG4gIHJlZ2lzdGVyRnVuY3Rpb24oZnVuYzogRnVuY3Rpb24sIGZ1bmNJbmZvOiBSZWZsZWN0aW9uSW5mbyk6IHZvaWQge1xuICAgIHRoaXMuX2luamVjdGFibGVJbmZvLnNldChmdW5jLCBmdW5jSW5mbyk7XG4gIH1cblxuICByZWdpc3RlclR5cGUodHlwZTogVHlwZSwgdHlwZUluZm86IFJlZmxlY3Rpb25JbmZvKTogdm9pZCB7XG4gICAgdGhpcy5faW5qZWN0YWJsZUluZm8uc2V0KHR5cGUsIHR5cGVJbmZvKTtcbiAgfVxuXG4gIHJlZ2lzdGVyR2V0dGVycyhnZXR0ZXJzOiB7W2tleTogc3RyaW5nXTogR2V0dGVyRm59KTogdm9pZCB7IF9tZXJnZU1hcHModGhpcy5fZ2V0dGVycywgZ2V0dGVycyk7IH1cblxuICByZWdpc3RlclNldHRlcnMoc2V0dGVyczoge1trZXk6IHN0cmluZ106IFNldHRlckZufSk6IHZvaWQgeyBfbWVyZ2VNYXBzKHRoaXMuX3NldHRlcnMsIHNldHRlcnMpOyB9XG5cbiAgcmVnaXN0ZXJNZXRob2RzKG1ldGhvZHM6IHtba2V5OiBzdHJpbmddOiBNZXRob2RGbn0pOiB2b2lkIHsgX21lcmdlTWFwcyh0aGlzLl9tZXRob2RzLCBtZXRob2RzKTsgfVxuXG4gIGZhY3RvcnkodHlwZTogVHlwZSk6IEZ1bmN0aW9uIHtcbiAgICBpZiAodGhpcy5fY29udGFpbnNSZWZsZWN0aW9uSW5mbyh0eXBlKSkge1xuICAgICAgdmFyIHJlcyA9IHRoaXMuX2dldFJlZmxlY3Rpb25JbmZvKHR5cGUpLmZhY3Rvcnk7XG4gICAgICByZXR1cm4gaXNQcmVzZW50KHJlcykgPyByZXMgOiBudWxsO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdGhpcy5yZWZsZWN0aW9uQ2FwYWJpbGl0aWVzLmZhY3RvcnkodHlwZSk7XG4gICAgfVxuICB9XG5cbiAgcGFyYW1ldGVycyh0eXBlT3JGdW5jOiAvKlR5cGUqLyBhbnkpOiBhbnlbXVtdIHtcbiAgICBpZiAodGhpcy5faW5qZWN0YWJsZUluZm8uaGFzKHR5cGVPckZ1bmMpKSB7XG4gICAgICB2YXIgcmVzID0gdGhpcy5fZ2V0UmVmbGVjdGlvbkluZm8odHlwZU9yRnVuYykucGFyYW1ldGVycztcbiAgICAgIHJldHVybiBpc1ByZXNlbnQocmVzKSA/IHJlcyA6IFtdO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdGhpcy5yZWZsZWN0aW9uQ2FwYWJpbGl0aWVzLnBhcmFtZXRlcnModHlwZU9yRnVuYyk7XG4gICAgfVxuICB9XG5cbiAgYW5ub3RhdGlvbnModHlwZU9yRnVuYzogLypUeXBlKi8gYW55KTogYW55W10ge1xuICAgIGlmICh0aGlzLl9pbmplY3RhYmxlSW5mby5oYXModHlwZU9yRnVuYykpIHtcbiAgICAgIHZhciByZXMgPSB0aGlzLl9nZXRSZWZsZWN0aW9uSW5mbyh0eXBlT3JGdW5jKS5hbm5vdGF0aW9ucztcbiAgICAgIHJldHVybiBpc1ByZXNlbnQocmVzKSA/IHJlcyA6IFtdO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdGhpcy5yZWZsZWN0aW9uQ2FwYWJpbGl0aWVzLmFubm90YXRpb25zKHR5cGVPckZ1bmMpO1xuICAgIH1cbiAgfVxuXG4gIHByb3BNZXRhZGF0YSh0eXBlT3JGdW5jOiAvKlR5cGUqLyBhbnkpOiB7W2tleTogc3RyaW5nXTogYW55W119IHtcbiAgICBpZiAodGhpcy5faW5qZWN0YWJsZUluZm8uaGFzKHR5cGVPckZ1bmMpKSB7XG4gICAgICB2YXIgcmVzID0gdGhpcy5fZ2V0UmVmbGVjdGlvbkluZm8odHlwZU9yRnVuYykucHJvcE1ldGFkYXRhO1xuICAgICAgcmV0dXJuIGlzUHJlc2VudChyZXMpID8gcmVzIDoge307XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0aGlzLnJlZmxlY3Rpb25DYXBhYmlsaXRpZXMucHJvcE1ldGFkYXRhKHR5cGVPckZ1bmMpO1xuICAgIH1cbiAgfVxuXG4gIGludGVyZmFjZXModHlwZTogVHlwZSk6IGFueVtdIHtcbiAgICBpZiAodGhpcy5faW5qZWN0YWJsZUluZm8uaGFzKHR5cGUpKSB7XG4gICAgICB2YXIgcmVzID0gdGhpcy5fZ2V0UmVmbGVjdGlvbkluZm8odHlwZSkuaW50ZXJmYWNlcztcbiAgICAgIHJldHVybiBpc1ByZXNlbnQocmVzKSA/IHJlcyA6IFtdO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdGhpcy5yZWZsZWN0aW9uQ2FwYWJpbGl0aWVzLmludGVyZmFjZXModHlwZSk7XG4gICAgfVxuICB9XG5cbiAgZ2V0dGVyKG5hbWU6IHN0cmluZyk6IEdldHRlckZuIHtcbiAgICBpZiAodGhpcy5fZ2V0dGVycy5oYXMobmFtZSkpIHtcbiAgICAgIHJldHVybiB0aGlzLl9nZXR0ZXJzLmdldChuYW1lKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRoaXMucmVmbGVjdGlvbkNhcGFiaWxpdGllcy5nZXR0ZXIobmFtZSk7XG4gICAgfVxuICB9XG5cbiAgc2V0dGVyKG5hbWU6IHN0cmluZyk6IFNldHRlckZuIHtcbiAgICBpZiAodGhpcy5fc2V0dGVycy5oYXMobmFtZSkpIHtcbiAgICAgIHJldHVybiB0aGlzLl9zZXR0ZXJzLmdldChuYW1lKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRoaXMucmVmbGVjdGlvbkNhcGFiaWxpdGllcy5zZXR0ZXIobmFtZSk7XG4gICAgfVxuICB9XG5cbiAgbWV0aG9kKG5hbWU6IHN0cmluZyk6IE1ldGhvZEZuIHtcbiAgICBpZiAodGhpcy5fbWV0aG9kcy5oYXMobmFtZSkpIHtcbiAgICAgIHJldHVybiB0aGlzLl9tZXRob2RzLmdldChuYW1lKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRoaXMucmVmbGVjdGlvbkNhcGFiaWxpdGllcy5tZXRob2QobmFtZSk7XG4gICAgfVxuICB9XG5cbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBfZ2V0UmVmbGVjdGlvbkluZm8odHlwZU9yRnVuYzogYW55KTogUmVmbGVjdGlvbkluZm8ge1xuICAgIGlmIChpc1ByZXNlbnQodGhpcy5fdXNlZEtleXMpKSB7XG4gICAgICB0aGlzLl91c2VkS2V5cy5hZGQodHlwZU9yRnVuYyk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLl9pbmplY3RhYmxlSW5mby5nZXQodHlwZU9yRnVuYyk7XG4gIH1cblxuICAvKiogQGludGVybmFsICovXG4gIF9jb250YWluc1JlZmxlY3Rpb25JbmZvKHR5cGVPckZ1bmM6IGFueSkgeyByZXR1cm4gdGhpcy5faW5qZWN0YWJsZUluZm8uaGFzKHR5cGVPckZ1bmMpOyB9XG5cbiAgaW1wb3J0VXJpKHR5cGU6IFR5cGUpOiBzdHJpbmcgeyByZXR1cm4gdGhpcy5yZWZsZWN0aW9uQ2FwYWJpbGl0aWVzLmltcG9ydFVyaSh0eXBlKTsgfVxufVxuXG5mdW5jdGlvbiBfbWVyZ2VNYXBzKHRhcmdldDogTWFwPHN0cmluZywgRnVuY3Rpb24+LCBjb25maWc6IHtba2V5OiBzdHJpbmddOiBGdW5jdGlvbn0pOiB2b2lkIHtcbiAgU3RyaW5nTWFwV3JhcHBlci5mb3JFYWNoKGNvbmZpZywgKHY6IEZ1bmN0aW9uLCBrOiBzdHJpbmcpID0+IHRhcmdldC5zZXQoaywgdikpO1xufVxuIl19