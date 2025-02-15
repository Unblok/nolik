import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'next/router';
import { autorun, toJS } from 'mobx';
import { observer, inject } from 'mobx-react';
import { Row, Col } from 'antd';

import ChatCompose from '../chat/compose';
import ChatFocus from '../chat/focus';
import ChatEmpty from '../chat/empty';
import ChatBlank from '../chat/blank';
import ChatIndex from '../chat/index';
import Threads from '../chat/threads';
// import Menu from './menu';

@inject('chat', 'threads')
@observer
class Main extends React.Component {
  constructor(props) {
    super(props);
    const { chat } = this.props;

    autorun(() => {
      if (props.router.query.publicKey) {
        chat.toRecipients = [props.router.query.publicKey];
        chat.subject = props.router.query.subject || '';
        chat.message = props.router.query.message || '';
        chat.subjectPlaceholder =
          props.router.query.subjectPlaceholder ||
          chat.defaultSubjectPlaceholder;
        chat.messagePlaceholder =
          props.router.query.messagePlaceholder ||
          chat.defaultMessagePlaceholder;
        chat.toggleCompose();
      }
    });
  }

  render() {
    const { threads, chat } = this.props;
    return (
      <div className="main">
        {chat.composeMode && <ChatCompose />}
        {!chat.composeMode && chat.focusMode && <ChatFocus />}
        {!chat.composeMode &&
          !chat.focusMode &&
          threads.list &&
          (threads.list.length === 0 ? (
            <ChatBlank />
          ) : (
            <Row>
              <Col xs={threads.current ? 0 : 24} sm={10} md={8}>
                <Threads />
              </Col>
              <Col xs={threads.current ? 24 : 0} sm={14} md={16}>
                {threads.current ? <ChatIndex /> : <ChatEmpty />}
              </Col>
            </Row>
          ))}
        <style jsx>{`
          .main {
            height: 100vh;
          }

          .menu {
            border-left: 1px solid #ddd;
            height: 100vh;
            padding: 1em 2em;
          }
        `}</style>
      </div>
    );
  }
}

Main.propTypes = {
  chat: PropTypes.object,
  threads: PropTypes.object,
  router: PropTypes.object,
};

export default withRouter(Main);
