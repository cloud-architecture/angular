'use strict';// Note: This class is only here so that we can reference it from TypeScript code.
// The actual implementation lives under modules_dart.
// TODO(tbosch): Move the corresponding code into angular2/src/compiler once
// the new compiler is done.
var Codegen = (function () {
    function Codegen(moduleAlias) {
    }
    Codegen.prototype.generate = function (typeName, changeDetectorTypeName, def) {
        throw "Not implemented in JS";
    };
    Codegen.prototype.toString = function () { throw "Not implemented in JS"; };
    return Codegen;
})();
exports.Codegen = Codegen;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhbmdlX2RldGVjdG9yX2NvZGVnZW4uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJkaWZmaW5nX3BsdWdpbl93cmFwcGVyLW91dHB1dF9wYXRoLUx2WkxlQTh2LnRtcC9hbmd1bGFyMi9zcmMvdHJhbnNmb3JtL3RlbXBsYXRlX2NvbXBpbGVyL2NoYW5nZV9kZXRlY3Rvcl9jb2RlZ2VuLnRzIl0sIm5hbWVzIjpbIkNvZGVnZW4iLCJDb2RlZ2VuLmNvbnN0cnVjdG9yIiwiQ29kZWdlbi5nZW5lcmF0ZSIsIkNvZGVnZW4udG9TdHJpbmciXSwibWFwcGluZ3MiOiJBQUlBLGtGQUFrRjtBQUNsRixzREFBc0Q7QUFDdEQsNEVBQTRFO0FBQzVFLDRCQUE0QjtBQUM1QjtJQUNFQSxpQkFBWUEsV0FBbUJBO0lBQUdDLENBQUNBO0lBQ25DRCwwQkFBUUEsR0FBUkEsVUFBU0EsUUFBZ0JBLEVBQUVBLHNCQUE4QkEsRUFBRUEsR0FBNkJBO1FBQ3RGRSxNQUFNQSx1QkFBdUJBLENBQUNBO0lBQ2hDQSxDQUFDQTtJQUNERiwwQkFBUUEsR0FBUkEsY0FBcUJHLE1BQU1BLHVCQUF1QkEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7SUFDdkRILGNBQUNBO0FBQURBLENBQUNBLEFBTkQsSUFNQztBQU5ZLGVBQU8sVUFNbkIsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENoYW5nZURldGVjdG9yRGVmaW5pdGlvbixcbn0gZnJvbSAnYW5ndWxhcjIvc3JjL2NvcmUvY2hhbmdlX2RldGVjdGlvbi9jaGFuZ2VfZGV0ZWN0aW9uJztcblxuLy8gTm90ZTogVGhpcyBjbGFzcyBpcyBvbmx5IGhlcmUgc28gdGhhdCB3ZSBjYW4gcmVmZXJlbmNlIGl0IGZyb20gVHlwZVNjcmlwdCBjb2RlLlxuLy8gVGhlIGFjdHVhbCBpbXBsZW1lbnRhdGlvbiBsaXZlcyB1bmRlciBtb2R1bGVzX2RhcnQuXG4vLyBUT0RPKHRib3NjaCk6IE1vdmUgdGhlIGNvcnJlc3BvbmRpbmcgY29kZSBpbnRvIGFuZ3VsYXIyL3NyYy9jb21waWxlciBvbmNlXG4vLyB0aGUgbmV3IGNvbXBpbGVyIGlzIGRvbmUuXG5leHBvcnQgY2xhc3MgQ29kZWdlbiB7XG4gIGNvbnN0cnVjdG9yKG1vZHVsZUFsaWFzOiBzdHJpbmcpIHt9XG4gIGdlbmVyYXRlKHR5cGVOYW1lOiBzdHJpbmcsIGNoYW5nZURldGVjdG9yVHlwZU5hbWU6IHN0cmluZywgZGVmOiBDaGFuZ2VEZXRlY3RvckRlZmluaXRpb24pOiB2b2lkIHtcbiAgICB0aHJvdyBcIk5vdCBpbXBsZW1lbnRlZCBpbiBKU1wiO1xuICB9XG4gIHRvU3RyaW5nKCk6IHN0cmluZyB7IHRocm93IFwiTm90IGltcGxlbWVudGVkIGluIEpTXCI7IH1cbn1cbiJdfQ==