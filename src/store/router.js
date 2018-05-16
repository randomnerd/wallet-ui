import { extendObservable, action, autorun } from 'mobx';
import createBrowserHistory from 'history/createBrowserHistory';
import Mapper from 'url-mapper';

export default class Router {
    constructor(options) {
        extendObservable(this, {
            location: null,
            route: null,
            match: null,
            values: {}
        });
        this.options = options || { routes: {} };
        this.history = createBrowserHistory({ initialEntries: [ window.location.pathname ] });
        this.mapper = Mapper();
        this.onLocation = action((location) => {
            let route = this.mapper.map(location.pathname, this.options.routes);
            Object.assign(this, {...route, location});
        });
        this.history.listen(this.onLocation);
        this.onLocation(this.history.location);

        autorun(() => { if (!this.match) this.push('/'); });
    }

    setValues(values) {
        let location = this.mapper.stringify(this.route, values);
        if (location !== this.location.pathname) this.push(location);
    }

    push(location) {
        if (this.location && this.location.pathname === location) return;
        this.history.push(location);
    }
    replace(location) { this.history.replace(location) }
    go(n) { this.history.go(n) }
    goBack() { this.history.goBack() }
    goForward() { this.history.goForward() }
    createHref() { return this.history.createHref(...arguments) };
}
