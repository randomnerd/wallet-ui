import React, { Component } from 'react';
import { inject } from 'mobx-react';
import {observer} from "mobx-react/index";
import {compose} from "recompose";

class Link extends Component {
    render() {
        const { root, activeClassName, className, onClick, children, to, ...otherProps } = this.props;
        const router = root.router;
        otherProps.href = router.createHref({ pathname: to });

        let cls = className || '';
        if (router.location.pathname === to && activeClassName) cls += (cls ? cls + ' ' : '') + activeClassName;

        otherProps.onClick = function navigate(e) {
            if (e.button !== 0 || e.ctrlKey || e.altKey || e.metaKey || e.shiftKey) {
                return;
            }
            e.preventDefault();
            if (typeof onClick === 'function') {
                onClick(e);
            }
            router.push(to, e.target.textContent);
            window.scrollTo(0, 0);
        };
        return <a children={children} className={cls} {...otherProps} />;
    }
}

export default compose(
    inject('root'),
    observer
)(Link);
