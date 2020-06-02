import * as classNames from 'classnames';
import * as React from 'react';

import {
  Button,
  Card,
  Classes,
  Collapse,
  Elevation,
  Icon,
  Intent,
  ProgressBar
} from '@blueprintjs/core';
import { IconNames } from '@blueprintjs/icons';

import Markdown from '../commons/Markdown';

export type AchievementBoardState = {
  isOpen: boolean;
};

class AchievementBoard extends React.PureComponent<AchievementBoardState> {
  public state: AchievementBoardState = {
    isOpen: false
  };

  public render() {
    return (
      <div className="Achievements">
        <div className="ContentDisplay row center-xs">{this.generateAchievementCard()}</div>
      </div>
    );
  }

  private handleClick = () => this.setState({ isOpen: !this.state.isOpen });

  private generateAchievementCard() {
    return (
      <div>
        <Card className={classNames('achievement-card', Classes.DARK)} elevation={Elevation.ONE}>
          <div className="row">
            <div className={classNames('achievement-header', 'col-xs-9')}>
              <p>ROBOTICS MASTER</p>
            </div>

            <div className="col-xs-3">
              <Icon className="achievement-icon" icon={IconNames.TICK} />
              <Icon className="achievement-icon" icon={IconNames.CIRCLE} />
              <Icon className="achievement-icon" icon={IconNames.CIRCLE} />
            </div>
          </div>

          <div className={classNames('achievement-main', 'row')}>
            <div className="col-xs-3 achievement-picture">
              <img src={'http://robohash.org/set_set3/bgset_bg2/bWYZFB0dVgz'} />
            </div>
            <div className="col-xs-9 achievement-description">
              <Markdown
                className="achievement-desc"
                content="Score 90% or Above for Robotics Mission"
              />
            </div>
          </div>

          <div className="row">
            <div className="achievement-bar">
              <ProgressBar value={0.2} stripes={false} intent={Intent.WARNING} />
            </div>
          </div>

          <div className={classNames('achievements-markers')}>
            <Icon
              style={{ display: 'inline-block', marginLeft: '10%' }}
              icon={IconNames.SYMBOL_TRIANGLE_UP}
            />
            <Icon
              style={{ display: 'inline-block', marginLeft: '10%' }}
              icon={IconNames.SYMBOL_TRIANGLE_UP}
            />
            <Icon
              style={{ display: 'inline-block', marginLeft: '60%' }}
              icon={IconNames.SYMBOL_TRIANGLE_UP}
            />
          </div>

          <div className="row">
            <Button className="achievement-button" onClick={this.handleClick}>
              {this.state.isOpen ? 'Hide Subquests' : 'View Subqeusts'}
            </Button>
          </div>

          <div className="row">
            <Collapse isOpen={this.state.isOpen}>
              {this.generateSubmissionCard()}
              {this.generateSubmissionCard()}
            </Collapse>
          </div>
        </Card>
      </div>
    );
  }

  private generateSubmissionCard() {
    return (
      <div className="achievement-box">
        <Card className={classNames('achievement-card', Classes.DARK)} elevation={Elevation.ONE}>
          <div className="row">
            <div className="col-xs-9">
              <Markdown content="ROBOTICS QUEST" />
            </div>

            <div className="col-xs-3">
              <Icon className="achievement-icon" icon={IconNames.TICK} />
              <Icon className="achievement-icon" icon={IconNames.CIRCLE} />
              <Icon className="achievement-icon" icon={IconNames.CIRCLE} />
            </div>
          </div>

          <div className={classNames('achievement-main', 'row')}>
            <div className="col-xs-3 achievement-picture">
              <img src={'http://robohash.org/set_set3/bgset_bg2/bWYZFB0dVgz'} />
            </div>

            <div className="col-xs-9 achievement-description">
              <Markdown
                className="achievement-desc"
                content="Score 90% or Above for Robotics Mission"
              />
            </div>
          </div>

          <div className="row">
            <div className="achievement-bar">
              <ProgressBar value={0.8} stripes={false} intent={Intent.WARNING} />
            </div>
          </div>

          <div className="row">
            <Button className="achievement-button"> Link </Button>
          </div>
        </Card>
      </div>
    );
  }
}

export default AchievementBoard;
