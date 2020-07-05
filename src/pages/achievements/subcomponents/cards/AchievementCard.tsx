import React from 'react';
import Inferencer from '../utils/Inferencer';
import { Card, Icon } from '@blueprintjs/core';
import AchievementHints from '../utils/AchievementHints';
import { IconNames } from '@blueprintjs/icons';
import AchievementDeadline from '../utils/AchievementDeadline';
import AchievementExp from '../utils/AchievementExp';
import AchievementProgressBar from '../utils/AchievementProgressBar';

type AchievementCardProps = {
  id: number;
  inferencer: Inferencer;
  shouldPartiallyRender: boolean;
  isDropdownOpen: boolean;
  toggleDropdown: any;
  displayModal: any;
};

function AchievementCard(props: AchievementCardProps) {
  const {
    id,
    inferencer,
    shouldPartiallyRender,
    isDropdownOpen,
    toggleDropdown,
    displayModal
  } = props;

  const { title, ability, release, backgroundImageUrl } = inferencer.getAchievementItem(id);

  const totalExp = inferencer.getTotalExp(id);
  const furthestDeadline = inferencer.getFurthestDeadline(id);
  const collectiveProgress = inferencer.getCollectiveProgress(id);

  const hasDropdown: boolean = inferencer.getImmediateChildren(id).size > 0;

  const generateBackgroundGradient = () => {
    switch (ability) {
      case 'Academic':
        return `radial-gradient(circle, rgba(171, 144, 23, 0.8), rgba(155, 130, 18, 0.8), rgba(138, 115, 14, 0.8), rgba(123, 102, 9, 0.8), rgba(107, 88, 5, 0.8))`;
      case 'Community':
        return `radial-gradient(circle, rgba(147, 144, 144, 0.8), rgba(141, 139, 139, 0.8), rgba(135, 133, 134, 0.8), rgba(129, 128, 129, 0.8), rgba(123, 123, 123, 0.8))`;
      case 'Effort':
        return `radial-gradient(circle, rgba(132, 26, 182, 0.8), rgba(120, 22, 167, 0.8), rgba(109, 17, 153, 0.8), rgba(98, 12, 138, 0.8), rgba(87, 8, 124, 0.8))`;
      case 'Exploration':
        return `radial-gradient(circle, rgba(196, 43, 211, 0.8), rgba(191, 35, 195, 0.8), rgba(185, 26, 180, 0.8), rgba(178, 17, 166, 0.8), rgba(171, 8, 152, 0.8))`;
      default:
        return ``;
    }
  };

  return (
    <Card
      className="achievement"
      style={{
        opacity: shouldPartiallyRender ? '20%' : '100%',
        background: `${generateBackgroundGradient()}, url(${backgroundImageUrl})`
      }}
      onClick={() => displayModal(id)}
      onClickCapture={toggleDropdown}
    >
      <div className="main">
        {hasDropdown ? (
          <div className="dropdown">
            <Icon icon={isDropdownOpen ? IconNames.CARET_DOWN : IconNames.CARET_RIGHT} />
          </div>
        ) : (
          <div className="dropdown"></div>
        )}

        <div className="padder">
          <p></p>
        </div>

        <div className="display">
          <div className="headings">
            <div className="title">
              <h1>{title}</h1>
            </div>

            <AchievementHints release={release} />
          </div>

          <div className="details">
            <div className="ability">
              <p>{ability}</p>
            </div>

            <AchievementDeadline deadline={furthestDeadline} />

            <AchievementExp exp={totalExp} />
          </div>
        </div>
      </div>

      <AchievementProgressBar
        progress={collectiveProgress}
        shouldAnimate={!shouldPartiallyRender}
      />
    </Card>
  );
}

export default AchievementCard;
