
/**
 *     tal-sidebar.jsx for jChess project
 *     2017 by Andrii Sorokin
 *     https://github.com/ignorantic/jchess.git
 */

import React from 'react';
import TalButton from '../tal-button/tal-button.jsx';
import talAction from '../../modules/actions/tal-action';

export default class TalSidebar extends React.Component {

    handleReset() {
        talAction.reset();
    }

    render() {
        return (
            <aside className='sidebar'>
                <TalButton
                    label='Reset'
                    onClick={this.handleReset}
                />
            </aside>
        );
    }

}
