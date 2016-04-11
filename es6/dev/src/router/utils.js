import { isPresent, isBlank } from 'angular2/src/facade/lang';
import { StringMapWrapper } from 'angular2/src/facade/collection';
export class TouchMap {
    constructor(map) {
        this.map = {};
        this.keys = {};
        if (isPresent(map)) {
            StringMapWrapper.forEach(map, (value, key) => {
                this.map[key] = isPresent(value) ? value.toString() : null;
                this.keys[key] = true;
            });
        }
    }
    get(key) {
        StringMapWrapper.delete(this.keys, key);
        return this.map[key];
    }
    getUnused() {
        var unused = {};
        var keys = StringMapWrapper.keys(this.keys);
        keys.forEach(key => unused[key] = StringMapWrapper.get(this.map, key));
        return unused;
    }
}
export function normalizeString(obj) {
    if (isBlank(obj)) {
        return null;
    }
    else {
        return obj.toString();
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJkaWZmaW5nX3BsdWdpbl93cmFwcGVyLW91dHB1dF9wYXRoLTVLc2cxQUpOLnRtcC9hbmd1bGFyMi9zcmMvcm91dGVyL3V0aWxzLnRzIl0sIm5hbWVzIjpbIlRvdWNoTWFwIiwiVG91Y2hNYXAuY29uc3RydWN0b3IiLCJUb3VjaE1hcC5nZXQiLCJUb3VjaE1hcC5nZXRVbnVzZWQiLCJub3JtYWxpemVTdHJpbmciXSwibWFwcGluZ3MiOiJPQUFPLEVBQUMsU0FBUyxFQUFFLE9BQU8sRUFBQyxNQUFNLDBCQUEwQjtPQUNwRCxFQUFDLGdCQUFnQixFQUFDLE1BQU0sZ0NBQWdDO0FBRS9EO0lBSUVBLFlBQVlBLEdBQXlCQTtRQUhyQ0MsUUFBR0EsR0FBNEJBLEVBQUVBLENBQUNBO1FBQ2xDQSxTQUFJQSxHQUE2QkEsRUFBRUEsQ0FBQ0E7UUFHbENBLEVBQUVBLENBQUNBLENBQUNBLFNBQVNBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO1lBQ25CQSxnQkFBZ0JBLENBQUNBLE9BQU9BLENBQUNBLEdBQUdBLEVBQUVBLENBQUNBLEtBQUtBLEVBQUVBLEdBQUdBO2dCQUN2Q0EsSUFBSUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsR0FBR0EsU0FBU0EsQ0FBQ0EsS0FBS0EsQ0FBQ0EsR0FBR0EsS0FBS0EsQ0FBQ0EsUUFBUUEsRUFBRUEsR0FBR0EsSUFBSUEsQ0FBQ0E7Z0JBQzNEQSxJQUFJQSxDQUFDQSxJQUFJQSxDQUFDQSxHQUFHQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQTtZQUN4QkEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7UUFDTEEsQ0FBQ0E7SUFDSEEsQ0FBQ0E7SUFFREQsR0FBR0EsQ0FBQ0EsR0FBV0E7UUFDYkUsZ0JBQWdCQSxDQUFDQSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxJQUFJQSxFQUFFQSxHQUFHQSxDQUFDQSxDQUFDQTtRQUN4Q0EsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7SUFDdkJBLENBQUNBO0lBRURGLFNBQVNBO1FBQ1BHLElBQUlBLE1BQU1BLEdBQXlCQSxFQUFFQSxDQUFDQTtRQUN0Q0EsSUFBSUEsSUFBSUEsR0FBR0EsZ0JBQWdCQSxDQUFDQSxJQUFJQSxDQUFDQSxJQUFJQSxDQUFDQSxJQUFJQSxDQUFDQSxDQUFDQTtRQUM1Q0EsSUFBSUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsR0FBR0EsSUFBSUEsTUFBTUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsR0FBR0EsZ0JBQWdCQSxDQUFDQSxHQUFHQSxDQUFDQSxJQUFJQSxDQUFDQSxHQUFHQSxFQUFFQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQTtRQUN2RUEsTUFBTUEsQ0FBQ0EsTUFBTUEsQ0FBQ0E7SUFDaEJBLENBQUNBO0FBQ0hILENBQUNBO0FBR0QsZ0NBQWdDLEdBQVE7SUFDdENJLEVBQUVBLENBQUNBLENBQUNBLE9BQU9BLENBQUNBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO1FBQ2pCQSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQTtJQUNkQSxDQUFDQTtJQUFDQSxJQUFJQSxDQUFDQSxDQUFDQTtRQUNOQSxNQUFNQSxDQUFDQSxHQUFHQSxDQUFDQSxRQUFRQSxFQUFFQSxDQUFDQTtJQUN4QkEsQ0FBQ0E7QUFDSEEsQ0FBQ0EiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge2lzUHJlc2VudCwgaXNCbGFua30gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9sYW5nJztcbmltcG9ydCB7U3RyaW5nTWFwV3JhcHBlcn0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9jb2xsZWN0aW9uJztcblxuZXhwb3J0IGNsYXNzIFRvdWNoTWFwIHtcbiAgbWFwOiB7W2tleTogc3RyaW5nXTogc3RyaW5nfSA9IHt9O1xuICBrZXlzOiB7W2tleTogc3RyaW5nXTogYm9vbGVhbn0gPSB7fTtcblxuICBjb25zdHJ1Y3RvcihtYXA6IHtba2V5OiBzdHJpbmddOiBhbnl9KSB7XG4gICAgaWYgKGlzUHJlc2VudChtYXApKSB7XG4gICAgICBTdHJpbmdNYXBXcmFwcGVyLmZvckVhY2gobWFwLCAodmFsdWUsIGtleSkgPT4ge1xuICAgICAgICB0aGlzLm1hcFtrZXldID0gaXNQcmVzZW50KHZhbHVlKSA/IHZhbHVlLnRvU3RyaW5nKCkgOiBudWxsO1xuICAgICAgICB0aGlzLmtleXNba2V5XSA9IHRydWU7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBnZXQoa2V5OiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIFN0cmluZ01hcFdyYXBwZXIuZGVsZXRlKHRoaXMua2V5cywga2V5KTtcbiAgICByZXR1cm4gdGhpcy5tYXBba2V5XTtcbiAgfVxuXG4gIGdldFVudXNlZCgpOiB7W2tleTogc3RyaW5nXTogYW55fSB7XG4gICAgdmFyIHVudXNlZDoge1trZXk6IHN0cmluZ106IGFueX0gPSB7fTtcbiAgICB2YXIga2V5cyA9IFN0cmluZ01hcFdyYXBwZXIua2V5cyh0aGlzLmtleXMpO1xuICAgIGtleXMuZm9yRWFjaChrZXkgPT4gdW51c2VkW2tleV0gPSBTdHJpbmdNYXBXcmFwcGVyLmdldCh0aGlzLm1hcCwga2V5KSk7XG4gICAgcmV0dXJuIHVudXNlZDtcbiAgfVxufVxuXG5cbmV4cG9ydCBmdW5jdGlvbiBub3JtYWxpemVTdHJpbmcob2JqOiBhbnkpOiBzdHJpbmcge1xuICBpZiAoaXNCbGFuayhvYmopKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIG9iai50b1N0cmluZygpO1xuICB9XG59XG4iXX0=