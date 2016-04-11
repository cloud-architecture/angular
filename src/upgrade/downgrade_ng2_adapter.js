'use strict';var core_1 = require('angular2/core');
var constants_1 = require('./constants');
var INITIAL_VALUE = {
    __UNINITIALIZED__: true
};
var DowngradeNg2ComponentAdapter = (function () {
    function DowngradeNg2ComponentAdapter(id, info, element, attrs, scope, parentInjector, parse, viewManager, hostViewFactory) {
        this.id = id;
        this.info = info;
        this.element = element;
        this.attrs = attrs;
        this.scope = scope;
        this.parentInjector = parentInjector;
        this.parse = parse;
        this.viewManager = viewManager;
        this.hostViewFactory = hostViewFactory;
        this.component = null;
        this.inputChangeCount = 0;
        this.inputChanges = null;
        this.hostViewRef = null;
        this.changeDetector = null;
        this.contentInsertionPoint = null;
        this.element[0].id = id;
        this.componentScope = scope.$new();
        this.childNodes = element.contents();
    }
    DowngradeNg2ComponentAdapter.prototype.bootstrapNg2 = function () {
        var childInjector = this.parentInjector.resolveAndCreateChild([core_1.provide(constants_1.NG1_SCOPE, { useValue: this.componentScope })]);
        this.contentInsertionPoint = document.createComment('ng1 insertion point');
        this.hostViewRef = this.viewManager.createRootHostView(this.hostViewFactory, '#' + this.id, childInjector, [[this.contentInsertionPoint]]);
        var hostElement = this.viewManager.getHostElement(this.hostViewRef);
        this.changeDetector = this.hostViewRef.changeDetectorRef;
        this.component = this.viewManager.getComponent(hostElement);
    };
    DowngradeNg2ComponentAdapter.prototype.setupInputs = function () {
        var _this = this;
        var attrs = this.attrs;
        var inputs = this.info.inputs;
        for (var i = 0; i < inputs.length; i++) {
            var input = inputs[i];
            var expr = null;
            if (attrs.hasOwnProperty(input.attr)) {
                var observeFn = (function (prop) {
                    var prevValue = INITIAL_VALUE;
                    return function (value) {
                        if (_this.inputChanges !== null) {
                            _this.inputChangeCount++;
                            _this.inputChanges[prop] =
                                new Ng1Change(value, prevValue === INITIAL_VALUE ? value : prevValue);
                            prevValue = value;
                        }
                        _this.component[prop] = value;
                    };
                })(input.prop);
                attrs.$observe(input.attr, observeFn);
            }
            else if (attrs.hasOwnProperty(input.bindAttr)) {
                expr = attrs[input.bindAttr];
            }
            else if (attrs.hasOwnProperty(input.bracketAttr)) {
                expr = attrs[input.bracketAttr];
            }
            else if (attrs.hasOwnProperty(input.bindonAttr)) {
                expr = attrs[input.bindonAttr];
            }
            else if (attrs.hasOwnProperty(input.bracketParenAttr)) {
                expr = attrs[input.bracketParenAttr];
            }
            if (expr != null) {
                var watchFn = (function (prop) { return function (value, prevValue) {
                    if (_this.inputChanges != null) {
                        _this.inputChangeCount++;
                        _this.inputChanges[prop] = new Ng1Change(prevValue, value);
                    }
                    _this.component[prop] = value;
                }; })(input.prop);
                this.componentScope.$watch(expr, watchFn);
            }
        }
        var prototype = this.info.type.prototype;
        if (prototype && prototype.ngOnChanges) {
            // Detect: OnChanges interface
            this.inputChanges = {};
            this.componentScope.$watch(function () { return _this.inputChangeCount; }, function () {
                var inputChanges = _this.inputChanges;
                _this.inputChanges = {};
                _this.component.ngOnChanges(inputChanges);
            });
        }
        this.componentScope.$watch(function () { return _this.changeDetector && _this.changeDetector.detectChanges(); });
    };
    DowngradeNg2ComponentAdapter.prototype.projectContent = function () {
        var childNodes = this.childNodes;
        var parent = this.contentInsertionPoint.parentNode;
        if (parent) {
            for (var i = 0, ii = childNodes.length; i < ii; i++) {
                parent.insertBefore(childNodes[i], this.contentInsertionPoint);
            }
        }
    };
    DowngradeNg2ComponentAdapter.prototype.setupOutputs = function () {
        var _this = this;
        var attrs = this.attrs;
        var outputs = this.info.outputs;
        for (var j = 0; j < outputs.length; j++) {
            var output = outputs[j];
            var expr = null;
            var assignExpr = false;
            var bindonAttr = output.bindonAttr ? output.bindonAttr.substring(0, output.bindonAttr.length - 6) : null;
            var bracketParenAttr = output.bracketParenAttr ?
                "[(" + output.bracketParenAttr.substring(2, output.bracketParenAttr.length - 8) + ")]" :
                null;
            if (attrs.hasOwnProperty(output.onAttr)) {
                expr = attrs[output.onAttr];
            }
            else if (attrs.hasOwnProperty(output.parenAttr)) {
                expr = attrs[output.parenAttr];
            }
            else if (attrs.hasOwnProperty(bindonAttr)) {
                expr = attrs[bindonAttr];
                assignExpr = true;
            }
            else if (attrs.hasOwnProperty(bracketParenAttr)) {
                expr = attrs[bracketParenAttr];
                assignExpr = true;
            }
            if (expr != null && assignExpr != null) {
                var getter = this.parse(expr);
                var setter = getter.assign;
                if (assignExpr && !setter) {
                    throw new Error("Expression '" + expr + "' is not assignable!");
                }
                var emitter = this.component[output.prop];
                if (emitter) {
                    emitter.subscribe({
                        next: assignExpr ? (function (setter) { return function (value) { return setter(_this.scope, value); }; })(setter) :
                            (function (getter) { return function (value) { return getter(_this.scope, { $event: value }); }; })(getter)
                    });
                }
                else {
                    throw new Error("Missing emitter '" + output.prop + "' on component '" + this.info.selector + "'!");
                }
            }
        }
    };
    DowngradeNg2ComponentAdapter.prototype.registerCleanup = function () {
        var _this = this;
        this.element.bind('$destroy', function () { return _this.viewManager.destroyRootHostView(_this.hostViewRef); });
    };
    return DowngradeNg2ComponentAdapter;
})();
exports.DowngradeNg2ComponentAdapter = DowngradeNg2ComponentAdapter;
var Ng1Change = (function () {
    function Ng1Change(previousValue, currentValue) {
        this.previousValue = previousValue;
        this.currentValue = currentValue;
    }
    Ng1Change.prototype.isFirstChange = function () { return this.previousValue === this.currentValue; };
    return Ng1Change;
})();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG93bmdyYWRlX25nMl9hZGFwdGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZGlmZmluZ19wbHVnaW5fd3JhcHBlci1vdXRwdXRfcGF0aC11eHJ0MW9Bai50bXAvYW5ndWxhcjIvc3JjL3VwZ3JhZGUvZG93bmdyYWRlX25nMl9hZGFwdGVyLnRzIl0sIm5hbWVzIjpbIkRvd25ncmFkZU5nMkNvbXBvbmVudEFkYXB0ZXIiLCJEb3duZ3JhZGVOZzJDb21wb25lbnRBZGFwdGVyLmNvbnN0cnVjdG9yIiwiRG93bmdyYWRlTmcyQ29tcG9uZW50QWRhcHRlci5ib290c3RyYXBOZzIiLCJEb3duZ3JhZGVOZzJDb21wb25lbnRBZGFwdGVyLnNldHVwSW5wdXRzIiwiRG93bmdyYWRlTmcyQ29tcG9uZW50QWRhcHRlci5wcm9qZWN0Q29udGVudCIsIkRvd25ncmFkZU5nMkNvbXBvbmVudEFkYXB0ZXIuc2V0dXBPdXRwdXRzIiwiRG93bmdyYWRlTmcyQ29tcG9uZW50QWRhcHRlci5yZWdpc3RlckNsZWFudXAiLCJOZzFDaGFuZ2UiLCJOZzFDaGFuZ2UuY29uc3RydWN0b3IiLCJOZzFDaGFuZ2UuaXNGaXJzdENoYW5nZSJdLCJtYXBwaW5ncyI6IkFBQUEscUJBU08sZUFBZSxDQUFDLENBQUE7QUFDdkIsMEJBQXdCLGFBQWEsQ0FBQyxDQUFBO0FBS3RDLElBQU0sYUFBYSxHQUFHO0lBQ3BCLGlCQUFpQixFQUFFLElBQUk7Q0FDeEIsQ0FBQztBQUVGO0lBVUVBLHNDQUFvQkEsRUFBVUEsRUFBVUEsSUFBbUJBLEVBQ3ZDQSxPQUFpQ0EsRUFBVUEsS0FBMEJBLEVBQ3JFQSxLQUFxQkEsRUFBVUEsY0FBd0JBLEVBQ3ZEQSxLQUE0QkEsRUFBVUEsV0FBMkJBLEVBQ2pFQSxlQUFtQ0E7UUFKbkNDLE9BQUVBLEdBQUZBLEVBQUVBLENBQVFBO1FBQVVBLFNBQUlBLEdBQUpBLElBQUlBLENBQWVBO1FBQ3ZDQSxZQUFPQSxHQUFQQSxPQUFPQSxDQUEwQkE7UUFBVUEsVUFBS0Es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TUEsQ0FBQ0EsZ0JBQWdCQSxDQUFDQSxTQUFTQSxDQUFDQSxDQUFDQSxFQUFFQSxNQUFNQSxDQUFDQSxnQkFBZ0JBLENBQUNBLE1BQU1BLEdBQUdBLENBQUNBLENBQUNBLE9BQUlBO2dCQUNqRkEsSUFBSUEsQ0FBQ0E7WUFFYkEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsS0FBS0EsQ0FBQ0EsY0FBY0EsQ0FBQ0EsTUFBTUEsQ0FBQ0EsTUFBTUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7Z0JBQ3hDQSxJQUFJQSxHQUFHQSxLQUFLQSxDQUFDQSxNQUFNQSxDQUFDQSxNQUFNQSxDQUFDQSxDQUFDQTtZQUM5QkEsQ0FBQ0E7WUFBQ0EsSUFBSUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsS0FBS0EsQ0FBQ0EsY0FBY0EsQ0FBQ0EsTUFBTUEsQ0FBQ0EsU0FBU0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7Z0JBQ2xEQSxJQUFJQSxHQUFHQSxLQUFLQSxDQUFDQSxNQUFNQSxDQUFDQSxTQUFTQSxDQUFDQSxDQUFDQTtZQUNqQ0EsQ0FBQ0E7WUFBQ0EsSUFBSUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsS0FBS0EsQ0FBQ0EsY0FBY0EsQ0FBQ0EsVUFBVUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7Z0JBQzVDQSxJQUFJQSxHQUFHQSxLQUFLQSxDQUFDQSxVQUFVQSxDQUFDQSxDQUFDQTtnQkFDekJBLFVBQVVBLEdBQUdBLElBQUlBLENBQUNBO1lBQ3BCQSxDQUFDQTtZQUFDQSxJQUFJQSxDQUFDQSxFQUFFQSxDQUFDQSxDQUFDQSxLQUFLQSxDQUFDQSxjQUFjQSxDQUFDQSxnQkFBZ0JBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO2dCQUNsREEsSUFBSUEsR0FBR0EsS0FBS0EsQ0FBQ0EsZ0JBQWdCQSxDQUFDQSxDQUFDQTtnQkFDL0JBLFVBQVVBLEdBQUdBLElBQUlBLENBQUNBO1lBQ3BCQSxDQUFDQTtZQUVEQSxFQUFFQSxDQUFDQSxDQUFDQSxJQUFJQSxJQUFJQSxJQUFJQSxJQUFJQSxVQUFVQSxJQUFJQSxJQUFJQSxDQUFDQSxDQUFDQSxDQUFDQTtnQkFDdkNBLElBQUlBLE1BQU1BLEdBQUdBLElBQUlBLENBQUNBLEtBQUtBLENBQUNBLElBQUlBLENBQUNBLENBQUNBO2dCQUM5QkEsSUFBSUEsTUFBTUEsR0FBR0EsTUFBTUEsQ0FBQ0EsTUFBTUEsQ0FBQ0E7Z0JBQzNCQSxFQUFFQSxDQUFDQSxDQUFDQSxVQUFVQSxJQUFJQSxDQUFDQSxNQUFNQSxDQUFDQSxDQUFDQSxDQUFDQTtvQkFDMUJBLE1BQU1BLElBQUlBLEtBQUtBLENBQUNBLGlCQUFlQSxJQUFJQSx5QkFBc0JBLENBQUNBLENBQUNBO2dCQUM3REEsQ0FBQ0E7Z0JBQ0RBLElBQUlBLE9BQU9BLEdBQUdBLElBQUlBLENBQUNBLFNBQVNBLENBQUNBLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLENBQUNBO2dCQUMxQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsT0FBT0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7b0JBQ1pBLE9BQU9BLENBQUNBLFNBQVNBLENBQUNBO3dCQUNoQkEsSUFBSUEsRUFBRUEsVUFBVUEsR0FBR0EsQ0FBQ0EsVUFBQ0EsTUFBTUEsSUFBS0EsT0FBQUEsVUFBQ0EsS0FBS0EsSUFBS0EsT0FBQUEsTUFBTUEsQ0FBQ0EsS0FBSUEsQ0FBQ0EsS0FBS0EsRUFBRUEsS0FBS0EsQ0FBQ0EsRUFBekJBLENBQXlCQSxFQUFwQ0EsQ0FBb0NBLENBQUNBLENBQUNBLE1BQU1BLENBQUNBOzRCQUMxREEsQ0FBQ0EsVUFBQ0EsTUFBTUEsSUFBS0EsT0FBQUEsVUFBQ0EsS0FBS0EsSUFBS0EsT0FBQUEsTUFBTUEsQ0FBQ0EsS0FBSUEsQ0FBQ0EsS0FBS0EsRUFBRUEsRUFBQ0EsTUFBTUEsRUFBRUEsS0FBS0EsRUFBQ0EsQ0FBQ0EsRUFBbkNBLENBQW1DQSxFQUE5Q0EsQ0FBOENBLENBQUNBLENBQUNBLE1BQU1BLENBQUNBO3FCQUN4RkEsQ0FBQ0EsQ0FBQ0E7Z0JBQ0xBLENBQUNBO2dCQUFDQSxJQUFJQSxDQUFDQSxDQUFDQTtvQkFDTkEsTUFBTUEsSUFBSUEsS0FBS0EsQ0FBQ0Esc0JBQW9CQSxNQUFNQSxDQUFDQSxJQUFJQSx3QkFBbUJBLElBQUlBLENBQUNBLElBQUlBLENBQUNBLFFBQVFBLE9BQUlBLENBQUNBLENBQUNBO2dCQUM1RkEsQ0FBQ0E7WUFDSEEsQ0FBQ0E7UUFDSEEsQ0FBQ0E7SUFDSEEsQ0FBQ0E7SUFFREwsc0RBQWVBLEdBQWZBO1FBQUFNLGlCQUVDQTtRQURDQSxJQUFJQSxDQUFDQSxPQUFPQSxDQUFDQSxJQUFJQSxDQUFDQSxVQUFVQSxFQUFFQSxjQUFNQSxPQUFBQSxLQUFJQSxDQUFDQSxXQUFXQSxDQUFDQSxtQkFBbUJBLENBQUNBLEtBQUlBLENBQUNBLFdBQVdBLENBQUNBLEVBQXREQSxDQUFzREEsQ0FBQ0EsQ0FBQ0E7SUFDOUZBLENBQUNBO0lBQ0hOLG1DQUFDQTtBQUFEQSxDQUFDQSxBQWpKRCxJQWlKQztBQWpKWSxvQ0FBNEIsK0JBaUp4QyxDQUFBO0FBRUQ7SUFDRU8sbUJBQW1CQSxhQUFrQkEsRUFBU0EsWUFBaUJBO1FBQTVDQyxrQkFBYUEsR0FBYkEsYUFBYUEsQ0FBS0E7UUFBU0EsaUJBQVlBLEdBQVpBLFlBQVlBLENBQUtBO0lBQUdBLENBQUNBO0lBRW5FRCxpQ0FBYUEsR0FBYkEsY0FBMkJFLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLGFBQWFBLEtBQUtBLElBQUlBLENBQUNBLFlBQVlBLENBQUNBLENBQUNBLENBQUNBO0lBQy9FRixnQkFBQ0E7QUFBREEsQ0FBQ0EsQUFKRCxJQUlDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgcHJvdmlkZSxcbiAgQXBwVmlld01hbmFnZXIsXG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBIb3N0Vmlld1JlZixcbiAgSW5qZWN0b3IsXG4gIE9uQ2hhbmdlcyxcbiAgSG9zdFZpZXdGYWN0b3J5UmVmLFxuICBTaW1wbGVDaGFuZ2Vcbn0gZnJvbSAnYW5ndWxhcjIvY29yZSc7XG5pbXBvcnQge05HMV9TQ09QRX0gZnJvbSAnLi9jb25zdGFudHMnO1xuaW1wb3J0IHtDb21wb25lbnRJbmZvfSBmcm9tICcuL21ldGFkYXRhJztcbmltcG9ydCBFbGVtZW50ID0gcHJvdHJhY3Rvci5FbGVtZW50O1xuaW1wb3J0ICogYXMgYW5ndWxhciBmcm9tICcuL2FuZ3VsYXJfanMnO1xuXG5jb25zdCBJTklUSUFMX1ZBTFVFID0ge1xuICBfX1VOSU5JVElBTElaRURfXzogdHJ1ZVxufTtcblxuZXhwb3J0IGNsYXNzIERvd25ncmFkZU5nMkNvbXBvbmVudEFkYXB0ZXIge1xuICBjb21wb25lbnQ6IGFueSA9IG51bGw7XG4gIGlucHV0Q2hhbmdlQ291bnQ6IG51bWJlciA9IDA7XG4gIGlucHV0Q2hhbmdlczoge1trZXk6IHN0cmluZ106IFNpbXBsZUNoYW5nZX0gPSBudWxsO1xuICBob3N0Vmlld1JlZjogSG9zdFZpZXdSZWYgPSBudWxsO1xuICBjaGFuZ2VEZXRlY3RvcjogQ2hhbmdlRGV0ZWN0b3JSZWYgPSBudWxsO1xuICBjb21wb25lbnRTY29wZTogYW5ndWxhci5JU2NvcGU7XG4gIGNoaWxkTm9kZXM6IE5vZGVbXTtcbiAgY29udGVudEluc2VydGlvblBvaW50OiBOb2RlID0gbnVsbDtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGlkOiBzdHJpbmcsIHByaXZhdGUgaW5mbzogQ29tcG9uZW50SW5mbyxcbiAgICAgICAgICAgICAgcHJpdmF0ZSBlbGVtZW50OiBhbmd1bGFyLklBdWdtZW50ZWRKUXVlcnksIHByaXZhdGUgYXR0cnM6IGFuZ3VsYXIuSUF0dHJpYnV0ZXMsXG4gICAgICAgICAgICAgIHByaXZhdGUgc2NvcGU6IGFuZ3VsYXIuSVNjb3BlLCBwcml2YXRlIHBhcmVudEluamVjdG9yOiBJbmplY3RvcixcbiAgICAgICAgICAgICAgcHJpdmF0ZSBwYXJzZTogYW5ndWxhci5JUGFyc2VTZXJ2aWNlLCBwcml2YXRlIHZpZXdNYW5hZ2VyOiBBcHBWaWV3TWFuYWdlcixcbiAgICAgICAgICAgICAgcHJpdmF0ZSBob3N0Vmlld0ZhY3Rvcnk6IEhvc3RWaWV3RmFjdG9yeVJlZikge1xuICAgICg8YW55PnRoaXMuZWxlbWVudFswXSkuaWQgPSBpZDtcbiAgICB0aGlzLmNvbXBvbmVudFNjb3BlID0gc2NvcGUuJG5ldygpO1xuICAgIHRoaXMuY2hpbGROb2RlcyA9IDxOb2RlW10+PGFueT5lbGVtZW50LmNvbnRlbnRzKCk7XG4gIH1cblxuICBib290c3RyYXBOZzIoKSB7XG4gICAgdmFyIGNoaWxkSW5qZWN0b3IgPSB0aGlzLnBhcmVudEluamVjdG9yLnJlc29sdmVBbmRDcmVhdGVDaGlsZChcbiAgICAgICAgW3Byb3ZpZGUoTkcxX1NDT1BFLCB7dXNlVmFsdWU6IHRoaXMuY29tcG9uZW50U2NvcGV9KV0pO1xuICAgIHRoaXMuY29udGVudEluc2VydGlvblBvaW50ID0gZG9jdW1lbnQuY3JlYXRlQ29tbWVudCgnbmcxIGluc2VydGlvbiBwb2ludCcpO1xuXG4gICAgdGhpcy5ob3N0Vmlld1JlZiA9IHRoaXMudmlld01hbmFnZXIuY3JlYXRlUm9vdEhvc3RWaWV3KFxuICAgICAgICB0aGlzLmhvc3RWaWV3RmFjdG9yeSwgJyMnICsgdGhpcy5pZCwgY2hpbGRJbmplY3RvciwgW1t0aGlzLmNvbnRlbnRJbnNlcnRpb25Qb2ludF1dKTtcbiAgICB2YXIgaG9zdEVsZW1lbnQgPSB0aGlzLnZpZXdNYW5hZ2VyLmdldEhvc3RFbGVtZW50KHRoaXMuaG9zdFZpZXdSZWYpO1xuICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3IgPSB0aGlzLmhvc3RWaWV3UmVmLmNoYW5nZURldGVjdG9yUmVmO1xuICAgIHRoaXMuY29tcG9uZW50ID0gdGhpcy52aWV3TWFuYWdlci5nZXRDb21wb25lbnQoaG9zdEVsZW1lbnQpO1xuICB9XG5cbiAgc2V0dXBJbnB1dHMoKTogdm9pZCB7XG4gICAgdmFyIGF0dHJzID0gdGhpcy5hdHRycztcbiAgICB2YXIgaW5wdXRzID0gdGhpcy5pbmZvLmlucHV0cztcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGlucHV0cy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGlucHV0ID0gaW5wdXRzW2ldO1xuICAgICAgdmFyIGV4cHIgPSBudWxsO1xuICAgICAgaWYgKGF0dHJzLmhhc093blByb3BlcnR5KGlucHV0LmF0dHIpKSB7XG4gICAgICAgIHZhciBvYnNlcnZlRm4gPSAoKHByb3ApID0+IHtcbiAgICAgICAgICB2YXIgcHJldlZhbHVlID0gSU5JVElBTF9WQUxVRTtcbiAgICAgICAgICByZXR1cm4gKHZhbHVlKSA9PiB7XG4gICAgICAgICAgICBpZiAodGhpcy5pbnB1dENoYW5nZXMgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgdGhpcy5pbnB1dENoYW5nZUNvdW50Kys7XG4gICAgICAgICAgICAgIHRoaXMuaW5wdXRDaGFuZ2VzW3Byb3BdID1cbiAgICAgICAgICAgICAgICAgIG5ldyBOZzFDaGFuZ2UodmFsdWUsIHByZXZWYWx1ZSA9PT0gSU5JVElBTF9WQUxVRSA/IHZhbHVlIDogcHJldlZhbHVlKTtcbiAgICAgICAgICAgICAgcHJldlZhbHVlID0gdmFsdWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmNvbXBvbmVudFtwcm9wXSA9IHZhbHVlO1xuICAgICAgICAgIH07XG4gICAgICAgIH0pKGlucHV0LnByb3ApO1xuICAgICAgICBhdHRycy4kb2JzZXJ2ZShpbnB1dC5hdHRyLCBvYnNlcnZlRm4pO1xuICAgICAgfSBlbHNlIGlmIChhdHRycy5oYXNPd25Qcm9wZXJ0eShpbnB1dC5iaW5kQXR0cikpIHtcbiAgICAgICAgZXhwciA9IGF0dHJzW2lucHV0LmJpbmRBdHRyXTtcbiAgICAgIH0gZWxzZSBpZiAoYXR0cnMuaGFzT3duUHJvcGVydHkoaW5wdXQuYnJhY2tldEF0dHIpKSB7XG4gICAgICAgIGV4cHIgPSBhdHRyc1tpbnB1dC5icmFja2V0QXR0cl07XG4gICAgICB9IGVsc2UgaWYgKGF0dHJzLmhhc093blByb3BlcnR5KGlucHV0LmJpbmRvbkF0dHIpKSB7XG4gICAgICAgIGV4cHIgPSBhdHRyc1tpbnB1dC5iaW5kb25BdHRyXTtcbiAgICAgIH0gZWxzZSBpZiAoYXR0cnMuaGFzT3duUHJvcGVydHkoaW5wdXQuYnJhY2tldFBhcmVuQXR0cikpIHtcbiAgICAgICAgZXhwciA9IGF0dHJzW2lucHV0LmJyYWNrZXRQYXJlbkF0dHJdO1xuICAgICAgfVxuICAgICAgaWYgKGV4cHIgIT0gbnVsbCkge1xuICAgICAgICB2YXIgd2F0Y2hGbiA9ICgocHJvcCkgPT4gKHZhbHVlLCBwcmV2VmFsdWUpID0+IHtcbiAgICAgICAgICBpZiAodGhpcy5pbnB1dENoYW5nZXMgIT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy5pbnB1dENoYW5nZUNvdW50Kys7XG4gICAgICAgICAgICB0aGlzLmlucHV0Q2hhbmdlc1twcm9wXSA9IG5ldyBOZzFDaGFuZ2UocHJldlZhbHVlLCB2YWx1ZSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHRoaXMuY29tcG9uZW50W3Byb3BdID0gdmFsdWU7XG4gICAgICAgIH0pKGlucHV0LnByb3ApO1xuICAgICAgICB0aGlzLmNvbXBvbmVudFNjb3BlLiR3YXRjaChleHByLCB3YXRjaEZuKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB2YXIgcHJvdG90eXBlID0gdGhpcy5pbmZvLnR5cGUucHJvdG90eXBlO1xuICAgIGlmIChwcm90b3R5cGUgJiYgKDxPbkNoYW5nZXM+cHJvdG90eXBlKS5uZ09uQ2hhbmdlcykge1xuICAgICAgLy8gRGV0ZWN0OiBPbkNoYW5nZXMgaW50ZXJmYWNlXG4gICAgICB0aGlzLmlucHV0Q2hhbmdlcyA9IHt9O1xuICAgICAgdGhpcy5jb21wb25lbnRTY29wZS4kd2F0Y2goKCkgPT4gdGhpcy5pbnB1dENoYW5nZUNvdW50LCAoKSA9PiB7XG4gICAgICAgIHZhciBpbnB1dENoYW5nZXMgPSB0aGlzLmlucHV0Q2hhbmdlcztcbiAgICAgICAgdGhpcy5pbnB1dENoYW5nZXMgPSB7fTtcbiAgICAgICAgKDxPbkNoYW5nZXM+dGhpcy5jb21wb25lbnQpLm5nT25DaGFuZ2VzKGlucHV0Q2hhbmdlcyk7XG4gICAgICB9KTtcbiAgICB9XG4gICAgdGhpcy5jb21wb25lbnRTY29wZS4kd2F0Y2goKCkgPT4gdGhpcy5jaGFuZ2VEZXRlY3RvciAmJiB0aGlzLmNoYW5nZURldGVjdG9yLmRldGVjdENoYW5nZXMoKSk7XG4gIH1cblxuICBwcm9qZWN0Q29udGVudCgpIHtcbiAgICB2YXIgY2hpbGROb2RlcyA9IHRoaXMuY2hpbGROb2RlcztcbiAgICB2YXIgcGFyZW50ID0gdGhpcy5jb250ZW50SW5zZXJ0aW9uUG9pbnQucGFyZW50Tm9kZTtcbiAgICBpZiAocGFyZW50KSB7XG4gICAgICBmb3IgKHZhciBpID0gMCwgaWkgPSBjaGlsZE5vZGVzLmxlbmd0aDsgaSA8IGlpOyBpKyspIHtcbiAgICAgICAgcGFyZW50Lmluc2VydEJlZm9yZShjaGlsZE5vZGVzW2ldLCB0aGlzLmNvbnRlbnRJbnNlcnRpb25Qb2ludCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgc2V0dXBPdXRwdXRzKCkge1xuICAgIHZhciBhdHRycyA9IHRoaXMuYXR0cnM7XG4gICAgdmFyIG91dHB1dHMgPSB0aGlzLmluZm8ub3V0cHV0cztcbiAgICBmb3IgKHZhciBqID0gMDsgaiA8IG91dHB1dHMubGVuZ3RoOyBqKyspIHtcbiAgICAgIHZhciBvdXRwdXQgPSBvdXRwdXRzW2pdO1xuICAgICAgdmFyIGV4cHIgPSBudWxsO1xuICAgICAgdmFyIGFzc2lnbkV4cHIgPSBmYWxzZTtcblxuICAgICAgdmFyIGJpbmRvbkF0dHIgPVxuICAgICAgICAgIG91dHB1dC5iaW5kb25BdHRyID8gb3V0cHV0LmJpbmRvbkF0dHIuc3Vic3RyaW5nKDAsIG91dHB1dC5iaW5kb25BdHRyLmxlbmd0aCAtIDYpIDogbnVsbDtcbiAgICAgIHZhciBicmFja2V0UGFyZW5BdHRyID1cbiAgICAgICAgICBvdXRwdXQuYnJhY2tldFBhcmVuQXR0ciA/XG4gICAgICAgICAgICAgIGBbKCR7b3V0cHV0LmJyYWNrZXRQYXJlbkF0dHIuc3Vic3RyaW5nKDIsIG91dHB1dC5icmFja2V0UGFyZW5BdHRyLmxlbmd0aCAtIDgpfSldYCA6XG4gICAgICAgICAgICAgIG51bGw7XG5cbiAgICAgIGlmIChhdHRycy5oYXNPd25Qcm9wZXJ0eShvdXRwdXQub25BdHRyKSkge1xuICAgICAgICBleHByID0gYXR0cnNbb3V0cHV0Lm9uQXR0cl07XG4gICAgICB9IGVsc2UgaWYgKGF0dHJzLmhhc093blByb3BlcnR5KG91dHB1dC5wYXJlbkF0dHIpKSB7XG4gICAgICAgIGV4cHIgPSBhdHRyc1tvdXRwdXQucGFyZW5BdHRyXTtcbiAgICAgIH0gZWxzZSBpZiAoYXR0cnMuaGFzT3duUHJvcGVydHkoYmluZG9uQXR0cikpIHtcbiAgICAgICAgZXhwciA9IGF0dHJzW2JpbmRvbkF0dHJdO1xuICAgICAgICBhc3NpZ25FeHByID0gdHJ1ZTtcbiAgICAgIH0gZWxzZSBpZiAoYXR0cnMuaGFzT3duUHJvcGVydHkoYnJhY2tldFBhcmVuQXR0cikpIHtcbiAgICAgICAgZXhwciA9IGF0dHJzW2JyYWNrZXRQYXJlbkF0dHJdO1xuICAgICAgICBhc3NpZ25FeHByID0gdHJ1ZTtcbiAgICAgIH1cblxuICAgICAgaWYgKGV4cHIgIT0gbnVsbCAmJiBhc3NpZ25FeHByICE9IG51bGwpIHtcbiAgICAgICAgdmFyIGdldHRlciA9IHRoaXMucGFyc2UoZXhwcik7XG4gICAgICAgIHZhciBzZXR0ZXIgPSBnZXR0ZXIuYXNzaWduO1xuICAgICAgICBpZiAoYXNzaWduRXhwciAmJiAhc2V0dGVyKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBFeHByZXNzaW9uICcke2V4cHJ9JyBpcyBub3QgYXNzaWduYWJsZSFgKTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgZW1pdHRlciA9IHRoaXMuY29tcG9uZW50W291dHB1dC5wcm9wXTtcbiAgICAgICAgaWYgKGVtaXR0ZXIpIHtcbiAgICAgICAgICBlbWl0dGVyLnN1YnNjcmliZSh7XG4gICAgICAgICAgICBuZXh0OiBhc3NpZ25FeHByID8gKChzZXR0ZXIpID0+ICh2YWx1ZSkgPT4gc2V0dGVyKHRoaXMuc2NvcGUsIHZhbHVlKSkoc2V0dGVyKSA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKChnZXR0ZXIpID0+ICh2YWx1ZSkgPT4gZ2V0dGVyKHRoaXMuc2NvcGUsIHskZXZlbnQ6IHZhbHVlfSkpKGdldHRlcilcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYE1pc3NpbmcgZW1pdHRlciAnJHtvdXRwdXQucHJvcH0nIG9uIGNvbXBvbmVudCAnJHt0aGlzLmluZm8uc2VsZWN0b3J9JyFgKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJlZ2lzdGVyQ2xlYW51cCgpIHtcbiAgICB0aGlzLmVsZW1lbnQuYmluZCgnJGRlc3Ryb3knLCAoKSA9PiB0aGlzLnZpZXdNYW5hZ2VyLmRlc3Ryb3lSb290SG9zdFZpZXcodGhpcy5ob3N0Vmlld1JlZikpO1xuICB9XG59XG5cbmNsYXNzIE5nMUNoYW5nZSBpbXBsZW1lbnRzIFNpbXBsZUNoYW5nZSB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBwcmV2aW91c1ZhbHVlOiBhbnksIHB1YmxpYyBjdXJyZW50VmFsdWU6IGFueSkge31cblxuICBpc0ZpcnN0Q2hhbmdlKCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5wcmV2aW91c1ZhbHVlID09PSB0aGlzLmN1cnJlbnRWYWx1ZTsgfVxufVxuIl19