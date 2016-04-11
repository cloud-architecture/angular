'use strict';var DebugContext = (function () {
    function DebugContext(element, componentElement, directive, context, locals, injector) {
        this.element = element;
        this.componentElement = componentElement;
        this.directive = directive;
        this.context = context;
        this.locals = locals;
        this.injector = injector;
    }
    return DebugContext;
})();
exports.DebugContext = DebugContext;
var ChangeDetectorGenConfig = (function () {
    function ChangeDetectorGenConfig(genDebugInfo, logBindingUpdate, useJit) {
        this.genDebugInfo = genDebugInfo;
        this.logBindingUpdate = logBindingUpdate;
        this.useJit = useJit;
    }
    return ChangeDetectorGenConfig;
})();
exports.ChangeDetectorGenConfig = ChangeDetectorGenConfig;
var ChangeDetectorDefinition = (function () {
    function ChangeDetectorDefinition(id, strategy, variableNames, bindingRecords, eventRecords, directiveRecords, genConfig) {
        this.id = id;
        this.strategy = strategy;
        this.variableNames = variableNames;
        this.bindingRecords = bindingRecords;
        this.eventRecords = eventRecords;
        this.directiveRecords = directiveRecords;
        this.genConfig = genConfig;
    }
    return ChangeDetectorDefinition;
})();
exports.ChangeDetectorDefinition = ChangeDetectorDefinition;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW50ZXJmYWNlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImRpZmZpbmdfcGx1Z2luX3dyYXBwZXItb3V0cHV0X3BhdGgtTHZaTGVBOHYudG1wL2FuZ3VsYXIyL3NyYy9jb3JlL2NoYW5nZV9kZXRlY3Rpb24vaW50ZXJmYWNlcy50cyJdLCJuYW1lcyI6WyJEZWJ1Z0NvbnRleHQiLCJEZWJ1Z0NvbnRleHQuY29uc3RydWN0b3IiLCJDaGFuZ2VEZXRlY3RvckdlbkNvbmZpZyIsIkNoYW5nZURldGVjdG9yR2VuQ29uZmlnLmNvbnN0cnVjdG9yIiwiQ2hhbmdlRGV0ZWN0b3JEZWZpbml0aW9uIiwiQ2hhbmdlRGV0ZWN0b3JEZWZpbml0aW9uLmNvbnN0cnVjdG9yIl0sIm1hcHBpbmdzIjoiQUFNQTtJQUNFQSxzQkFBbUJBLE9BQVlBLEVBQVNBLGdCQUFxQkEsRUFBU0EsU0FBY0EsRUFDakVBLE9BQVlBLEVBQVNBLE1BQVdBLEVBQVNBLFFBQWFBO1FBRHREQyxZQUFPQSxHQUFQQSxPQUFPQSxDQUFLQTtRQUFTQSxxQkFBZ0JBLEdBQWhCQSxnQkFBZ0JBLENBQUtBO1FBQVNBLGNBQVNBLEdBQVRBLFNBQVNBLENBQUtBO1FBQ2pFQSxZQUFPQSxHQUFQQSxPQUFPQSxDQUFLQTtRQUFTQSxXQUFNQSxHQUFOQSxNQUFNQSxDQUFLQTtRQUFTQSxhQUFRQSxHQUFSQSxRQUFRQSxDQUFLQTtJQUFHQSxDQUFDQTtJQUMvRUQsbUJBQUNBO0FBQURBLENBQUNBLEFBSEQsSUFHQztBQUhZLG9CQUFZLGVBR3hCLENBQUE7QUFvQ0Q7SUFDRUUsaUNBQW1CQSxZQUFxQkEsRUFBU0EsZ0JBQXlCQSxFQUN2REEsTUFBZUE7UUFEZkMsaUJBQVlBLEdBQVpBLFlBQVlBLENBQVNBO1FBQVNBLHFCQUFnQkEsR0FBaEJBLGdCQUFnQkEsQ0FBU0E7UUFDdkRBLFdBQU1BLEdBQU5BLE1BQU1BLENBQVNBO0lBQUdBLENBQUNBO0lBQ3hDRCw4QkFBQ0E7QUFBREEsQ0FBQ0EsQUFIRCxJQUdDO0FBSFksK0JBQXVCLDBCQUduQyxDQUFBO0FBRUQ7SUFDRUUsa0NBQW1CQSxFQUFVQSxFQUFTQSxRQUFpQ0EsRUFDcERBLGFBQXVCQSxFQUFTQSxjQUErQkEsRUFDL0RBLFlBQTZCQSxFQUFTQSxnQkFBbUNBLEVBQ3pFQSxTQUFrQ0E7UUFIbENDLE9BQUVBLEdBQUZBLEVBQUVBLENBQVFBO1FBQVNBLGFBQVFBLEdBQVJBLFFBQVFBLENBQXlCQTtRQUNwREEsa0JBQWFBLEdBQWJBLGFBQWFBLENBQVVBO1FBQVNBLG1CQUFjQSxHQUFkQSxjQUFjQSxDQUFpQkE7UUFDL0RBLGlCQUFZQSxHQUFaQSxZQUFZQSxDQUFpQkE7UUFBU0EscUJBQWdCQSxHQUFoQkEsZ0JBQWdCQSxDQUFtQkE7UUFDekVBLGNBQVNBLEdBQVRBLFNBQVNBLENBQXlCQTtJQUFHQSxDQUFDQTtJQUMzREQsK0JBQUNBO0FBQURBLENBQUNBLEFBTEQsSUFLQztBQUxZLGdDQUF3QiwyQkFLcEMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7TG9jYWxzfSBmcm9tICcuL3BhcnNlci9sb2NhbHMnO1xuaW1wb3J0IHtCaW5kaW5nVGFyZ2V0LCBCaW5kaW5nUmVjb3JkfSBmcm9tICcuL2JpbmRpbmdfcmVjb3JkJztcbmltcG9ydCB7RGlyZWN0aXZlUmVjb3JkLCBEaXJlY3RpdmVJbmRleH0gZnJvbSAnLi9kaXJlY3RpdmVfcmVjb3JkJztcbmltcG9ydCB7Q2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3l9IGZyb20gJy4vY29uc3RhbnRzJztcbmltcG9ydCB7Q2hhbmdlRGV0ZWN0b3JSZWZ9IGZyb20gJy4vY2hhbmdlX2RldGVjdG9yX3JlZic7XG5cbmV4cG9ydCBjbGFzcyBEZWJ1Z0NvbnRleHQge1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgZWxlbWVudDogYW55LCBwdWJsaWMgY29tcG9uZW50RWxlbWVudDogYW55LCBwdWJsaWMgZGlyZWN0aXZlOiBhbnksXG4gICAgICAgICAgICAgIHB1YmxpYyBjb250ZXh0OiBhbnksIHB1YmxpYyBsb2NhbHM6IGFueSwgcHVibGljIGluamVjdG9yOiBhbnkpIHt9XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgQ2hhbmdlRGlzcGF0Y2hlciB7XG4gIGdldERlYnVnQ29udGV4dChhcHBFbGVtZW50OiBhbnksIGVsZW1lbnRJbmRleDogbnVtYmVyLCBkaXJlY3RpdmVJbmRleDogbnVtYmVyKTogRGVidWdDb250ZXh0O1xuICBub3RpZnlPbkJpbmRpbmcoYmluZGluZ1RhcmdldDogQmluZGluZ1RhcmdldCwgdmFsdWU6IGFueSk6IHZvaWQ7XG4gIGxvZ0JpbmRpbmdVcGRhdGUoYmluZGluZ1RhcmdldDogQmluZGluZ1RhcmdldCwgdmFsdWU6IGFueSk6IHZvaWQ7XG4gIG5vdGlmeUFmdGVyQ29udGVudENoZWNrZWQoKTogdm9pZDtcbiAgbm90aWZ5QWZ0ZXJWaWV3Q2hlY2tlZCgpOiB2b2lkO1xuICBub3RpZnlPbkRlc3Ryb3koKTogdm9pZDtcbiAgZ2V0RGV0ZWN0b3JGb3IoZGlyZWN0aXZlSW5kZXg6IERpcmVjdGl2ZUluZGV4KTogQ2hhbmdlRGV0ZWN0b3I7XG4gIGdldERpcmVjdGl2ZUZvcihkaXJlY3RpdmVJbmRleDogRGlyZWN0aXZlSW5kZXgpOiBhbnk7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgQ2hhbmdlRGV0ZWN0b3Ige1xuICBwYXJlbnQ6IENoYW5nZURldGVjdG9yO1xuICBtb2RlOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneTtcbiAgcmVmOiBDaGFuZ2VEZXRlY3RvclJlZjtcblxuICBhZGRDb250ZW50Q2hpbGQoY2Q6IENoYW5nZURldGVjdG9yKTogdm9pZDtcbiAgYWRkVmlld0NoaWxkKGNkOiBDaGFuZ2VEZXRlY3Rvcik6IHZvaWQ7XG4gIHJlbW92ZUNvbnRlbnRDaGlsZChjZDogQ2hhbmdlRGV0ZWN0b3IpOiB2b2lkO1xuICByZW1vdmVWaWV3Q2hpbGQoY2Q6IENoYW5nZURldGVjdG9yKTogdm9pZDtcbiAgcmVtb3ZlKCk6IHZvaWQ7XG4gIGh5ZHJhdGUoY29udGV4dDogYW55LCBsb2NhbHM6IExvY2FscywgZGlzcGF0Y2hlcjogQ2hhbmdlRGlzcGF0Y2hlciwgcGlwZXM6IGFueSk6IHZvaWQ7XG4gIGRlaHlkcmF0ZSgpOiB2b2lkO1xuICBtYXJrUGF0aFRvUm9vdEFzQ2hlY2tPbmNlKCk6IHZvaWQ7XG5cbiAgaGFuZGxlRXZlbnQoZXZlbnROYW1lOiBzdHJpbmcsIGVsSW5kZXg6IG51bWJlciwgZXZlbnQ6IGFueSk7XG4gIGRldGVjdENoYW5nZXMoKTogdm9pZDtcbiAgY2hlY2tOb0NoYW5nZXMoKTogdm9pZDtcbiAgZGVzdHJveVJlY3Vyc2l2ZSgpOiB2b2lkO1xuICBtYXJrQXNDaGVja09uY2UoKTogdm9pZDtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBQcm90b0NoYW5nZURldGVjdG9yIHsgaW5zdGFudGlhdGUoKTogQ2hhbmdlRGV0ZWN0b3I7IH1cblxuZXhwb3J0IGNsYXNzIENoYW5nZURldGVjdG9yR2VuQ29uZmlnIHtcbiAgY29uc3RydWN0b3IocHVibGljIGdlbkRlYnVnSW5mbzogYm9vbGVhbiwgcHVibGljIGxvZ0JpbmRpbmdVcGRhdGU6IGJvb2xlYW4sXG4gICAgICAgICAgICAgIHB1YmxpYyB1c2VKaXQ6IGJvb2xlYW4pIHt9XG59XG5cbmV4cG9ydCBjbGFzcyBDaGFuZ2VEZXRlY3RvckRlZmluaXRpb24ge1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgaWQ6IHN0cmluZywgcHVibGljIHN0cmF0ZWd5OiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgICAgICAgICAgICAgcHVibGljIHZhcmlhYmxlTmFtZXM6IHN0cmluZ1tdLCBwdWJsaWMgYmluZGluZ1JlY29yZHM6IEJpbmRpbmdSZWNvcmRbXSxcbiAgICAgICAgICAgICAgcHVibGljIGV2ZW50UmVjb3JkczogQmluZGluZ1JlY29yZFtdLCBwdWJsaWMgZGlyZWN0aXZlUmVjb3JkczogRGlyZWN0aXZlUmVjb3JkW10sXG4gICAgICAgICAgICAgIHB1YmxpYyBnZW5Db25maWc6IENoYW5nZURldGVjdG9yR2VuQ29uZmlnKSB7fVxufVxuIl19