import React, { Fragment, useState } from 'react';

export const ElasticContainer = (props: any) => {
    let states = {
        opened: false,
        height: props.initHeight,
        contentHeight: props.contentHeight,
    };
    const [state, setState] = useState(states);
    const collapseContainer = (m: number) => {
        if (m >= 1) {
            setState({
                ...state,
                opened: !state.opened,
                height: !state.opened
                    ? state.contentHeight * m + state.height
                    : state.height - state.contentHeight * m,
            });
        }
    };
    const modChildren = React.Children.map(props.children, c =>
        React.cloneElement(c, {
            height: state.height,
            opened: state.opened,
            collapseCallback: collapseContainer
        }),
    );
    return <Fragment>{modChildren}</Fragment>;
};