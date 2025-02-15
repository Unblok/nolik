import React from 'react';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';
import { Row, Col, Modal, Timeline, Input, Icon, Button } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFlagCheckered } from '@fortawesome/free-solid-svg-icons';
const { TextArea } = Input;

@inject('app')
@observer
class Welcome extends React.Component {
  render() {
    const { app } = this.props;
    return (
      <div>
        <Modal
          visible={app.showWelcomeModal}
          centered
          destroyOnClose
          closable={false}
          footer={null}
        >
          <Timeline>
            <Timeline.Item
              color="green"
              dot={<Icon type="check-circle" theme="filled" />}
            >
              <p>Encryption keys generation</p>
            </Timeline.Item>
            <Timeline.Item color="green">
              <div>
                <Row gutter={8}>
                  <Col>
                    <p>Create a password (once for every device)</p>
                  </Col>
                </Row>
                <Row gutter={8}>
                  <Col xs={24} sm={12}>
                    <p>
                      <Input.Password
                        autoFocus
                        placeholder="Password"
                        onChange={e => {
                          app.password = e.target.value;
                        }}
                        onPressEnter={app.savePassword}
                        value={app.password}
                      />
                    </p>
                  </Col>
                  <Col xs={24} sm={12}>
                    <p>
                      <Input.Password
                        placeholder="Repeat password"
                        onChange={e => {
                          app.passwordRepeat = e.target.value;
                        }}
                        onPressEnter={app.savePassword}
                        value={app.passwordRepeat}
                      />
                    </p>
                  </Col>
                </Row>
                <Row gutter={8}>
                  <Col>
                    <p>
                      <TextArea
                        placeholder="Password hint (optional but recommended)"
                        onChange={e => {
                          app.passwordHint = e.target.value;
                        }}
                        value={app.passwordHint}
                      />
                    </p>
                  </Col>
                </Row>
                <Row gutter={8}>
                  <Col>
                    <p>
                      <Button
                        type="primary"
                        onClick={app.savePassword}
                        disabled={
                          app.password === '' ||
                          app.password !== app.passwordRepeat
                        }
                      >
                        Save and start messaging
                      </Button>
                    </p>
                  </Col>
                </Row>
              </div>
            </Timeline.Item>
            <Timeline.Item
              color="grey"
              dot={<FontAwesomeIcon icon={faFlagCheckered} />}
              style={{ paddingBottom: 0, marginBottom: 0, height: 18 }}
            >
              <p>Start messaging</p>
            </Timeline.Item>
          </Timeline>
        </Modal>
        <style jsx>{`
          .socialIcon {
            border-radius: 10px;
            display: inline-block;
            overflow: hidden;
            margin-left: 2px;
            margin-right: 2px;
            opacity: 0.8;
          }

          .socialIcon:hover {
            opacity: 1;
            cursor: pointer;
          }

          .copyIcon {
            width: 64px;
            height: 64px;
            border: none;
            background: #eee;
            padding: 0;
            margin: 0;
            box-shadow: none;
            outline: 0;
            color: #999;
            font-size: 32px;
            cursor: pointer;
          }
        `}</style>
      </div>
    );
  }
}

Welcome.propTypes = {
  app: PropTypes.object,
};

export default Welcome;
